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

router.get('/dashboard/checkins', getTodayRooms);
router.get('/dashboard/checkouts', getTodayCheckOuts);

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
 *     tags: [BookedRooms]
 *     responses:
 *       200:
 *         description: List of today's check-ins
 *       500:
 *         description: Internal server error
 */

/** 
 * @swagger
 * /bookedRooms/dashboard/checkouts:
 *   get:
 *     summary: Get today's room check-outs
 *     tags: [BookedRooms]
 *     responses:
 *       200:
 *         description: List of today's check-outs
 *       500:
 *         description: Internal server error
 */

/** 
 * @swagger
 * /bookedRooms:
 *   get:
 *     summary: Get all booked rooms
 *     tags: [BookedRooms]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all booked rooms
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new room booking
 *     tags: [BookedRooms]
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
 *         description: Room booking created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/** 
 * @swagger
 * /bookedRooms/{id}:
 *   get:
 *     summary: Get booked room by ID
 *     tags: [BookedRooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The booked room ID
 *     responses:
 *       200:
 *         description: Booked room details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Booked room not found
 *       500:
 *         description: Internal server error
 *   patch:
 *     summary: Update booked room
 *     tags: [BookedRooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The booked room ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Booked room updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Booked room not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete booked room
 *     tags: [BookedRooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The booked room ID
 *     responses:
 *       200:
 *         description: Booked room deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Booked room not found
 *       500:
 *         description: Internal server error
 */