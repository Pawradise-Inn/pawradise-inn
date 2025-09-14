const express = require('express');
const router = express.Router();

const {
    getRooms,
    getRoom,
    createRoom,
    updateRoom,
    deleteRoom,
    addPicturesToRoom,
    deletePicturesFromRoom,
    getRoomStatus
} = require('../controllers/room')

router.route('/')
    .get(getRooms)
    .post(createRoom);

router.route('/:id')
    .get(getRoom)
    .patch(updateRoom)
    .delete(deleteRoom);

router.route('/:id/pictures')
    .post(addPicturesToRoom)
    .delete(deletePicturesFromRoom);

router.route('/:id/status')
    .get(getRoomStatus);

module.exports = router;