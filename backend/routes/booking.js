const express = require('express');
const router = express.Router();

const {
    getBookings,
    getBooking,
    updateBookingStatus,
    createBooking,
    deleteBooking,
    getMyBookings,
    cancelBooking,
    putBooking
} = require('../controllers/booking');

router.route('/mine')
    .get(getMyBookings);

router.route('/cancel/:id')
    .patch(cancelBooking);

router.route('/')
    .get(getBookings)
    .post(createBooking);

router.route('/:id')
    .get(getBooking)
    .delete(deleteBooking)
    .patch(updateBookingStatus)
    .put(putBooking);


module.exports = router;
