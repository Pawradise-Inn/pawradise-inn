const express = require('express');
const router = express.Router();

const {updateMyProfile, getStaffProfile} = require('../controllers/staff');
const {login, logout} = require('../controllers/auth');
const {protect, authorize} = require('../middleware/auth');

router.put('/:id', protect, authorize('STAFF'), updateMyProfile);
router.post('/login', login);
router.post('/logout', protect, logout);
router.route('/:id')
    .get(getStaffProfile);

module.exports = router;

/** 
 * @swagger
 * tags:
 *   name: Staff
 *   description: Staff management API
 */

/** 
 * @swagger
 * /staffs/login:
 *   post:
 *     summary: Staff login (alternative endpoint - use /auth/login instead)
 *     tags: [Staff]
 *     deprecated: true
 *     description: This endpoint uses the same login controller as /auth/login. Please use /auth/login for consistency.
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
 *                 example: staffuser123
 *               password:
 *                 type: string
 *                 format: password
 *                 example: SecurePass123
 *     responses:
 *       200:
 *         description: Login successful, returns user data and JWT token
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
 *                   example: LOGIN_SUCCESSFUL
 *                 message:
 *                   type: string
 *                   nullable: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         firstname:
 *                           type: string
 *                         lastname:
 *                           type: string
 *                         email:
 *                           type: string
 *                         phone_number:
 *                           type: string
 *                         user_name:
 *                           type: string
 *                         role:
 *                           type: string
 *                           enum: [CUSTOMER, STAFF]
 *                     token:
 *                       type: string
 *                       description: JWT token to use for authentication. Copy this token and click "Authorize" button to use it.
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Missing username or password
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */

/** 
 * @swagger
 * /staffs/logout:
 *   post:
 *     summary: Staff logout
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/** 
 * @swagger
 * /staffs/{id}:
 *   get:
 *     summary: Get staff profile by ID
 *     tags: [Staff]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The staff ID
 *     responses:
 *       200:
 *         description: Staff profile details
 *       404:
 *         description: Staff not found
 *       500:
 *         description: Internal server error
 *   put:
 *     summary: Update staff profile
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The staff ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Staff profile updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Staff not found
 *       500:
 *         description: Internal server error
 */
