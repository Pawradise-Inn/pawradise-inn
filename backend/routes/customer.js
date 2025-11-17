const express = require('express');
const router = express.Router();

const {
    getCustomerProfile,
    updateCustomerProfile
} = require('../controllers/customer');
const { protect, authorize } = require('../middleware/auth');

router.route("/:id")
    .get(protect, authorize("CUSTOMER"), getCustomerProfile)
    .put(protect, authorize("CUSTOMER"), updateCustomerProfile);

module.exports = router;

/** 
 * @swagger
 * tags:
 *   name: Customers
 *   description: Customer profile management API
 */

/** 
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Get customer profile by ID
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The customer ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Customer profile details loaded successfully
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
 *                   example: "Profile loaded"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     userId:
 *                       type: integer
 *                       example: 5
 *                     user:
 *                       type: object
 *                       properties:
 *                         firstname:
 *                           type: string
 *                           example: "John"
 *                         lastname:
 *                           type: string
 *                           example: "Doe"
 *                         email:
 *                           type: string
 *                           example: "john.doe@example.com"
 *                         phone_number:
 *                           type: string
 *                           example: "0812345678"
 *                         user_name:
 *                           type: string
 *                           example: "johndoe"
 *                     pets:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           name:
 *                             type: string
 *                             example: "Buddy"
 *                           sex:
 *                             type: string
 *                             enum: ["MALE", "FEMALE"]
 *                             example: "MALE"
 *                           age:
 *                             type: integer
 *                             example: 3
 *                           type:
 *                             type: string
 *                             enum: ["DOG", "CAT", "MOUSE", "RABBIT", "BIRD"]
 *                             example: "DOG"
 *                           status:
 *                             type: string
 *                             enum: ["IDLE", "RESERVED", "CHECKED_IN", "CHECKED_OUT", "QUEUE", "IN_PROGRESS", "COMPLETED"]
 *                             example: "IDLE"
 *                           breed:
 *                             type: string
 *                             example: "Golden Retriever"
 *                           disease:
 *                             type: array
 *                             items:
 *                               type: string
 *                             example: ["None"]
 *                           allergic:
 *                             type: array
 *                             items:
 *                               type: string
 *                             example: ["Pollen"]
 *                           picture:
 *                             type: string
 *                             example: "https://storage.googleapis.com/paw_image/buddy.jpg"
 *                           customerId:
 *                             type: integer
 *                             example: 1
 *                           stayed:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: integer
 *                                   example: 1
 *                                 checkIn:
 *                                   type: string
 *                                   format: date-time
 *                                   example: "2024-01-15T14:00:00Z"
 *                                 checkOut:
 *                                   type: string
 *                                   format: date-time
 *                                   example: "2024-01-20T10:00:00Z"
 *                                 status:
 *                                   type: string
 *                                   enum: ["PENDING", "RESERVED", "CHECKED_IN", "CHECKED_OUT", "CANCELLED"]
 *                                   example: "CHECKED_OUT"
 *                                 roomId:
 *                                   type: integer
 *                                   example: 5
 *                                 petId:
 *                                   type: integer
 *                                   example: 1
 *                                 bookingId:
 *                                   type: integer
 *                                   example: 10
 *                           scheduled:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: integer
 *                                   example: 2
 *                                 scheduled:
 *                                   type: string
 *                                   format: date-time
 *                                   example: "2024-01-16T09:00:00Z"
 *                                 status:
 *                                   type: string
 *                                   enum: ["PENDING", "RESERVED", "QUEUE", "IN_PROGRESS", "COMPLETED", "CANCELLED"]
 *                                   example: "COMPLETED"
 *                                 serviceId:
 *                                   type: integer
 *                                   example: 3
 *                                 petId:
 *                                   type: integer
 *                                   example: 1
 *                                 booking_id:
 *                                   type: integer
 *                                   example: 10
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
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
 *         description: Customer not found
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
 *                   example: "NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "Your profile could not be found"
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
 *                   example: "Unable to load your profile. Please refresh and try again"
 *   put:
 *     summary: Update customer profile
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The customer ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 maxLength: 30
 *                 description: Customer's first name
 *                 example: "John"
 *               lastname:
 *                 type: string
 *                 maxLength: 30
 *                 description: Customer's last name
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 maxLength: 50
 *                 format: email
 *                 description: Customer's email address (must be unique)
 *                 example: "john.doe@example.com"
 *               phone_number:
 *                 type: string
 *                 minLength: 10
 *                 maxLength: 10
 *                 description: Customer's phone number (must be unique, 10 digits)
 *                 example: "0812345678"
 *               user_name:
 *                 type: string
 *                 maxLength: 50
 *                 description: Customer's username (must be unique)
 *                 example: "johndoe"
 *     responses:
 *       200:
 *         description: Customer profile updated successfully
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
 *                   example: "PROFILE_UPDATED"
 *                 message:
 *                   type: string
 *                   example: "Your profile has been updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 5
 *                     firstname:
 *                       type: string
 *                       example: "John"
 *                     lastname:
 *                       type: string
 *                       example: "Doe"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     phone_number:
 *                       type: string
 *                       example: "0812345678"
 *                     user_name:
 *                       type: string
 *                       example: "johndoe"
 *                     password:
 *                       type: string
 *                       example: "$2b$10$..."
 *                     role:
 *                       type: string
 *                       enum: ["STAFF", "CUSTOMER"]
 *                       example: "CUSTOMER"
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
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
 *         description: Customer not found
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
 *                   example: "NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "Your profile could not be found"
 *       409:
 *         description: Conflict - Email, username, or phone number already exists
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
 *                   example: "ALREADY_EXISTS"
 *                 message:
 *                   type: string
 *                   example: "This email is already taken. Please choose a different one"
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
 *                   example: "SERVER_ERROR"
 *                 message:
 *                   type: string
 *                   example: "Unable to update your profile. Please try again"
 */