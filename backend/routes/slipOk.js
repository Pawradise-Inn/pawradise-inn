const express = require('express');
const router = express.Router();

const {
    checkSlip
} = require('../controllers/slipOk')

router.route('/check')
    .post(checkSlip)

module.exports = router;

/** 
 * @swagger
 * tags:
 *   name: SlipOK
 *   description: Payment slip verification API
 */

/** 
 * @swagger
 * /slipOk/check:
 *   post:
 *     summary: Verify payment slip
 *     tags: [SlipOK]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Slip verification result
 *       400:
 *         description: Invalid slip data
 *       500:
 *         description: Internal server error
 */