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

router.route('/mine')
    .get(getMyBookings);

router.route('/')
    .get(getBookings)
    .post(createBooking);

router.route('/:id')
    .get(getBooking)
<<<<<<< HEAD
    //.put(updateBooking)
    .delete(deleteBooking);
=======
    .delete(deleteBooking)
    .patch(updateBookingStatus);
>>>>>>> c252c4ca659b1c00cb83621363b86ed637cb6d2c

router.route('/:id/cancel')
    .patch(cancelBooking);

module.exports = router;
