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
    getRoomStatus,
    getRoomReviews,
    getAvailableRooms,
    getAllRoomsWithReviews
} = require('../controllers/room')

router.route('/available')
    .get(getAvailableRooms);

router.route('/comments')
    .get(getRoomReviews);

router.route('/reviews')
    .get(getAllRoomsWithReviews);

const chatlogs = require('./chatlog.js');
router.use('/comments', chatlogs);
router.use('/:roomId/comments', chatlogs);

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