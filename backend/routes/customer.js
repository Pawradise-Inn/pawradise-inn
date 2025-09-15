const express = require('express');
const router = express.Router();

const {
    getCustomerProfile
} = require('../controllers/customer')

router.get('/:id', getCustomerProfile)

module.exports = router;