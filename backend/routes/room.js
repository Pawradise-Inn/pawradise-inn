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

const {protect, authorize} = require('../middleware/auth');

router.route('/available')
    .get(getAvailableRooms);

router.route('/comments')
    .get(getRoomReviews);

router.route('/reviews')
    .get(getAllRoomsWithReviews);

// const chatlogs = require('./chatlog.js');
// router.use('/comments', chatlogs);
// router.use('/:roomId/comments', chatlogs);

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
    .get(protect, authorize("STAFF"), getRoomStatus);

module.exports = router;