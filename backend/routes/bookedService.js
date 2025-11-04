const express = require('express');
const router = express.Router();

const {
    getBookedServices,
    getBookedService,
    createBookedService,
    updateBookedService,
    deleteBookedService,
    getTodayServices
} = require('../controllers/bookedService');
const { authorize, protect } = require('../middleware/auth');

router.route('/dashboard')
    .get(protect, authorize("STAFF"), getTodayServices);

router.route('/')
    .get(getBookedServices)
    .post(protect, authorize("CUSTOMER", "STAFF"), createBookedService);

router.route('/:id')
    .get(protect, authorize("CUSTOMER", "STAFF"), getBookedService)
    .patch(protect, authorize("CUSTOMER", "STAFF"), updateBookedService)
    .delete(protect, authorize("CUSTOMER", "STAFF"), deleteBookedService);

module.exports = router;