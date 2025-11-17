const express = require('express');
const router = express.Router();

const {
    getBookedServices,
    getBookedService,
    createBookedService,
    updateBookedService,
    deleteBookedService,
    getTodayServices
} = require('../controllers/bookedService');
const { authorize, protect } = require('../middleware/auth');

router.route('/dashboard')
    .get(protect, authorize("STAFF"), getTodayServices);

router.route('/')
    .get(protect, authorize("STAFF"), getBookedServices)
    .post(protect, authorize("CUSTOMER", "STAFF"), createBookedService);

router.route('/:id')
    .get(protect, authorize("CUSTOMER", "STAFF"), getBookedService)
    .patch(protect, authorize("CUSTOMER", "STAFF"), updateBookedService)
    .delete(protect, authorize("CUSTOMER", "STAFF"), deleteBookedService);

module.exports = router;

/** 
 * @swagger
 * tags:
 *   name: BookedServices
 *   description: Booked service management API
 */

/** 
 * @swagger
 * /bookedServices/dashboard:
 *   get:
 *     summary: Get today's booked services
 *     description: Retrieves all service bookings scheduled for today with service, pet, and booking details
 *     tags: [BookedServices]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of today's booked services
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
 *                   example: "Today's services loaded"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       bookingId:
 *                         type: integer
 *                         example: 1
 *                       serviceId:
 *                         type: integer
 *                         example: 5
 *                       serviceName:
 *                         type: string
 *                         example: "Pet Grooming"
 *                       serviceImage:
 *                         type: string
 *                         nullable: true
 *                         example: "https://example.com/grooming.jpg"
 *                       petId:
 *                         type: integer
 *                         example: 3
 *                       petName:
 *                         type: string
 *                         nullable: true
 *                         example: "Max"
 *                       timeBooked:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-11-17T10:00:00.000Z"
 *                       petStatus:
 *                         type: string
 *                         nullable: true
 *                         enum: ["IDLE", "RESERVED", "CHECKED_IN", "CHECKED_OUT", "QUEUE", "IN_PROGRESS", "COMPLETED"]
 *                         example: "QUEUE"
 *                       serviceStatus:
 *                         type: string
 *                         enum: ["PENDING", "RESERVED", "QUEUE", "IN_PROGRESS", "COMPLETED", "CANCELLED"]
 *                         example: "QUEUE"
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
 *                   example: "Authentication required"
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
 *                   example: "Unable to load today's services. Please refresh and try again"
 */

/** 
 * @swagger
 * /bookedServices:
 *   get:
 *     summary: Get all booked services
 *     description: Retrieves a list of all service bookings in the system
 *     tags: [BookedServices]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all booked services
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
 *                   example: "Service bookings loaded"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       scheduled:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-11-20T14:00:00.000Z"
 *                       status:
 *                         type: string
 *                         enum: ["PENDING", "RESERVED", "QUEUE", "IN_PROGRESS", "COMPLETED", "CANCELLED"]
 *                         example: "PENDING"
 *                       serviceId:
 *                         type: integer
 *                         example: 5
 *                       petId:
 *                         type: integer
 *                         example: 3
 *                       booking_id:
 *                         type: integer
 *                         example: 10
 *       404:
 *         description: No service bookings found
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
 *                   example: "No service bookings found"
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
 *                   example: "Unable to load service bookings. Please refresh and try again"
 *   post:
 *     summary: Create a new service booking
 *     description: Creates a new service booking for a pet with validation for service suitability, availability, and scheduling conflicts
 *     tags: [BookedServices]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - service_name
 *               - pet_name
 *               - scheduled
 *               - bookingId
 *             properties:
 *               service_name:
 *                 type: string
 *                 description: Name of the service to book
 *                 example: "Pet Grooming"
 *               pet_name:
 *                 type: string
 *                 description: Name of the pet for the service
 *                 example: "Max"
 *               scheduled:
 *                 type: string
 *                 format: date-time
 *                 description: Scheduled date and time for the service
 *                 example: "2025-11-20T14:00:00.000Z"
 *               bookingId:
 *                 type: integer
 *                 description: ID of the parent booking
 *                 example: 10
 *     responses:
 *       201:
 *         description: Service booking created successfully
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
 *                   example: "Service booking created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     scheduled:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-11-20T14:00:00.000Z"
 *                     status:
 *                       type: string
 *                       enum: ["PENDING", "RESERVED", "QUEUE", "IN_PROGRESS", "COMPLETED", "CANCELLED"]
 *                       example: "PENDING"
 *                     serviceId:
 *                       type: integer
 *                       example: 5
 *                     petId:
 *                       type: integer
 *                       example: 3
 *                     booking_id:
 *                       type: integer
 *                       example: 10
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
 *                   example: "Authentication required"
 *       409:
 *         description: Conflict - Service not suitable, fully booked, duplicate booking, or pet not available
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
 *                   example: "This service is not suitable for your pet"
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
 *                   example: "Unable to create service booking. Please try again"
 */

/** 
 * @swagger
 * /bookedServices/{id}:
 *   get:
 *     summary: Get booked service by ID
 *     description: Retrieves detailed information about a specific service booking
 *     tags: [BookedServices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The booked service ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Booked service details
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
 *                   example: "Service booking details loaded"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     scheduled:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-11-20T14:00:00.000Z"
 *                     status:
 *                       type: string
 *                       enum: ["PENDING", "RESERVED", "QUEUE", "IN_PROGRESS", "COMPLETED", "CANCELLED"]
 *                       example: "PENDING"
 *                     serviceId:
 *                       type: integer
 *                       example: 5
 *                     petId:
 *                       type: integer
 *                       example: 3
 *                     booking_id:
 *                       type: integer
 *                       example: 10
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
 *                   example: "Authentication required"
 *       404:
 *         description: Booked service not found
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
 *                   example: "Service booking not found"
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
 *     summary: Update booked service
 *     description: Updates the scheduled time and/or status of a service booking with validation for availability and conflicts
 *     tags: [BookedServices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The booked service ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               scheduled:
 *                 type: string
 *                 format: date-time
 *                 description: New scheduled date and time for the service
 *                 example: "2025-11-21T15:00:00.000Z"
 *               status:
 *                 type: string
 *                 enum: ["PENDING", "CONFIRMED", "IN_PROGRESS", "COMPLETED", "CANCELLED"]
 *                 description: New status for the service booking
 *                 example: "CONFIRMED"
 *     responses:
 *       200:
 *         description: Booked service updated successfully
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
 *                   example: "Service booking updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     scheduled:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-11-21T15:00:00.000Z"
 *                     status:
 *                       type: string
 *                       enum: ["PENDING", "RESERVED", "QUEUE", "IN_PROGRESS", "COMPLETED", "CANCELLED"]
 *                       example: "CONFIRMED"
 *                     serviceId:
 *                       type: integer
 *                       example: 5
 *                     petId:
 *                       type: integer
 *                       example: 3
 *                     booking_id:
 *                       type: integer
 *                       example: 10
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
 *                   example: "INVALID_STATUS"
 *                 message:
 *                   type: string
 *                   example: "Invalid status. Must be one of: PENDING, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED"
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
 *                   example: "Authentication required"
 *       404:
 *         description: Booked service not found
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
 *                   example: "Service booking not found or already deleted"
 *       409:
 *         description: Conflict - Time slot fully booked or duplicate booking
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
 *                   example: "This time slot is fully booked. Please choose another time"
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
 *     summary: Delete booked service
 *     description: Cancels a service booking if the cancellation deadline has not passed (must cancel before the day before scheduled date)
 *     tags: [BookedServices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The booked service ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Booked service deleted successfully
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
 *                   example: "Service booking cancelled successfully"
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
 *                   example: "Authentication required"
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
 *                   example: "Cannot cancel booking. The cancellation deadline has passed. You can only cancel bookings before the next day after the scheduled date."
 *       404:
 *         description: Booked service not found
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
 *                   example: "Service booking not found or already deleted"
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
 *                   example: "Unable to cancel service booking. Please try again"
 */