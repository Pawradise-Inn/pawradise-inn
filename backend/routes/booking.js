const express = require('express');
const router = express.Router();

const {
    getBookings,
    getBooking,
    updateBookingStatus,
    createBooking,
    deleteBooking,
    getMyBookings
} = require('../controllers/booking');

router.route('/')
    .get(getBookings)
    .post(createBooking);

router.route('/:id')
    .get(getBooking)
    .delete(deleteBooking)
    .patch(updateBookingStatus);

router.route('/mine')
    .get(getMyBookings);

module.exports = router;
