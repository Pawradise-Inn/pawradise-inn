const prisma = require("../prisma/prisma")
const { createBookingTransaction } = require('./logics/booking.js');
const { sendErrorResponse, sendSuccessResponse } = require("../utils/responseHandler");

const getPayments = async (req, res) => {
   let options = {}

   if (req.query.filter) {
    let where = JSON.parse(req.query.filter);
    options.where = where;
   }

   if (req.query.select) {
    const fields = req.query.select.split(",");
    options.select = fields.reduce((acc, field) => {
        acc[field.trim()] = true;
    }, {});
   }

   if (req.query.sort) {
    const sortFields = req.query.sort.split(",");
    options.orderBy = sortFields.map((sortField) => {
        const dir = [field, direction =  "asc"] = sortField.split(":");
        return { [field.trim()]: dir };
    })
   } else {
    options.orderBy = [
        {status: 'asc'},
        {date: 'desc'}
    ]
   }

   const page = parseInt(req.query.page, 10) || 1;
   const limit = parseInt(req.query.limit, 10) || 10;
   const startIndex = (page - 1) * limit;
   const endIndex = page * limit;

   options.skip = startIndex;
   options.take = limit;

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
        payments,
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
            dataToUpdate.slip = req.body.slip;
            dataToUpdate.date = req.body.date;
            dataToUpdate.status = req.body.status;
        }else if (req.user.role == "STAFF"){
            paymentId = req.params.id;
            dataToUpdate.status = req.body.status;
            dataToUpdate.date = req.body.date;
        }

        if (Object.keys(dataToUpdate).length === 0) {
            return sendErrorResponse(
                res,
                400,
                "MISSING_FIELDS",
                "Please provide details to update"
            );
        }

        const payment = await prisma.payment.update({
            where: { id: paymentId},
            data: dataToUpdate
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

module.exports ={
    getPayments,
    getPayment,
    createPayment,
    updatePayment,
    deletePayment
}