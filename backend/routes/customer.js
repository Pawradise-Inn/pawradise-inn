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
 * /customer/{id}:
 *   get:
 *     summary: Get customer profile by ID
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The customer ID
 *     responses:
 *       200:
 *         description: Customer profile details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Internal server error
 *   put:
 *     summary: Update customer profile
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The customer ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Customer profile updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Internal server error
 */