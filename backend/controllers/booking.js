const prisma = require('../prisma/prisma');
const {createBookedRoomWithCondition} = require('./logics/bookedRoom');
const {createBookedServiceWithCondition} = require('./logics/bookedService');

const getBookings = async (req, res) => {
    try {
        const {customerId, status, fields} = req.query;
        const where = {}; 
        let select = undefined;
        if (customerId) where.customerId = parseInt(customerId); 
        if (status) where.status = status; 
        if (fields) { 
            select = {}; 
            fields.split(',').forEach(f => { 
                select[f.trim()] = true; 
            }); 
        }
        const bookings = await prisma.booking.findMany({
            where,
            select
        });
        res.status(200).json({success: true, data: bookings});
    } catch(err) {
        res.status(400).json({success: false, error: err.message});
    }
};

const getBooking = async (req, res) => {
    try {
        const bookingId = Number(req.params.id);
        const { fields } = req.query;
        let select = undefined;
        if (fields) { 
            select = {}; 
            fields.split(',').forEach(f => { 
                select[f.trim()] = true; 
            }); 
        }
        const booking = await prisma.booking.findUnique({
            where: {
                id: bookingId
            },
            select
        });
        if(!booking){
            return res.status(404).json({success: false, error: 'Booking not found'});
        }
        res.status(200).json({success: true, data: booking});
    } catch(err) {
        res.status(400).json({success: false, error: err.message});
    }
}

const updateBookingStatus = async (req, res) => { 
    try {
        const bookingId = req.params.id;
        const status = req.body.status;
        const allowedStatuses = ["BOOKED", "CANCELLED", "COMPLETED"];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ success: false, error: "Invalid status" });
        }
        const booking = await prisma.booking.update({
            where: {
                id: Number(bookingId)
            },
            data: {
                status: status
            }
        });

        if (status === "BOOKED") {
            if (bookedRoomData?.length > 0) {
                await Promise.all(
                    bookedRoomData.map(room =>
                    createBookedRoomWithCondition({
                        roomId: room.roomId,
                        petId: room.petId,
                        bookingId: booking.id,
                        checkIn: room.checkIn,
                        checkOut: room.checkOut
                    })
                ));
            }

            if (bookedServiceData?.length > 0) {
                await Promise.all(
                    bookedServiceData.map(service =>
                    createBookedServiceWithCondition({
                        serviceId: service.serviceId,
                        petId: service.petId,
                        bookingId: booking.id,
                        scheduled: service.scheduled
                    })
                ));
            }
        }
        res.status(200).json({success: true, data: booking});
    } catch(err) {
        res.status(400).json({success: false, error: err.message});
    }
};

const createBooking = async (req, res) => {
    try {
        const bookingDate = req.body.date;
        const customerId = req.body.customerId;
        const booking = await prisma.booking.create({
            data: {
                customerId: customerId,
                date: new Date(bookingDate),
                status: 'PENDING',
                payment: 'PENDING'
            }
        });
        res.status(201).json({success: true, data: booking});
    } catch(err){
        res.status(400).json({success: false, error: err.message});
    }
};

const deleteBooking = async (req, res) => { 
    try {          
        const bookingId = req.params.id;                         
        const booking = await prisma.booking.delete({
            where : {id : Number(bookingId)}
        });
        res.status(200).json({success: true, data: {}});
    } catch(err) {
        res.status(400).json({success: false, error: err.message});
    }
};

const checkBookingStatus = async (req, res) => {
    const bookingId = Number(req.query.id);
    const booking = await prisma.booking.findUnique({
        where: {
            id: bookingId
        }
    });

    if(!booking) res
};

const getMyBookings = async (req, res) => {
  try {
    const customerId = Number(req.query.customerId);

    const bookings = await prisma.booking.findMany({
      where: { customerId },
      include: {
        booked_room: { 
            include: { 
                room: true, 
                pet: {
                    select:{
                        name:true,
                        type:true
                    }
                }
            } 
        },
        booked_service: { 
            include: { 
                service: {
                    select:{
                        name: true,
                        picture: true
                    }
                }, 
                pet: true 
            } 
        }
      },
    });

    res.status(200).json({ success: true, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const cancelBooking = async(req, res) =>{
    try {
    const id = Number(req.params.id);

    const booking = await prisma.booking.findUnique({
      where: { id: id }
    });

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    if (booking.status !== "BOOKED" && booking.status !== "PENDING") {
      return res.status(400).json({
        success: false,
        message: "Booking cannot be cancelled"
      });
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: id },
      data: { status: "CANCELLED" }
    });

    res.status(200).json({ success: true, booking: updatedBooking });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

module.exports = {
    getBookings,
    getBooking,
    updateBookingStatus,
    createBooking,
    deleteBooking,
    getMyBookings,
    cancelBooking
};
