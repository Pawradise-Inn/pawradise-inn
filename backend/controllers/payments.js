const prisma = require("../prisma/prisma")
const { createBookingTransaction } = require('./logics/booking.js');
const { sendErrorResponse, sendSuccessResponse } = require("../utils/responseHandler");

const getPayments = async (req, res) => {
    try {
        let options = {};
        let where = {}; 
        if (req.query.filter) {
            where = JSON.parse(req.query.filter);
        }
        options.where = where;

        if (req.query.sort) {
            const sortFields = req.query.sort.split(",");
            options.orderBy = sortFields.map((sortField) => {
                const [field, direction = "asc"] = sortField.split(":");
                return { [field.trim()]: direction.trim() };
            });
        } else {
            options.orderBy = [
                { status: 'desc' },
                { date: 'desc' }
            ];
        }

        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const startIndex = (page - 1) * limit;
        options.skip = startIndex;
        options.take = limit;

        options.include = {
            customer: {
                include: {
                    user: {
                        select: { user_name: true }
                    }
                }
            },
            booking: { 
                include: {
                    booked_room: { 
                        include: {
                            room: { 
                                select: { name: true, picture: true, price: true }
                            },
                            pet: { 
                                select: { name: true }
                            }
                        }
                    },
                    booked_service: { 
                        include: {
                            service: { 
                                select: { name: true, picture: true, price: true }
                            },
                            pet: { 
                                select: { name: true }
                            }
                        }
                    }
                }
            }
        };

        const total = await prisma.payment.count({
            where: options.where,
        });

        if (total === 0) {
            return sendErrorResponse(
                res,
                404,
                "NO_DATA_FOUND",
                "No payments are available at the moment"
            );
        }

        const payments = await prisma.payment.findMany(options);

        const formattedHistory = payments.map(payment => {
            const bookingDetail = [];
            
            payment.booking?.booked_room.forEach(br => {
                bookingDetail.push({
                    type: 'Room',
                    name: br.room?.name || 'Unknown Room',
                    image: br.room?.picture,
                    petName: br.pet?.name || 'N/A',
                    price: br.room?.price || 0
                });
            });

            payment.booking?.booked_service.forEach(bs => {
                bookingDetail.push({
                    type: 'Service',
                    name: bs.service?.name || 'Unknown Service',
                    image: bs.service?.picture,
                    petName: bs.pet?.name || 'N/A',
                    price: bs.service?.price || 0
                });
            });

            const username = payment.customer?.user?.user_name || 'N/A (Guest)';
            return {
                paymentId: payment.id,
                slip: payment.slip,
                username: username,
                bookingDetail: bookingDetail,
                totalPrice: payment.cost,
                status: payment.status,
                paymentDate: payment.date
            };
        });

        const pagination = {};
        const endIndex = page * limit;
        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit: limit,
            };
        }
        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit: limit,
            };
        }

        return sendSuccessResponse(
            res,
            200,
            "LOADED_SUCCESSFULLY",
            "Payments loaded successfully",
            formattedHistory,
            { count: total, pagination }
        );

    } catch (err) {
        console.error("Error loading all payments:", err);
        return sendErrorResponse(
            res,
            500,
            "UNABLE_TO_LOAD",
            err.message || "Unable to load payments. Please refresh and try again"
        );
    }
};

const getPayment = async (req, res) => {
    try{
        const paymentId = req.params.id;
        const payment = await prisma.payment.findUnique(paymentId);
        if (!payment)
            return sendErrorResponse(res, 404, "PAYMENT_NOT_FOUND", "Payment not found")
        return sendSuccessResponse(
            res,
            200,
            "LOADED_SUCCESSFULLY",
            payment
        );
    }catch(err){
        return sendErrorResponse(
            res,
            500,
            "UNABLE_TO_LOAD",
            "Unable to load payment details. Please refresh and try again"
        );
    }
};

const createPayment = async (req, res) => {
    try {
        const { payment, booking, status } = await createBookingTransaction(req.user, req.body);
        
        if (status === "SUCCESS") {
            return sendSuccessResponse(
                res, 201, "BOOKING_CREATED", "Your booking has been created successfully",
                { payment, booking } 
            );
        } else {
            return sendSuccessResponse(
                res, 201, "PAYMENT_RECORDED_FAILED", "Payment has been recorded but failed. Please re-upload slip or contact staff.",
                { payment, booking }
            );
        }

    } catch (error) {

        console.error("Booking transaction failed:", error);
        return sendErrorResponse(
            res,
            500,
            "TRANSACTION_FAILED",
            error.message || "Unable to create payment or booking."
        );
    }
};

const updatePayment = async (req, res) => {
    try{
        let dataToUpdate = {};
        let paymentId;

        if (req.user.role == "CUSTOMER"){
            paymentId = req.body.paymentId;
            if (req.body.slip) dataToUpdate.slip = req.body.slip;
            if (req.body.date) dataToUpdate.date = new Date(req.body.date);
            if (req.body.status) dataToUpdate.status = req.body.status;
        }else if (req.user.role == "STAFF"){
            paymentId = req.params.id;
            if (req.body.status) dataToUpdate.status = req.body.status;
            if (req.body.date) dataToUpdate.date = new Date(req.body.date);
        }

        const newStatus = dataToUpdate.status;

        if (Object.keys(dataToUpdate).length === 0) {
            return sendErrorResponse(
                res,
                400,
                "MISSING_FIELDS",
                "Please provide details to update"
            );
        }

        const payment = await prisma.$transaction(async (tx) => {
            const updatedPayment = await tx.payment.update({
                where: { id: parseInt(paymentId) },
                data: dataToUpdate,
            });

            if (newStatus === "SUCCESS") {

                const booking = await tx.booking.findUnique({
                    where: { paymentId: updatedPayment.id },
                    select: { id: true }
                });

                if (booking) {
                    await tx.booking.update({
                        where: { id: booking.id },
                        data: { status: "BOOKED" },
                    });

                    await tx.bookedRoom.updateMany({
                        where: { bookingId: booking.id },
                        data: { status: "RESERVED" },
                    });

                    await tx.bookedService.updateMany({
                        where: { booking_id: booking.id },
                        data: { status: "RESERVED" },
                    });
                }
            }

            return updatedPayment;
        });

        return sendSuccessResponse(
            res,
            200,
            "UPDATED_SUCCESSFULLY",
            "Payment updated successfully",
            payment
        );
    } catch{
        if (err.code === "P2025")
            return sendErrorResponse(
                res, 
                404, 
                "PAYMENT_NOT_FOUND", 
                "Payment not found"
            );
        return sendErrorResponse(
            res,
            500,
            "UNABLE_TO_UPDATE",
            "Unable to update payment. Please try again"
        );
    }
}

const deletePayment = async (req, res) => {
    try{
        const paymentId = req.params.id;
        const payment = await prisma.payment.delete({
            where: { id: paymentId },
        });
        return sendSuccessResponse(
            res,
            200,
            "DELETED_SUCCESSFULLY",
            "Payment deleted successfully",
            {}
        )
    }catch(err){
        if (err.code === "P2025")
            return sendErrorResponse(
                res, 
                404, 
                "PAYMENT_NOT_FOUND", 
                "Payment not found"
            );
        return sendErrorResponse(
            res,
            500,
            "UNABLE_TO_UPDATE",
            "Unable to update payment. Please try again"
        );
    }
}

const getMyPayments = async (req, res) => {
   const customerId = req.user.roleId;
   let options = {};
   let where = { customerId: customerId };

   options.where = where;
   options.orderBy = [
    {date: 'desc'}
   ];

   const page = parseInt(req.query.page, 10) || 1;
   const limit = parseInt(req.query.limit, 10) || 10;
   const startIndex = (page - 1) * limit;
   const endIndex = page * limit;
   options.skip = startIndex;
   options.take = limit;

    options.include = {
        booking: {
            include: {
                booked_room: {
                    include: {
                        room: {
                            select: { name: true, picture: true, price: true }
                        },
                        pet: {
                            select: { name: true }
                        }
                    }
                },
                booked_service: { 
                    include: {
                        service: { 
                            select: { name: true, picture: true, price: true }
                        },
                        pet: { 
                            select: { name: true }
                        }
                    }
                }
            }
        }
    };

   try {
     const total = await prisma.payment.count({
        where: options.where,
     });
     if (total === 0){
        return sendErrorResponse(
            res,
            404,
            "NO_DATA_FOUND",
            "No payments are available at the moment"
        );
     }

     const payments = await prisma.payment.findMany(options);

     const formattedHistory = payments.map(payment => {
        const items = [];

        payment.booking?.booked_room.forEach(br => {
            items.push({
                type: 'Room',
                name: br.room?.name || 'Unknown Room',
                image: br.room?.picture || 'default_image_url',
                petName: br.pet?.name || 'N/A',
                price: br.room?.price || 0
            });
        });

        payment.booking?.booked_service.forEach(bs => {
            items.push({
                type: 'Service',
                name: bs.service?.name || 'Unknown Service',
                image: bs.service?.picture || 'default_image_url',
                petName: bs.pet?.name || 'N/A',
                price: bs.service?.price || 0
            });
        });

        return {
            paymentId: payment.id,
            paymentDate: payment.date,
            paymentStatus: payment.status,
            totalPrice: payment.amount, 
            items: items // รายการทั้งหมดที่จ่ายในครั้งนั้น
        };
    });

     const pagination = {};
     if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit: limit,
        };
     }
     if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit: limit,
        };
     }
     return sendSuccessResponse(
        res,
        200,
        "LOADED_SUCCESSFULLY",
        "Payments loaded successfully",
        formattedHistory,
        { count: total }
     );
   } catch (err){
      return sendErrorResponse(
        res,
        500,
        "UNABLE_TO_LOAD",
        "Unable to load payments. Please refresh and try again"
      );
   }
};

module.exports ={
    getPayments,
    getPayment,
    createPayment,
    updatePayment,
    deletePayment,
    getMyPayments
}