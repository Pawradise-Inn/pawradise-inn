const express = require('express');
const router = express.Router();

const {
    getBookings,
    getBooking,
    updateBookingStatus,
    createBooking,
    deleteBooking,
    getMyBookings,
    cancelBooking
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

router.route('/:id/cancel')
    .patch(cancelBooking);

module.exports = router;
