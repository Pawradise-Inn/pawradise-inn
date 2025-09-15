const express = require('express');
const router = express.Router();

const {
    getCustomerProfile
} = require('../controllers/customer')

router.route('/:id')
    .get(getCustomerProfile);

module.exports = router;