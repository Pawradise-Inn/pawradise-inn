const express = require('express');
const router = express.Router();

const {
    checkSlip
} = require('../controllers/slipOk')

router.route('/check')
    .post(checkSlip)

module.exports = router;