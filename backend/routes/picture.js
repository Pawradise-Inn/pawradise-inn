const express = require('express');
const { uploadImage } = require('../controllers/picture');
const router = express.Router();

router.post('/upload', uploadImage);

module.exports = router;