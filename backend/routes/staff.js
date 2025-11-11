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
 * /staff/login:
 *   post:
 *     summary: Staff login
 *     tags: [Staff]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */

/** 
 * @swagger
 * /staff/logout:
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
 * /staff/{id}:
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
