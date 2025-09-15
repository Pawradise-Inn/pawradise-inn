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

router.route('/dashboard')
    .get(getTodayRooms);

router.route('/')
    .get(getBookedRooms)
    .post(createBookedRoom);

router.route('/:id')
    .get(getBookedRoom)
    .patch(updateBookedRoom)
    .delete(deleteBookedRoom);

module.exports = router;