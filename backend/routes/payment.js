const express = require('express');
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");

const {
    getPayments,
    getPayment,
    createPayment,
    updatePayment,
    deletePayment,
    getMyPayments
} = require('../controllers/payments')

router.route('/mine')
    .get(protect, authorize("CUSTOMER"), getMyPayments)

router.route('/')
    .get(protect, authorize("STAFF"), getPayments)
    .post(protect, authorize("CUSTOMER"), createPayment)

router.route('/:id')
    .get(protect, authorize("STAFF", "CUSTOMER"), getPayment)
    .put(protect, authorize("STAFF", "CUSTOMER"), updatePayment)
    .delete(protect, authorize("STAFF", "CUSTOMER"), deletePayment)


    
module.exports = router;

/** 
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment management API
 */

/** 
 * @swagger
 * /payments/mine:
 *   get:
 *     summary: Get current user's payments
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of user's payments loaded successfully
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
 *                   example: "Payments loaded successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       paymentId:
 *                         type: integer
 *                         example: 1
 *                       paymentDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-15T10:30:00.000Z"
 *                       paymentStatus:
 *                         type: string
 *                         enum: [SUCCESS, FAILED, CANCELLED]
 *                         example: "SUCCESS"
 *                       totalPrice:
 *                         type: number
 *                         format: float
 *                         example: 5000.00
 *                       items:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             type:
 *                               type: string
 *                               enum: [Room, Service]
 *                               example: "Room"
 *                             name:
 *                               type: string
 *                               example: "Deluxe Room"
 *                             image:
 *                               type: string
 *                               example: "https://storage.googleapis.com/paw_image/room1.jpg"
 *                             petName:
 *                               type: string
 *                               example: "Buddy"
 *                             price:
 *                               type: number
 *                               format: float
 *                               example: 2000.00
 *                 count:
 *                   type: integer
 *                   example: 25
 *       401:
 *         description: Unauthorized - Invalid or missing token
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
 *         description: No payments found
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
 *                   example: "No payments are available at the moment"
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
 *                   example: "Unable to load payments. Please refresh and try again"
 */

/** 
 * @swagger
 * /payments:
 *   get:
 *     summary: Get all payments (Staff only)
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: JSON string for filtering (e.g., {"status":"SUCCESS"})
 *         example: '{"status":"SUCCESS"}'
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Comma-separated sort fields with optional direction (field:asc or field:desc)
 *         example: "date:desc,amount:asc"
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of all payments loaded successfully
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
 *                   example: "Payments loaded successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       paymentId:
 *                         type: integer
 *                         example: 1
 *                       slip:
 *                         type: string
 *                         example: "https://storage.googleapis.com/paw_image/slip123.jpg"
 *                       username:
 *                         type: string
 *                         example: "john_doe"
 *                       bookingDetail:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             type:
 *                               type: string
 *                               enum: [Room, Service]
 *                               example: "Room"
 *                             name:
 *                               type: string
 *                               example: "Deluxe Room"
 *                             image:
 *                               type: string
 *                               example: "https://storage.googleapis.com/paw_image/room1.jpg"
 *                             petName:
 *                               type: string
 *                               example: "Buddy"
 *                             price:
 *                               type: number
 *                               format: float
 *                               example: 2000.00
 *                       totalPrice:
 *                         type: number
 *                         format: float
 *                         example: 5000.00
 *                       status:
 *                         type: string
 *                         enum: [SUCCESS, FAILED, CANCELLED]
 *                         example: "SUCCESS"
 *                       paymentDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-15T10:30:00.000Z"
 *                 count:
 *                   type: integer
 *                   example: 50
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     next:
 *                       type: object
 *                       properties:
 *                         page:
 *                           type: integer
 *                           example: 2
 *                         limit:
 *                           type: integer
 *                           example: 10
 *                     prev:
 *                       type: object
 *                       properties:
 *                         page:
 *                           type: integer
 *                           example: 1
 *                         limit:
 *                           type: integer
 *                           example: 10
 *       401:
 *         description: Unauthorized - Invalid or missing token
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
 *         description: No payments found
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
 *                   example: "No payments are available at the moment"
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
 *                   example: "Unable to load payments. Please refresh and try again"
 *   post:
 *     summary: Create a new payment and booking
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - status
 *               - slip
 *             properties:
 *               amount:
 *                 type: number
 *                 format: float
 *                 description: Total payment amount
 *                 example: 5000.00
 *               status:
 *                 type: string
 *                 enum: [SUCCESS, FAILED, CANCELLED]
 *                 description: Payment status
 *                 example: "SUCCESS"
 *               slip:
 *                 type: string
 *                 description: Payment slip image URL
 *                 example: "https://storage.googleapis.com/paw_image/slip123.jpg"
 *     responses:
 *       201:
 *         description: Payment and booking created successfully
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
 *                     paymentId:
 *                       type: integer
 *                       example: 1
 *                     payment:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         amount:
 *                           type: number
 *                           format: float
 *                           example: 5000.00
 *                         date:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-01-15T10:30:00.000Z"
 *                         status:
 *                           type: string
 *                           enum: [SUCCESS, FAILED, CANCELLED]
 *                           example: "SUCCESS"
 *                         slip:
 *                           type: string
 *                           example: "https://storage.googleapis.com/paw_image/slip123.jpg"
 *                         customerId:
 *                           type: integer
 *                           example: 1
 *                     booking:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         customerId:
 *                           type: integer
 *                           example: 1
 *                         date:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-01-15T10:30:00.000Z"
 *                         status:
 *                           type: string
 *                           enum: [PENDING, BOOKED, CANCELLED]
 *                           example: "BOOKED"
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
 *         description: Unauthorized - Invalid or missing token
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
 *         description: Transaction failed
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
 *                   example: "TRANSACTION_FAILED"
 *                 message:
 *                   type: string
 *                   example: "Unable to create payment or booking."
 */

/** 
 * @swagger
 * /payments/{id}:
 *   get:
 *     summary: Get payment by ID
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The payment ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Payment details loaded successfully
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
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     amount:
 *                       type: number
 *                       format: float
 *                       example: 5000.00
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-15T10:30:00.000Z"
 *                     status:
 *                       type: string
 *                       enum: [SUCCESS, FAILED, CANCELLED]
 *                       example: "SUCCESS"
 *                     slip:
 *                       type: string
 *                       example: "https://storage.googleapis.com/paw_image/slip123.jpg"
 *                     customerId:
 *                       type: integer
 *                       example: 1
 *       401:
 *         description: Unauthorized - Invalid or missing token
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
 *         description: Payment not found
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
 *                   example: "PAYMENT_NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "Payment not found"
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
 *                   example: "Unable to load payment details. Please refresh and try again"
 *   put:
 *     summary: Update payment status and slip
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The payment ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               slip:
 *                 type: string
 *                 description: Payment slip image URL (Customer can update)
 *                 example: "https://storage.googleapis.com/paw_image/slip456.jpg"
 *               status:
 *                 type: string
 *                 enum: [SUCCESS, FAILED, CANCELLED]
 *                 description: Payment status (Both Customer and Staff can update)
 *                 example: "SUCCESS"
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Payment date (optional, defaults to current time)
 *                 example: "2024-01-15T10:30:00.000Z"
 *     responses:
 *       200:
 *         description: Payment updated successfully
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
 *                   example: "Payment updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     amount:
 *                       type: number
 *                       format: float
 *                       example: 5000.00
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-15T10:30:00.000Z"
 *                     status:
 *                       type: string
 *                       enum: [SUCCESS, FAILED, CANCELLED]
 *                       example: "SUCCESS"
 *                     slip:
 *                       type: string
 *                       example: "https://storage.googleapis.com/paw_image/slip456.jpg"
 *                     customerId:
 *                       type: integer
 *                       example: 1
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
 *         description: Unauthorized - Invalid or missing token
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
 *         description: Payment not found
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
 *                   example: "PAYMENT_NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "Payment not found"
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
 *                   example: "Unable to update payment. Please try again"
 *   delete:
 *     summary: Delete payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The payment ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Payment deleted successfully
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
 *                   example: "Payment deleted successfully"
 *                 data:
 *                   type: object
 *                   example: {}
 *       401:
 *         description: Unauthorized - Invalid or missing token
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
 *         description: Payment not found
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
 *                   example: "PAYMENT_NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "Payment not found"
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
 *                   example: "Unable to update payment. Please try again"
 */ 