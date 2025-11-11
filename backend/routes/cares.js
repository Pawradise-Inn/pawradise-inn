const express = require('express');
const router = express.Router();

const {
    getCares,
    getCare,
    createCare,
    deleteCare,
} = require('../controllers/cares');

const {protect, authorize} = require('../middleware/auth');

router.route('/')
    .get(protect, authorize("STAFF", "CUSTOMER"), getCares)
    .post(protect, authorize("STAFF"), createCare);

router.route('/:id')
    .get(protect, authorize("STAFF", "CUSTOMER"),getCare)
    .delete(protect, authorize("STAFF"),deleteCare)

module.exports = router;

/** 
 * @swagger
 * tags:
 *   name: Cares
 *   description: Pet care records management API - tracks pet status changes during room/service bookings
 */

/** 
 * @swagger
 * /cares:
 *   get:
 *     summary: Get all care records with pagination and filtering
 *     tags: [Cares]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 3
 *         description: Items per page
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: JSON filter object
 *       - in: query
 *         name: select
 *         schema:
 *           type: string
 *         description: Comma-separated fields to select
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort fields (e.g., "id:desc,date:asc")
 *     responses:
 *       200:
 *         description: Care records loaded with pagination
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new care record for a pet (Staff only)
 *     tags: [Cares]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - petId
 *               - status
 *             properties:
 *               petId:
 *                 type: integer
 *                 example: 5
 *               bookedServiceId:
 *                 type: integer
 *                 example: 10
 *                 description: Required if tracking service care
 *               bookedRoomId:
 *                 type: integer
 *                 example: 8
 *                 description: Required if tracking room care
 *               status:
 *                 type: string
 *                 enum: [CHECKED_IN, CHECKED_OUT, IN_SERVICE, SERVICE_COMPLETED]
 *                 example: CHECKED_IN
 *     responses:
 *       201:
 *         description: Care record created successfully
 *       400:
 *         description: Invalid status or type
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/** 
 * @swagger
 * /cares/{id}:
 *   get:
 *     summary: Get care record by ID
 *     tags: [Cares]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The care record ID
 *     responses:
 *       200:
 *         description: Care record details loaded
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Care record not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete care record (Staff only)
 *     tags: [Cares]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The care record ID
 *     responses:
 *       200:
 *         description: Care record deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Care record not found
 *       500:
 *         description: Internal server error
 */
