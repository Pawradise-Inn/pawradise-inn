const express = require('express');
const router = express.Router();

const {
    getBookings,
    getBooking,
    updateBookingStatus,
    createBooking,
    deleteBooking,
    getMyBookings,
    cancelBooking,
} = require('../controllers/booking');

const {protect, authorize} = require('../middleware/auth');

router.route('/mine')
    .get(protect, authorize("CUSTOMER"), getMyBookings);

router.route('/cancel/:id')
    .patch(protect, cancelBooking);

router.route('/')
    .get(protect, authorize("STAFF", "CUSTOMER"), getBookings)
    .post(protect, authorize("STAFF", "CUSTOMER"), createBooking);

router.route('/:id')
    .get(protect, authorize("STAFF", "CUSTOMER"),getBooking)
    .delete(protect, authorize("STAFF", "CUSTOMER"),deleteBooking)
    .patch(protect, authorize("STAFF", "CUSTOMER"),updateBookingStatus)


module.exports = router;

/** 
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Booking management API
 */

/** 
 * @swagger
 * /bookings/mine:
 *   get:
 *     summary: Get current user's bookings
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's bookings with nested booked rooms and services
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
 *                   example: "Your bookings loaded successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-15T10:00:00.000Z"
 *                       status:
 *                         type: string
 *                         enum: [PENDING, BOOKED, CANCELLED]
 *                         example: "BOOKED"
 *                       customerId:
 *                         type: integer
 *                         example: 1
 *                       paymentId:
 *                         type: integer
 *                         example: 1
 *                       customerName:
 *                         type: string
 *                         example: "John Doe"
 *                       customerEmail:
 *                         type: string
 *                         example: "john@example.com"
 *                       customerNumber:
 *                         type: string
 *                         example: "0812345678"
 *                       booked_room:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 1
 *                             checkIn:
 *                               type: string
 *                               format: date-time
 *                               example: "2024-01-15T14:00:00.000Z"
 *                             checkOut:
 *                               type: string
 *                               format: date-time
 *                               example: "2024-01-17T12:00:00.000Z"
 *                             status:
 *                               type: string
 *                               enum: [PENDING, RESERVED, CHECKED_IN, CHECKED_OUT, CANCELLED]
 *                               example: "RESERVED"
 *                             roomId:
 *                               type: integer
 *                               example: 1
 *                             petId:
 *                               type: integer
 *                               example: 1
 *                             bookingId:
 *                               type: integer
 *                               example: 1
 *                             room:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: integer
 *                                   example: 1
 *                                 name:
 *                                   type: string
 *                                   example: "Deluxe Suite"
 *                                 number:
 *                                   type: integer
 *                                   example: 101
 *                                 capacity:
 *                                   type: integer
 *                                   example: 2
 *                                 price:
 *                                   type: number
 *                                   format: float
 *                                   example: 2500.00
 *                                 picture:
 *                                   type: string
 *                                   example: "https://storage.googleapis.com/paw_image/room1.jpg"
 *                                 petType:
 *                                   type: string
 *                                   enum: [DOG, CAT, MOUSE, RABBIT, BIRD]
 *                                   example: "DOG"
 *                             pet:
 *                               type: object
 *                               properties:
 *                                 name:
 *                                   type: string
 *                                   example: "Buddy"
 *                                 type:
 *                                   type: string
 *                                   enum: [DOG, CAT, MOUSE, RABBIT, BIRD]
 *                                   example: "DOG"
 *                       booked_service:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 1
 *                             scheduled:
 *                               type: string
 *                               format: date-time
 *                               example: "2024-01-16T10:00:00.000Z"
 *                             status:
 *                               type: string
 *                               enum: [PENDING, RESERVED, QUEUE, IN_PROGRESS, COMPLETED, CANCELLED]
 *                               example: "RESERVED"
 *                             serviceId:
 *                               type: integer
 *                               example: 1
 *                             petId:
 *                               type: integer
 *                               example: 1
 *                             booking_id:
 *                               type: integer
 *                               example: 1
 *                             service:
 *                               type: object
 *                               properties:
 *                                 name:
 *                                   type: string
 *                                   example: "Grooming"
 *                                 picture:
 *                                   type: string
 *                                   example: "https://storage.googleapis.com/paw_image/service1.jpg"
 *                             pet:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: integer
 *                                   example: 1
 *                                 name:
 *                                   type: string
 *                                   example: "Buddy"
 *                                 sex:
 *                                   type: string
 *                                   enum: [MALE, FEMALE]
 *                                   example: "MALE"
 *                                 age:
 *                                   type: integer
 *                                   example: 3
 *                                 type:
 *                                   type: string
 *                                   enum: [DOG, CAT, MOUSE, RABBIT, BIRD]
 *                                   example: "DOG"
 *                                 status:
 *                                   type: string
 *                                   enum: [IDLE, RESERVED, CHECKED_IN, CHECKED_OUT, QUEUE, IN_PROGRESS, COMPLETED]
 *                                   example: "RESERVED"
 *                                 breed:
 *                                   type: string
 *                                   example: "Golden Retriever"
 *                                 disease:
 *                                   type: array
 *                                   items:
 *                                     type: string
 *                                   example: []
 *                                 allergic:
 *                                   type: array
 *                                   items:
 *                                     type: string
 *                                   example: []
 *                                 picture:
 *                                   type: string
 *                                   example: "https://storage.googleapis.com/paw_image/pet1.jpg"
 *                                 customerId:
 *                                   type: integer
 *                                   example: 1
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
 *                   example: "Unable to load your bookings. Please refresh and try again"
 */

/** 
 * @swagger
 * /bookings/cancel/{id}:
 *   patch:
 *     summary: Cancel a booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The booking ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Booking cancelled successfully
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
 *                   example: "BOOKING_CANCELLED"
 *                 message:
 *                   type: string
 *                   example: "Your booking has been cancelled"
 *                 data:
 *                   type: object
 *                   properties:
 *                     booking:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         date:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-01-15T10:00:00.000Z"
 *                         status:
 *                           type: string
 *                           enum: [PENDING, BOOKED, CANCELLED]
 *                           example: "CANCELLED"
 *                         customerId:
 *                           type: integer
 *                           example: 1
 *                         paymentId:
 *                           type: integer
 *                           example: 1
 *                         customerName:
 *                           type: string
 *                           example: "John Doe"
 *                         customerEmail:
 *                           type: string
 *                           example: "john@example.com"
 *                         customerNumber:
 *                           type: string
 *                           example: "0812345678"
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
 *         description: Booking not found
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
 *                   example: "Booking not found"
 *       409:
 *         description: Operation not allowed
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
 *                   example: "OPERATION_NOT_ALLOWED"
 *                 message:
 *                   type: string
 *                   example: "This booking cannot be cancelled"
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
 *                   example: "Unable to cancel booking. Please try again"
 */

/** 
 * @swagger
 * /bookings:
 *   get:
 *     summary: Get all bookings
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: customerId
 *         schema:
 *           type: integer
 *         description: Filter bookings by customer ID
 *         example: 1
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, BOOKED, CANCELLED]
 *         description: Filter bookings by status
 *         example: "BOOKED"
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: Comma-separated list of fields to return (e.g., "id,date,status")
 *         example: "id,date,status,customerName"
 *     responses:
 *       200:
 *         description: List of all bookings
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
 *                   example: "Bookings loaded"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-15T10:00:00.000Z"
 *                       status:
 *                         type: string
 *                         enum: [PENDING, BOOKED, CANCELLED]
 *                         example: "BOOKED"
 *                       customerId:
 *                         type: integer
 *                         example: 1
 *                       paymentId:
 *                         type: integer
 *                         example: 1
 *                       customerName:
 *                         type: string
 *                         example: "John Doe"
 *                       customerEmail:
 *                         type: string
 *                         example: "john@example.com"
 *                       customerNumber:
 *                         type: string
 *                         example: "0812345678"
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
 *                   example: "Unable to load bookings. Please refresh and try again"
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - paymentId
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Booking date and time
 *                 example: "2024-01-15T10:00:00.000Z"
 *               paymentId:
 *                 type: integer
 *                 description: Payment ID associated with this booking
 *                 example: 1
 *     responses:
 *       201:
 *         description: Booking created successfully
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
 *                   example: "Your booking has been created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-15T10:00:00.000Z"
 *                     status:
 *                       type: string
 *                       enum: [PENDING, BOOKED, CANCELLED]
 *                       example: "PENDING"
 *                     customerId:
 *                       type: integer
 *                       example: 1
 *                     paymentId:
 *                       type: integer
 *                       example: 1
 *                     customerName:
 *                       type: string
 *                       example: "John Doe"
 *                     customerEmail:
 *                       type: string
 *                       example: "john@example.com"
 *                     customerNumber:
 *                       type: string
 *                       example: "0812345678"
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
 *                   example: "Unable to create your booking. Please try again"
 */

/** 
 * @swagger
 * /bookings/{id}:
 *   get:
 *     summary: Get booking by ID
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The booking ID
 *         example: 1
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: Comma-separated list of fields to return (e.g., "id,date,status")
 *         example: "id,date,status,customerName"
 *     responses:
 *       200:
 *         description: Booking details
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
 *                   example: "Booking details loaded"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-15T10:00:00.000Z"
 *                     status:
 *                       type: string
 *                       enum: [PENDING, BOOKED, CANCELLED]
 *                       example: "BOOKED"
 *                     customerId:
 *                       type: integer
 *                       example: 1
 *                     paymentId:
 *                       type: integer
 *                       example: 1
 *                     customerName:
 *                       type: string
 *                       example: "John Doe"
 *                     customerEmail:
 *                       type: string
 *                       example: "john@example.com"
 *                     customerNumber:
 *                       type: string
 *                       example: "0812345678"
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
 *         description: Booking not found
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
 *                   example: "Booking not found"
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
 *     summary: Update booking status
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The booking ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [BOOKED, CANCELLED, PENDING]
 *                 description: New booking status
 *                 example: "BOOKED"
 *     responses:
 *       200:
 *         description: Booking status updated successfully
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
 *                   example: "Booking status updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-15T10:00:00.000Z"
 *                     status:
 *                       type: string
 *                       enum: [PENDING, BOOKED, CANCELLED]
 *                       example: "BOOKED"
 *                     customerId:
 *                       type: integer
 *                       example: 1
 *                     paymentId:
 *                       type: integer
 *                       example: 1
 *                     customerName:
 *                       type: string
 *                       example: "John Doe"
 *                     customerEmail:
 *                       type: string
 *                       example: "john@example.com"
 *                     customerNumber:
 *                       type: string
 *                       example: "0812345678"
 *       400:
 *         description: Invalid status
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
 *                   example: "INVALID_STATUS"
 *                 message:
 *                   type: string
 *                   example: "Invalid booking status. Please select a valid status"
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
 *                   example: "UNABLE_TO_UPDATE"
 *                 message:
 *                   type: string
 *                   example: "Unable to update booking status. Please try again"
 *   delete:
 *     summary: Delete booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The booking ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Booking deleted successfully
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
 *                   example: "Booking deleted successfully"
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
 *         description: Booking not found
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
 *                   example: "This booking no longer exists"
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
