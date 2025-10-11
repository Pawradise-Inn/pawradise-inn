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
    getAvailableRooms,
    getRoomsWithPagination,
    getRoomStatus,
    getRoomReviews
} = require('../controllers/room')

const {protect, authorize} = require('../middleware/auth');

const chatlogs = require('./chatlog.js');
router.use('/:roomId/comments', chatlogs);

router.route('/available')
    .get(getAvailableRooms);

router.route('/reviews')
    .get(getRoomsWithPagination);

router.route('/')
    .get(getRooms)
    .post(protect, authorize("STAFF"),createRoom);

router.route('/:id')
    .get(getRoom)
    .patch(protect, authorize("STAFF"),updateRoom)
    .delete(protect, authorize("STAFF"),deleteRoom);

router.route('/:id/pictures')
    .post(protect, authorize("STAFF"), addPicturesToRoom)
    .delete(protect, authorize("STAFF"), deletePicturesFromRoom);

router.route('/:id/status')
    .get(getRoomStatus);

router.route('/:id/reviews')
    .get(getRoomReviews);

module.exports = router;