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
} = require('../controllers/booking');

const {protect, authorize} = require('../middleware/auth');

router.route('/mine')
    .get(protect, getMyBookings);

router.route('/cancel/:id')
    .patch(protect, cancelBooking);

router.route('/')
    .get(protect, authorize("STAFF", "CUSTOMER"), getBookings)
    .post(protect, authorize("STAFF", "CUSTOMER"), createBooking);

router.route('/:id')
    .get(protect, authorize("STAFF", "CUSTOMER"),getBooking)
    .delete(protect, authorize("STAFF", "CUSTOMER"),deleteBooking)
    .patch(protect, authorize("STAFF", "CUSTOMER"),updateBookingStatus)


module.exports = router;
