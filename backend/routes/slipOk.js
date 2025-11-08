const express = require('express');
const router = express.Router();

const {
    checkSlip
} = require('../controllers/slipOk')

router.route('/api/check-slip')
    .post(checkSlip)

module.exports = router;