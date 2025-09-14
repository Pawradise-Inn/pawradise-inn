const express = require('express');
const router = express.Router();

const {
    getBookedServices,
    getBookedService,
    createBookedService,
    updateBookedService,
    deleteBookedService
} = require('../controllers/bookedService');

router.route('/')
    .get(getBookedServices)
    .post(createBookedService);

router.route('/:id')
    .get(getBookedService)
    .patch(updateBookedService)
    .delete(deleteBookedService);

module.exports = router;