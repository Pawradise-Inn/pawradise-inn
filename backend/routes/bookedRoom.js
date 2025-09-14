const express = require('express');
const router = express.Router();

const {
    getBookedRooms,
    getBookedRoom,
    createBookedRoom,
    updateBookedRoom,
    deleteBookedRoom
} = require('../controllers/bookedRoom');

router.route('/')
    .get(getBookedRooms)
    .post(createBookedRoom);

router.route('/:id')
    .get(getBookedRoom)
    .patch(updateBookedRoom)
    .delete(deleteBookedRoom);

module.exports = router;