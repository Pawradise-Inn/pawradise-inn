const express = require('express');
const { uploadImage } = require('../controllers/picture');
const router = express.Router();

router.post('/upload', uploadImage);

module.exports = router;

/** 
 * @swagger
 * tags:
 *   name: Pictures
 *   description: Image upload API
 */

/** 
 * @swagger
 * /pictures/upload:
 *   post:
 *     summary: Upload an image
 *     tags: [Pictures]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *       400:
 *         description: Invalid file
 *       500:
 *         description: Internal server error
 */