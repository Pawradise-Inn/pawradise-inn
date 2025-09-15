const express = require('express');
const router = express.Router();

const {
    getBookedServices,
    getBookedService,
    createBookedService,
    updateBookedService,
    deleteBookedService,
    getTodayService
} = require('../controllers/bookedService');

router.route('/')
    .get(getBookedServices)
    .post(createBookedService);

router.route('/:id')
    .get(getBookedService)
    .patch(updateBookedService)
    .delete(deleteBookedService);

router.route('/dashboard')
    .get(getTodayService);

module.exports = router;