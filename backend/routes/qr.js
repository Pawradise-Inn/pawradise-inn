const express = require('express');
const { genQR } = require('../controllers/qr');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/generateQr')
    .post(protect, authorize("CUSTOMER"), genQR);

module.exports = router;

/** 
 * @swagger
 * tags:
 *   name: QR
 *   description: QR code generation API
 */

/** 
 * @swagger
 * /qr/generateQr:
 *   post:
 *     summary: Generate a QR code
 *     tags: [QR]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: QR code generated successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */