const express = require('express');
const {register, getMe, updateMe, deleteMe, login, logout} = require('../controllers/auth');
const {protect} = require('../middleware/auth');

const router = express.Router();

router.get('/me', protect, getMe);      // no :id, user id comes from token
router.put('/me', protect, updateMe);   // update logged-in user
router.delete('/me', protect, deleteMe);// delete logged-in user

// Auth routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', protect, logout);

module.exports = router;

/** 
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and user management API
 */

/** 
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user (Customer or Staff)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - lastname
 *               - email
 *               - phoneNumber
 *               - userName
 *               - password
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: John
 *               lastname:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               phoneNumber:
 *                 type: string
 *                 example: "0812345678"
 *               userName:
 *                 type: string
 *                 example: johndoe123
 *               password:
 *                 type: string
 *                 format: password
 *                 example: SecurePass123
 *               role:
 *                 type: string
 *                 enum: [CUSTOMER, STAFF]
 *                 default: CUSTOMER
 *               wage:
 *                 type: number
 *                 description: Required if role is STAFF
 *               bankCompany:
 *                 type: string
 *                 description: Required if role is STAFF
 *               bankAccount:
 *                 type: string
 *                 description: Required if role is STAFF
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Missing required fields
 *       409:
 *         description: Email or username already exists
 *       500:
 *         description: Internal server error
 */

/** 
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user with username and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *                 example: johndoe123
 *               password:
 *                 type: string
 *                 format: password
 *                 example: SecurePass123
 *     responses:
 *       200:
 *         description: Login successful, returns user data and sets auth cookie
 *       400:
 *         description: Missing username or password
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */

/** 
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout current user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful, auth cookie cleared
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/** 
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current logged-in user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *   put:
 *     summary: Update current user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone_number:
 *                 type: string
 *               user_name:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete current user account (requires password confirmation)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Current password for confirmation
 *     responses:
 *       200:
 *         description: Account deleted successfully
 *       400:
 *         description: Password not provided
 *       401:
 *         description: Incorrect password
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
