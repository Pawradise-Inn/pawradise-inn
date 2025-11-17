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

router.get('/dashboard/checkins', protect, authorize("STAFF"), getTodayRooms);
router.get('/dashboard/checkouts', protect, authorize("STAFF"), getTodayCheckOuts);

router.route('/')
    .get(protect, authorize("STAFF", "CUSTOMER"), getBookedRooms)
    .post(protect, authorize("STAFF", "CUSTOMER"),createBookedRoom);

router.route('/:id')
    .get(protect, authorize("STAFF", "CUSTOMER"),getBookedRoom)
    .patch(protect, authorize("STAFF", "CUSTOMER"),updateBookedRoom)
    .delete(protect, authorize("STAFF", "CUSTOMER"),deleteBookedRoom);

module.exports = router;

/** 
 * @swagger
 * tags:
 *   name: BookedRooms
 *   description: Booked room management API
 */

/** 
 * @swagger
 * /bookedRooms/dashboard/checkins:
 *   get:
 *     summary: Get today's room check-ins
 *     description: Retrieve all room bookings with check-in date scheduled for today
 *     tags: [BookedRooms]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Today's check-ins loaded successfully
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
 *                   example: "Today's room bookings loaded"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       bookingId:
 *                         type: integer
 *                         example: 1
 *                       roomId:
 *                         type: integer
 *                         example: 5
 *                       roomImage:
 *                         type: string
 *                         nullable: true
 *                         example: "https://example.com/room.jpg"
 *                       petId:
 *                         type: integer
 *                         example: 3
 *                       petName:
 *                         type: string
 *                         nullable: true
 *                         example: "Buddy"
 *                       checkIn:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-11-17T14:00:00.000Z"
 *                       checkOut:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-11-20T10:00:00.000Z"
 *                       petStatus:
 *                         type: string
 *                         nullable: true
 *                         enum: ["IDLE", "RESERVED", "CHECKED_IN", "CHECKED_OUT", "QUEUE", "IN_PROGRESS", "COMPLETED"]
 *                         example: "RESERVED"
 *                       roomName:
 *                         type: string
 *                         example: "Deluxe Suite A"
 *                       roomStatus:
 *                         type: string
 *                         enum: ["PENDING", "RESERVED", "CHECKED_IN", "CHECKED_OUT", "CANCELLED"]
 *                         example: "RESERVED"
 *       401:
 *         description: Unauthorized - Authentication required
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
 *       403:
 *         description: Forbidden - Insufficient permissions
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
 *                   example: "FORBIDDEN"
 *                 message:
 *                   type: string
 *                   example: "User role is not authorized to access this route"
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
 *                   example: "Unable to load today's room bookings. Please refresh and try again"
 */

/** 
 * @swagger
 * /bookedRooms/dashboard/checkouts:
 *   get:
 *     summary: Get today's room check-outs
 *     description: Retrieve all room bookings with check-out date scheduled for today
 *     tags: [BookedRooms]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Today's check-outs loaded successfully
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
 *                   example: "Today's check-out rooms loaded"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       bookingId:
 *                         type: integer
 *                         example: 1
 *                       roomId:
 *                         type: integer
 *                         example: 5
 *                       roomImage:
 *                         type: string
 *                         nullable: true
 *                         example: "https://example.com/room.jpg"
 *                       petId:
 *                         type: integer
 *                         example: 3
 *                       petName:
 *                         type: string
 *                         nullable: true
 *                         example: "Buddy"
 *                       checkIn:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-11-14T14:00:00.000Z"
 *                       checkOut:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-11-17T10:00:00.000Z"
 *                       petStatus:
 *                         type: string
 *                         nullable: true
 *                         enum: ["IDLE", "RESERVED", "CHECKED_IN", "CHECKED_OUT", "QUEUE", "IN_PROGRESS", "COMPLETED"]
 *                         example: "CHECKED_IN"
 *                       roomName:
 *                         type: string
 *                         example: "Deluxe Suite A"
 *                       roomStatus:
 *                         type: string
 *                         enum: ["PENDING", "RESERVED", "CHECKED_IN", "CHECKED_OUT", "CANCELLED"]
 *                         example: "CHECKED_IN"
 *       401:
 *         description: Unauthorized - Authentication required
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
 *       403:
 *         description: Forbidden - Insufficient permissions
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
 *                   example: "FORBIDDEN"
 *                 message:
 *                   type: string
 *                   example: "User role is not authorized to access this route"
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
 *                   example: "Unable to load today's check-out rooms. Please refresh and try again"
 */

/** 
 * @swagger
 * /bookedRooms:
 *   get:
 *     summary: Get all booked rooms
 *     description: Retrieve a list of all room bookings with room, pet, and booking details
 *     tags: [BookedRooms]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Room bookings loaded successfully
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
 *                   example: "Room bookings loaded"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       bookingId:
 *                         type: integer
 *                         example: 1
 *                       roomId:
 *                         type: integer
 *                         example: 5
 *                       roomImage:
 *                         type: string
 *                         nullable: true
 *                         example: "https://example.com/room.jpg"
 *                       petId:
 *                         type: integer
 *                         example: 3
 *                       petName:
 *                         type: string
 *                         nullable: true
 *                         example: "Buddy"
 *                       checkIn:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-11-17T14:00:00.000Z"
 *                       checkOut:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-11-20T10:00:00.000Z"
 *                       petStatus:
 *                         type: string
 *                         nullable: true
 *                         enum: ["IDLE", "RESERVED", "CHECKED_IN", "CHECKED_OUT", "QUEUE", "IN_PROGRESS", "COMPLETED"]
 *                         example: "RESERVED"
 *                       roomName:
 *                         type: string
 *                         example: "Deluxe Suite A"
 *                       roomStatus:
 *                         type: string
 *                         enum: ["PENDING", "RESERVED", "CHECKED_IN", "CHECKED_OUT", "CANCELLED"]
 *                         example: "RESERVED"
 *       401:
 *         description: Unauthorized - Authentication required
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
 *         description: No room bookings found
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
 *                   example: "No room bookings found"
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
 *                   example: "Unable to load room bookings. Please refresh and try again"
 *   post:
 *     summary: Create a new room booking
 *     description: Create a new room booking for a pet. The system validates room availability, pet suitability, and prevents duplicate bookings.
 *     tags: [BookedRooms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roomId
 *               - pet_name
 *               - bookingId
 *               - checkIn
 *               - checkOut
 *             properties:
 *               roomId:
 *                 type: integer
 *                 description: ID of the room to book
 *                 example: 5
 *               pet_name:
 *                 type: string
 *                 description: Name of the pet to book the room for
 *                 example: "Buddy"
 *               bookingId:
 *                 type: integer
 *                 description: ID of the parent booking
 *                 example: 1
 *               checkIn:
 *                 type: string
 *                 format: date-time
 *                 description: Check-in date and time (ISO 8601 format)
 *                 example: "2025-11-17T14:00:00.000Z"
 *               checkOut:
 *                 type: string
 *                 format: date-time
 *                 description: Check-out date and time (ISO 8601 format)
 *                 example: "2025-11-20T10:00:00.000Z"
 *     responses:
 *       201:
 *         description: Room booking created successfully
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
 *                   example: "BOOKING_CREATED"
 *                 message:
 *                   type: string
 *                   example: "Room booking created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 10
 *                     checkIn:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-11-17T14:00:00.000Z"
 *                     checkOut:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-11-20T10:00:00.000Z"
 *                     status:
 *                       type: string
 *                       enum: ["PENDING", "RESERVED", "CHECKED_IN", "CHECKED_OUT", "CANCELLED"]
 *                       example: "PENDING"
 *                     roomId:
 *                       type: integer
 *                       example: 5
 *                     petId:
 *                       type: integer
 *                       example: 3
 *                     bookingId:
 *                       type: integer
 *                       example: 1
 *       401:
 *         description: Unauthorized - Authentication required
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
 *       409:
 *         description: Conflict - Room not suitable, duplicate booking, or room full
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
 *                   enum: ["OPERATION_NOT_ALLOWED", "DUPLICATE_BOOKING"]
 *                   example: "OPERATION_NOT_ALLOWED"
 *                 message:
 *                   type: string
 *                   example: "This room type is not suitable for your pet"
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
 *                   example: "Unable to create room booking. Please try again"
 */

/** 
 * @swagger
 * /bookedRooms/{id}:
 *   get:
 *     summary: Get booked room by ID
 *     description: Retrieve detailed information about a specific room booking
 *     tags: [BookedRooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The booked room ID
 *         example: 10
 *     responses:
 *       200:
 *         description: Booked room details loaded successfully
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
 *                   example: "Room booking details loaded"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 10
 *                     checkIn:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-11-17T14:00:00.000Z"
 *                     checkOut:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-11-20T10:00:00.000Z"
 *                     status:
 *                       type: string
 *                       enum: ["PENDING", "RESERVED", "CHECKED_IN", "CHECKED_OUT", "CANCELLED"]
 *                       example: "RESERVED"
 *                     roomId:
 *                       type: integer
 *                       example: 5
 *                     petId:
 *                       type: integer
 *                       example: 3
 *                     bookingId:
 *                       type: integer
 *                       example: 1
 *       401:
 *         description: Unauthorized - Authentication required
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
 *         description: Booked room not found
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
 *                   example: "BOOKING_NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "Room booking not found"
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
 *                   example: "Unable to load booking details. Please refresh and try again"
 *   patch:
 *     summary: Update booked room
 *     description: Update check-in/check-out dates or status of a room booking. Validates room availability and prevents duplicate bookings when updating dates.
 *     tags: [BookedRooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The booked room ID
 *         example: 10
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               checkIn:
 *                 type: string
 *                 format: date-time
 *                 description: New check-in date and time (must be provided with checkOut)
 *                 example: "2025-11-18T14:00:00.000Z"
 *               checkOut:
 *                 type: string
 *                 format: date-time
 *                 description: New check-out date and time (must be provided with checkIn)
 *                 example: "2025-11-21T10:00:00.000Z"
 *               status:
 *                 type: string
 *                 enum: ["PENDING", "CONFIRMED", "CHECKED_IN", "CHECKED_OUT", "CANCELLED"]
 *                 description: New booking status
 *                 example: "CONFIRMED"
 *     responses:
 *       200:
 *         description: Booked room updated successfully
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
 *                   example: "BOOKING_UPDATED"
 *                 message:
 *                   type: string
 *                   example: "Room booking updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 10
 *                     checkIn:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-11-18T14:00:00.000Z"
 *                     checkOut:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-11-21T10:00:00.000Z"
 *                     status:
 *                       type: string
 *                       enum: ["PENDING", "RESERVED", "CHECKED_IN", "CHECKED_OUT", "CANCELLED"]
 *                       example: "CONFIRMED"
 *                     roomId:
 *                       type: integer
 *                       example: 5
 *                     petId:
 *                       type: integer
 *                       example: 3
 *                     bookingId:
 *                       type: integer
 *                       example: 1
 *       400:
 *         description: Bad request - Missing fields or invalid status
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
 *                   enum: ["MISSING_FIELDS", "INVALID_STATUS"]
 *                   example: "MISSING_FIELDS"
 *                 message:
 *                   type: string
 *                   example: "Please provide both check-in and check-out dates"
 *       401:
 *         description: Unauthorized - Authentication required
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
 *         description: Booked room not found
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
 *                   example: "BOOKING_NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "Room booking not found or already deleted"
 *       409:
 *         description: Conflict - Room not available or duplicate booking
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
 *                   enum: ["OPERATION_NOT_ALLOWED", "DUPLICATE_BOOKING"]
 *                   example: "OPERATION_NOT_ALLOWED"
 *                 message:
 *                   type: string
 *                   example: "This room is not available for the selected dates"
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
 *                   example: "Unable to update booking. Please try again"
 *   delete:
 *     summary: Delete booked room (cancel booking)
 *     description: Cancel a room booking. Cancellation is only allowed before the cancellation deadline (one day before check-in).
 *     tags: [BookedRooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The booked room ID
 *         example: 10
 *     responses:
 *       200:
 *         description: Booked room cancelled successfully
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
 *                   example: "Room booking cancelled successfully"
 *                 data:
 *                   type: object
 *                   example: {}
 *       401:
 *         description: Unauthorized - Authentication required
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
 *       403:
 *         description: Forbidden - Cancellation deadline has passed
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
 *                   example: "CANCELLATION_DEADLINE_PASSED"
 *                 message:
 *                   type: string
 *                   example: "Cannot cancel booking. The cancellation deadline has passed. You can only cancel bookings before the next day after the check-in date."
 *       404:
 *         description: Booked room not found
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
 *                   example: "BOOKING_NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "Room booking not found or already deleted"
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
 *                   example: "Unable to cancel booking. Please try again"
 */