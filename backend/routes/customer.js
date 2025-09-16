const express = require('express');
const router = express.Router();

const {
    getCustomerProfile,
    updateCustomerProfile
} = require('../controllers/customer')

router.route("/:id")
    .get(getCustomerProfile)
    .put(updateCustomerProfile);

module.exports = router;