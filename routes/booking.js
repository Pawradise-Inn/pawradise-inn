const express = require('express')
const router = express.Router()

const {
    getBookings,
    getBooking,
    getBookingStatus,
    getCustomerBookings,
    updateBooking,
    updateBookingStatus,
//    createBooking,
    deleteBooking
} = require('../controllers/booking')

router.route('/')
    .get(getBookings)
//    .post(createBooking);

router.route('/:id')
    .get(getBooking)
    .put(updateBooking)
    .delete(deleteBooking);

router.route('/:id/status')
    .get(getBookingStatus)
    .put(updateBookingStatus);

router.route('/customers/:id')
    .get(getCustomerBookings);

module.exports = router;