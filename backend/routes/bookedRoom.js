const express = require('express');
const router = express.Router();

const {
    getBookedRooms,
    getBookedRoom,
    createBookedRoom,
    updateBookedRoom,
    deleteBookedRoom,
    getTodayRooms
} = require('../controllers/bookedRoom');

const {protect, authorize} = require('../middleware/auth');

router.get('/dashboard', getTodayRooms);
router.route('/')
    .get(protect, authorize("STAFF", "CUSTOMER"), getBookedRooms)
    .post(protect, authorize("STAFF", "CUSTOMER"),createBookedRoom);

router.route('/:id')
    .get(protect, authorize("STAFF", "CUSTOMER"),getBookedRoom)
    .patch(protect, authorize("STAFF", "CUSTOMER"),updateBookedRoom)
    .delete(protect, authorize("STAFF", "CUSTOMER"),deleteBookedRoom);

module.exports = router;