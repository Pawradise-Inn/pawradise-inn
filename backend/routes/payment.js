const express = require('express');
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");

const {
    getPayments,
    getPayment,
    createPayment,
    updatePayment,
    deletePayment
} = require('../controllers/payments')

router.route('/')
    .get(protect, authorize("STAFF"), getPayments)
    .post(protect, authorize("CUSTOMER"), createPayment)

router.route('/:id')
    .get(protect, authorize("STAFF", "CUSTOMER"), getPayment)
    .put(protect, authorize("STAFF", "CUSTOMER"), updatePayment)
    .delete(protect, authorize("STAFF", "CUSTOMER"), deletePayment)
    
module.exports = router; 