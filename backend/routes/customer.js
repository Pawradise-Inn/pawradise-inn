const express = require('express');
const router = express.Router();

const {
    getCustomerProfile,
    updateCustomerProfile
} = require('../controllers/customer');
const { protect, authorize } = require('../middleware/auth');

router.route("/:id")
    .get(protect, authorize("CUSTOMER"), getCustomerProfile)
    .put(protect, authorize("CUSTOMER"), updateCustomerProfile);

module.exports = router;