const prisma = require('../prisma/prisma');

const getBookings = async (req, res) => {   //Only Staff, customer use getCustomerBookings
    try {
        const bookings = await prisma.booking.findMany();
        res.status(200).json({success: true, data: bookings});
    } catch(err) {
        res.status(400).json({success: false, error: err.message});
    }
};

const getBooking = async (req, res) => {    //Both
    try {
        const booking = await prisma.booking.findUnique({
            where: {id: Number(req.params.id)}
        });
        if(!booking){
            return res.status(404).json({success: false, error: 'Booking not found'});
        }
        res.status(200).json({success: true, data: booking});
    } catch(err) {
        res.status(400).json({success: false, error: err.message});
    }
}

const getBookingStatus = async (req, res) => {  //Both
    try {
        const booking = await prisma.booking.findUnique({
            where: {id: Number(req.params.id)},
        });
        if(!booking){
            return res.status(404).json({success: false, error: 'Booking not found'});
        }
        res.status(200).json({success: true, data: booking.status});
    } catch(err) {
        res.status(400).json({success: false, error: err.message});
    }
}

const getCustomerBookings = async (req, res) => {  //Both
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

const updateBooking = async (req, res) => { //Staff Only
    try {
        const booking = await prisma.booking.update({
            where: {id: Number(req.params.id)},
            data: req.body
        });
        if (!booking) {
            return res.status(404).json({success: false, error: 'Booking not found'});
        }
        res.status(200).json({success: true, data: booking});
    } catch(err) {
        res.status(400).json({success: false, error: err.message});
    }
};

const updateBookingStatus = async (req, res) => { //Staff or System(If automated payment is successfully)Only
    try {
        const booking = await prisma.booking.update({
            where: {id: Number(req.params.id)},
            data: {status: req.body.status}
        });
        if (!booking) {
            return res.status(404).json({success: false, error: 'Booking not found'});
        }
        res.status(200).json({success: true, data: booking});
    } catch(err) {
        res.status(400).json({success: false, error: err.message});
    }
};

// const createBooking = async (req, res) => { //Both
//     try {
//         const { customerId, bookingDate, bookedService, bookedRoom } = req.body;
//         const booking = await prisma.booking.create({
//             data: {
//                 booking_date: new Date(bookingDate),
//                 booked_service: {
//                     //wait my function
//                 }
//             }
//         });
//     } catch(err){
//         res.status(400).json({success: false, error: err.message});
//     }
// };

const deleteBooking = async (req, res) => { //If customer not paid yet, Using this to delete
    try {                                   //Else, Using update status to cancle instead!
        const booking = await prisma.booking.delete({
            where : {id : Number(req.params.id)}
        });

        if (!booking) {
            return res.status(404).json({success: false, error: 'Booking not found or already deleted'});
        }

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
    updateBooking,
    updateBookingStatus,
//    createBooking,
    deleteBooking
};
