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
 *     summary: Get available rooms for specified date range
 *     tags: [Rooms]
 *     parameters:
 *       - in: query
 *         name: checkIn
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *           example: "2024-12-01T14:00:00Z"
 *         description: Check-in date and time (ISO 8601 format)
 *       - in: query
 *         name: checkOut
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *           example: "2024-12-05T12:00:00Z"
 *         description: Check-out date and time (ISO 8601 format)
 *     responses:
 *       200:
 *         description: List of available rooms with availability status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 type:
 *                   type: string
 *                   example: "LOADED_SUCCESSFULLY"
 *                 message:
 *                   type: string
 *                   example: "Available rooms loaded"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       image:
 *                         type: string
 *                         example: "https://storage.googleapis.com/paw_image/rooms/room1.jpg"
 *                       reviewStar:
 *                         type: string
 *                         example: "4.50"
 *                       forWhich:
 *                         type: string
 *                         enum: [DOG, CAT, MOUSE, RABBIT, BIRD]
 *                         example: "DOG"
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 2000.00
 *                       size:
 *                         type: integer
 *                         description: Current number of bookings
 *                         example: 2
 *                       maxsize:
 *                         type: integer
 *                         description: Maximum capacity
 *                         example: 5
 *                       commentPages:
 *                         type: object
 *                         properties:
 *                           "1":
 *                             type: integer
 *                             example: 0
 *                           "2":
 *                             type: integer
 *                             example: 1
 *                           "3":
 *                             type: integer
 *                             example: 2
 *                           "4":
 *                             type: integer
 *                             example: 5
 *                           "5":
 *                             type: integer
 *                             example: 10
 *                           total:
 *                             type: integer
 *                             example: 18
 *                       status:
 *                         type: string
 *                         enum: [available, full]
 *                         example: "available"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNABLE_TO_LOAD"
 *                 message:
 *                   type: string
 *                   example: "Unable to load available rooms. Please refresh and try again"
 */

/** 
 * @swagger
 * /rooms/reviews:
 *   get:
 *     summary: Get all rooms with reviews and availability status
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of rooms with reviews and availability
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 type:
 *                   type: string
 *                   example: "LOADED_SUCCESSFULLY"
 *                 message:
 *                   type: string
 *                   example: "Rooms loaded"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       image:
 *                         type: string
 *                         example: "https://storage.googleapis.com/paw_image/rooms/room1.jpg"
 *                       reviewStar:
 *                         type: string
 *                         example: "4.50"
 *                       forWhich:
 *                         type: string
 *                         enum: [DOG, CAT, MOUSE, RABBIT, BIRD]
 *                         example: "DOG"
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 2000.00
 *                       size:
 *                         type: integer
 *                         description: Current number of bookings
 *                         example: 2
 *                       maxsize:
 *                         type: integer
 *                         description: Maximum capacity
 *                         example: 5
 *                       commentPages:
 *                         type: object
 *                         properties:
 *                           "1":
 *                             type: integer
 *                             example: 0
 *                           "2":
 *                             type: integer
 *                             example: 1
 *                           "3":
 *                             type: integer
 *                             example: 2
 *                           "4":
 *                             type: integer
 *                             example: 5
 *                           "5":
 *                             type: integer
 *                             example: 10
 *                           total:
 *                             type: integer
 *                             example: 18
 *                       status:
 *                         type: string
 *                         enum: [available, full]
 *                         example: "available"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNAUTHORIZED"
 *                 message:
 *                   type: string
 *                   example: "Not authorized to access this route"
 *       404:
 *         description: No rooms found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "NO_DATA_FOUND"
 *                 message:
 *                   type: string
 *                   example: "No rooms found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNABLE_TO_LOAD"
 *                 message:
 *                   type: string
 *                   example: "Unable to load rooms. Please refresh and try again"
 */

/** 
 * @swagger
 * /rooms:
 *   get:
 *     summary: Get all rooms with filtering, sorting, and pagination
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *           example: '{"name":{"contains":"Deluxe"},"petType":"DOG"}'
 *         description: JSON string for filtering rooms (e.g., by name, petType)
 *       - in: query
 *         name: select
 *         schema:
 *           type: string
 *           example: "id,name,price,capacity"
 *         description: Comma-separated list of fields to select
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           example: "price:desc,name:asc"
 *         description: Comma-separated list of fields with sort direction (field:asc or field:desc)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of rooms with pagination info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 type:
 *                   type: string
 *                   example: "LOADED_SUCCESSFULLY"
 *                 message:
 *                   type: string
 *                   example: "Rooms loaded successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Deluxe Suite"
 *                       number:
 *                         type: integer
 *                         example: 101
 *                       capacity:
 *                         type: integer
 *                         example: 5
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 2000.00
 *                       picture:
 *                         type: string
 *                         example: "https://storage.googleapis.com/paw_image/rooms/room1.jpg"
 *                       petType:
 *                         type: string
 *                         enum: [DOG, CAT, MOUSE, RABBIT, BIRD]
 *                         example: "DOG"
 *                 count:
 *                   type: integer
 *                   example: 25
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNAUTHORIZED"
 *                 message:
 *                   type: string
 *                   example: "Not authorized to access this route"
 *       404:
 *         description: No rooms found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "NO_DATA_FOUND"
 *                 message:
 *                   type: string
 *                   example: "No rooms are available at the moment"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNABLE_TO_LOAD"
 *                 message:
 *                   type: string
 *                   example: "Unable to load rooms. Please refresh and try again"
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
 *             required:
 *               - name
 *               - capacity
 *               - price
 *               - type
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 30
 *                 example: "Deluxe Suite"
 *                 description: Room name
 *               capacity:
 *                 type: integer
 *                 example: 5
 *                 description: Maximum number of pets the room can accommodate
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 2000.00
 *                 description: Room price per night
 *               type:
 *                 type: string
 *                 enum: [DOG, CAT, MOUSE, RABBIT, BIRD]
 *                 example: "DOG"
 *                 description: Type of pet the room is designed for
 *               picture:
 *                 type: string
 *                 example: "https://storage.googleapis.com/paw_image/rooms/room1.jpg"
 *                 description: Room picture URL (optional, defaults to unnamed.jpg)
 *     responses:
 *       201:
 *         description: Room created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 type:
 *                   type: string
 *                   example: "CREATED_SUCCESSFULLY"
 *                 message:
 *                   type: string
 *                   example: "Room created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Deluxe Suite"
 *                     number:
 *                       type: integer
 *                       example: 101
 *                     capacity:
 *                       type: integer
 *                       example: 5
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 2000.00
 *                     picture:
 *                       type: string
 *                       example: "https://storage.googleapis.com/paw_image/rooms/room1.jpg"
 *                     petType:
 *                       type: string
 *                       enum: [DOG, CAT, MOUSE, RABBIT, BIRD]
 *                       example: "DOG"
 *       400:
 *         description: Missing required fields or invalid pet type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "MISSING_FIELDS"
 *                 message:
 *                   type: string
 *                   example: "Please provide all required fields: name, capacity, price, and type"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNAUTHORIZED"
 *                 message:
 *                   type: string
 *                   example: "Not authorized to access this route"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNABLE_TO_SAVE"
 *                 message:
 *                   type: string
 *                   example: "Unable to create room"
 */

/** 
 * @swagger
 * /rooms/{id}:
 *   get:
 *     summary: Get room details by ID
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The room ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Room details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 type:
 *                   type: string
 *                   example: "LOADED_SUCCESSFULLY"
 *                 message:
 *                   type: string
 *                   example: "Room details loaded"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Deluxe Suite"
 *                     number:
 *                       type: integer
 *                       example: 101
 *                     capacity:
 *                       type: integer
 *                       example: 5
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 2000.00
 *                     picture:
 *                       type: string
 *                       example: "https://storage.googleapis.com/paw_image/rooms/room1.jpg"
 *                     petType:
 *                       type: string
 *                       enum: [DOG, CAT, MOUSE, RABBIT, BIRD]
 *                       example: "DOG"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNAUTHORIZED"
 *                 message:
 *                   type: string
 *                   example: "Not authorized to access this route"
 *       404:
 *         description: Room not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "ROOM_NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "Room not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNABLE_TO_LOAD"
 *                 message:
 *                   type: string
 *                   example: "Unable to load room details. Please refresh and try again"
 *   patch:
 *     summary: Update room details
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The room ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 2500.00
 *                 description: Updated room price
 *               name:
 *                 type: string
 *                 maxLength: 30
 *                 example: "Premium Suite"
 *                 description: Updated room name
 *               petType:
 *                 type: string
 *                 enum: [DOG, CAT, MOUSE, RABBIT, BIRD]
 *                 example: "CAT"
 *                 description: Updated pet type
 *               capacity:
 *                 type: integer
 *                 example: 8
 *                 description: Updated room capacity
 *               picture:
 *                 type: string
 *                 example: "https://storage.googleapis.com/paw_image/rooms/room2.jpg"
 *                 description: Updated room picture URL
 *     responses:
 *       200:
 *         description: Room updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 type:
 *                   type: string
 *                   example: "UPDATED_SUCCESSFULLY"
 *                 message:
 *                   type: string
 *                   example: "Room updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Premium Suite"
 *                     number:
 *                       type: integer
 *                       example: 101
 *                     capacity:
 *                       type: integer
 *                       example: 8
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 2500.00
 *                     picture:
 *                       type: string
 *                       example: "https://storage.googleapis.com/paw_image/rooms/room2.jpg"
 *                     petType:
 *                       type: string
 *                       enum: [DOG, CAT, MOUSE, RABBIT, BIRD]
 *                       example: "CAT"
 *       400:
 *         description: Missing fields to update
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "MISSING_FIELDS"
 *                 message:
 *                   type: string
 *                   example: "Please provide details to update"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNAUTHORIZED"
 *                 message:
 *                   type: string
 *                   example: "Not authorized to access this route"
 *       404:
 *         description: Room not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "ROOM_NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "Room not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNABLE_TO_UPDATE"
 *                 message:
 *                   type: string
 *                   example: "Unable to update room. Please try again"
 *   delete:
 *     summary: Delete a room
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The room ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Room deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 type:
 *                   type: string
 *                   example: "DELETED_SUCCESSFULLY"
 *                 message:
 *                   type: string
 *                   example: "Room deleted successfully"
 *                 data:
 *                   type: object
 *                   example: {}
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNAUTHORIZED"
 *                 message:
 *                   type: string
 *                   example: "Not authorized to access this route"
 *       404:
 *         description: Room not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "ROOM_NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "Room not found or has already been deleted"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNABLE_TO_DELETE"
 *                 message:
 *                   type: string
 *                   example: "Unable to delete room. Please try again"
 */

/** 
 * @swagger
 * /rooms/{id}/pictures:
 *   post:
 *     summary: Update room picture
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The room ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - picture
 *             properties:
 *               picture:
 *                 type: string
 *                 example: "https://storage.googleapis.com/paw_image/rooms/room1.jpg"
 *                 description: URL of the room picture
 *     responses:
 *       200:
 *         description: Room picture updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 type:
 *                   type: string
 *                   example: "UPDATED_SUCCESSFULLY"
 *                 message:
 *                   type: string
 *                   example: "Room picture updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Deluxe Suite"
 *                     number:
 *                       type: integer
 *                       example: 101
 *                     capacity:
 *                       type: integer
 *                       example: 5
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 2000.00
 *                     picture:
 *                       type: string
 *                       example: "https://storage.googleapis.com/paw_image/rooms/room1.jpg"
 *                     petType:
 *                       type: string
 *                       enum: [DOG, CAT, MOUSE, RABBIT, BIRD]
 *                       example: "DOG"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNAUTHORIZED"
 *                 message:
 *                   type: string
 *                   example: "Not authorized to access this route"
 *       404:
 *         description: Room not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "ROOM_NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "Room not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNABLE_TO_UPDATE"
 *                 message:
 *                   type: string
 *                   example: "Unable to add pictures to room. Please try again"
 *   delete:
 *     summary: Remove room picture (resets to default)
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The room ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Room picture removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 type:
 *                   type: string
 *                   example: "UPDATED_SUCCESSFULLY"
 *                 message:
 *                   type: string
 *                   example: "Room picture removed successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Deluxe Suite"
 *                     number:
 *                       type: integer
 *                       example: 101
 *                     capacity:
 *                       type: integer
 *                       example: 5
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 2000.00
 *                     picture:
 *                       type: string
 *                       example: "https://storage.googleapis.com/paw_image/rooms/unnamed.jpg"
 *                     petType:
 *                       type: string
 *                       enum: [DOG, CAT, MOUSE, RABBIT, BIRD]
 *                       example: "DOG"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNAUTHORIZED"
 *                 message:
 *                   type: string
 *                   example: "Not authorized to access this route"
 *       404:
 *         description: Room not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "ROOM_NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "Room not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNABLE_TO_UPDATE"
 *                 message:
 *                   type: string
 *                   example: "Unable to remove pictures from room. Please try again"
 */

/** 
 * @swagger
 * /rooms/{id}/status:
 *   get:
 *     summary: Check room availability for a specific date range
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The room ID
 *         example: 1
 *       - in: query
 *         name: entry_date
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *           example: "2024-12-01T14:00:00Z"
 *         description: Check-in date and time (ISO 8601 format)
 *       - in: query
 *         name: exit_date
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *           example: "2024-12-05T12:00:00Z"
 *         description: Check-out date and time (ISO 8601 format)
 *     responses:
 *       200:
 *         description: Room availability status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 type:
 *                   type: string
 *                   example: "LOADED_SUCCESSFULLY"
 *                 message:
 *                   type: string
 *                   example: "Room availability checked"
 *                 data:
 *                   type: null
 *                   example: null
 *                 count:
 *                   type: integer
 *                   example: 3
 *                   description: Number of overlapping bookings (including cart items)
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNAUTHORIZED"
 *                 message:
 *                   type: string
 *                   example: "Not authorized to access this route"
 *       404:
 *         description: Room not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "ROOM_NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "This room could not be found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNABLE_TO_LOAD"
 *                 message:
 *                   type: string
 *                   example: "Unable to check room availability. Please refresh and try again"
 */

/** 
 * @swagger
 * /rooms/{id}/reviews:
 *   get:
 *     summary: Get reviews for a specific room with pagination and filtering
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The room ID
 *         example: 1
 *       - in: query
 *         name: roomId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Room ID to filter reviews
 *       - in: query
 *         name: star
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *           example: 5
 *         description: Filter reviews by star rating (1-5)
 *       - in: query
 *         name: NSP
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number for pagination (defaults to 1)
 *     responses:
 *       200:
 *         description: List of room reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 type:
 *                   type: string
 *                   example: "LOADED_SUCCESSFULLY"
 *                 message:
 *                   type: string
 *                   example: "Room reviews loaded"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       commenter_name:
 *                         type: string
 *                         example: "John Doe"
 *                       comment_detail:
 *                         type: string
 *                         example: "Great room! Very clean and comfortable."
 *                       comment_star:
 *                         type: number
 *                         format: float
 *                         example: 5
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "MISSING_FIELDS"
 *                 message:
 *                   type: string
 *                   example: "Please select a room to view reviews"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNAUTHORIZED"
 *                 message:
 *                   type: string
 *                   example: "Not authorized to access this route"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNABLE_TO_LOAD"
 *                 message:
 *                   type: string
 *                   example: "Unable to load room reviews. Please refresh and try again"
 */