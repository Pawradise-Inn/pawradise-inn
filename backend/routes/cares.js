const express = require('express');
const router = express.Router();

const {
    getCares,
    getCare,
    createCare,
    deleteCare,
} = require('../controllers/cares');

const {protect, authorize} = require('../middleware/auth');

router.route('/')
    .get(protect, authorize("STAFF", "CUSTOMER"), getCares)
    .post(protect, authorize("STAFF"), createCare);

router.route('/:id')
    .get(protect, authorize("STAFF", "CUSTOMER"),getCare)
    .delete(protect, authorize("STAFF"),deleteCare)

module.exports = router;
