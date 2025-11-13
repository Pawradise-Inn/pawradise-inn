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
    .get(protect, getRoomsWithPagination);

router.route('/')
    .get(protect, getRooms)
    .post(protect, authorize("STAFF"),createRoom);

router.route('/:id')
    .get(protect, getRoom)
    .patch(protect, authorize("STAFF"),updateRoom)
    .delete(protect, authorize("STAFF"),deleteRoom);

router.route('/:id/pictures')
    .post(protect, authorize("STAFF"), addPicturesToRoom)
    .delete(protect, authorize("STAFF"), deletePicturesFromRoom);

router.route('/:id/status')
    .get(protect, getRoomStatus);

router.route('/:id/reviews')
    .get(protect, getRoomReviews);

module.exports = router;

/** 
 * @swagger
 * tags:
 *   name: Rooms
 *   description: Room management API
 */

/** 
 * @swagger
 * /rooms/available:
 *   get:
 *     summary: Get available rooms
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: List of available rooms
 *       500:
 *         description: Internal server error
 */

/** 
 * @swagger
 * /rooms/reviews:
 *   get:
 *     summary: Get rooms with pagination and reviews
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: Paginated list of rooms with reviews
 *       500:
 *         description: Internal server error
 */

/** 
 * @swagger
 * /rooms:
 *   get:
 *     summary: Get all rooms
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: List of all rooms
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new room
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Room created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/** 
 * @swagger
 * /rooms/{id}:
 *   get:
 *     summary: Get room by ID
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The room ID
 *     responses:
 *       200:
 *         description: Room details
 *       404:
 *         description: Room not found
 *       500:
 *         description: Internal server error
 *   patch:
 *     summary: Update room
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The room ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Room updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Room not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete room
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The room ID
 *     responses:
 *       200:
 *         description: Room deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Room not found
 *       500:
 *         description: Internal server error
 */

/** 
 * @swagger
 * /rooms/{id}/pictures:
 *   post:
 *     summary: Add pictures to room
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The room ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Pictures added successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Room not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete pictures from room
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The room ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Pictures deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Room not found
 *       500:
 *         description: Internal server error
 */

/** 
 * @swagger
 * /rooms/{id}/status:
 *   get:
 *     summary: Get room status
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The room ID
 *     responses:
 *       200:
 *         description: Room status
 *       404:
 *         description: Room not found
 *       500:
 *         description: Internal server error
 */

/** 
 * @swagger
 * /rooms/{id}/reviews:
 *   get:
 *     summary: Get room reviews
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The room ID
 *     responses:
 *       200:
 *         description: List of room reviews
 *       404:
 *         description: Room not found
 *       500:
 *         description: Internal server error
 */