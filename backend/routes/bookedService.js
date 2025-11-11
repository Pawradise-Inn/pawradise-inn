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
    .get(getBookedServices)
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
 *     tags: [BookedServices]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of today's booked services
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/** 
 * @swagger
 * /bookedServices:
 *   get:
 *     summary: Get all booked services
 *     tags: [BookedServices]
 *     responses:
 *       200:
 *         description: List of all booked services
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new service booking
 *     tags: [BookedServices]
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
 *         description: Service booking created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/** 
 * @swagger
 * /bookedServices/{id}:
 *   get:
 *     summary: Get booked service by ID
 *     tags: [BookedServices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The booked service ID
 *     responses:
 *       200:
 *         description: Booked service details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Booked service not found
 *       500:
 *         description: Internal server error
 *   patch:
 *     summary: Update booked service
 *     tags: [BookedServices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The booked service ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Booked service updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Booked service not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete booked service
 *     tags: [BookedServices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The booked service ID
 *     responses:
 *       200:
 *         description: Booked service deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Booked service not found
 *       500:
 *         description: Internal server error
 */