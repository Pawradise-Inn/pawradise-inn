const express = require('express');
const router = express.Router();

const {
    getBookedRooms,
    getBookedRoom,
    createBookedRoom,
    updateBookedRoom,
    deleteBookedRoom,
    getTodayRooms,
    getTodayCheckOuts
} = require('../controllers/bookedRoom');

const {protect, authorize} = require('../middleware/auth');

router.get('/dashboard/checkins', getTodayRooms);
router.get('/dashboard/checkouts', getTodayCheckOuts);

router.route('/')
    .get(protect, authorize("STAFF", "CUSTOMER"), getBookedRooms)
    .post(protect, authorize("STAFF", "CUSTOMER"),createBookedRoom);

router.route('/:id')
    .get(protect, authorize("STAFF", "CUSTOMER"),getBookedRoom)
    .patch(protect, authorize("STAFF", "CUSTOMER"),updateBookedRoom)
    .delete(protect, authorize("STAFF", "CUSTOMER"),deleteBookedRoom);

module.exports = router;