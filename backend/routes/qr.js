const express = require('express');
const { genQR } = require('../controllers/qr');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/generateQr')
    .post(protect, authorize("CUSTOMER"), genQR);

module.exports = router;