const prisma = require('../prisma/prisma');
const {createBookedRoom} = require('./bookedRoom');
const {createBookedService} = require('./bookedService');

const getBookings = async (req, res) => {
    try {
        const bookings = await prisma.booking.findMany();
        res.status(200).json({success: true, data: bookings});
    } catch(err) {
        res.status(400).json({success: false, error: err.message});
    }
};

const getBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const booking = await prisma.booking.findUnique({
            where: {id: Number(bookingId)}
        });
        if(!booking){
            return res.status(404).json({success: false, error: 'Booking not found'});
        }
        res.status(200).json({success: true, data: booking});
    } catch(err) {
        res.status(400).json({success: false, error: err.message});
    }
}

const getBookingStatus = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const booking = await prisma.booking.findUnique({
            where: {id: bookingId},
        });
        if(!booking){
            return res.status(404).json({success: false, error: 'Booking not found'});
        }
        res.status(200).json({success: true, data: booking.status});
    } catch(err) {
        res.status(400).json({success: false, error: err.message});
    }
}

const getCustomerBookings = async (req, res) => {
    try {
        const customer = await prisma.customer.findUnique({
            where: {id: Number(req.params.id)},
            include: {
                booking: true
            }
        });

        if(!customer){
            return res.status(404).json({success: false, error: 'Customer not found'})
        }

        res.status(200).json({success: true, data: customer.booking})
    } catch(err) {
        res.status(400).json({success: false, error: err.message});
    }
};

const updateBookingStatus = async (req, res) => { 
    try {
        const bookingId = req.params.id;
        const status = req.body.status;
        const booking = await prisma.booking.update({
            where: {id: Number(bookingId)},
            data: {status: status}
        });

        if (status === 'BOOKED'){
            const {bookedRoomData, bookedServiceData} = req.body;

            if (bookedRoomData && bookedRoomData.length > 0){
                for (const room of bookedRoomData){
                    await createBookedRoom({
                        body: {
                            roomId: room.roomId,
                            petId: room.petId,
                            bookingId: booking.id,
                            checkIn: room.checkIn,
                            checkOut: room.checkOut
                        }
                    },{
                        status: () => {},
                        json: () => {}
                    });
                }
            }

            if (bookedServiceData && bookedServiceData.length > 0){
                for (const service of bookedServiceData){
                    await createBookedService({
                        body: {
                            serviceId: service.serviceId,
                            petId: service.petId,
                            bookingId: booking.id,
                            scheduled: service.scheduled
                        }
                    },{
                        status: () => {},
                        json: () => {}
                    });
                }
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
}

module.exports = {
    getBookings,
    getBooking,
    getBookingStatus,
    getCustomerBookings,
    updateBookingStatus,
    createBooking,
    deleteBooking
};
