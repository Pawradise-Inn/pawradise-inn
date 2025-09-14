const express = require('express');
const router = express.Router();

const {updateMyProfile, getStaffProfile} = require('../controllers/staff');
const {protect, authorize} = require('../middleware/auth');

router.put('/:id', protect, authorize('STAFF'), updateMyProfile);
router.route('/:id')
    .get(getStaffProfile);

module.exports = router;
