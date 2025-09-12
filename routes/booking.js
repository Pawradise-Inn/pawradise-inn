const express = require('express');
const router = express.Router();

const {
    getBookings,
    getBooking,
    getBookingStatus,
    getCustomerBookings,
    updateBookingStatus,
    deleteBooking
} = require('../controllers/booking')

router.route('/')
    .get(getBookings)

router.route('/:id')
    .get(getBooking)
    .delete(deleteBooking);

router.route('/:id/status')
    .get(getBookingStatus)
    .put(updateBookingStatus);

router.route('/customers/:id')
    .get(getCustomerBookings);

module.exports = router;
