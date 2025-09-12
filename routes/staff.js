const express = require('express');
const router = express.Router();

const {updateMyProfile} = require('../controllers/staff');
const {protect, authorize} = require('../middleware/auth');

router.put('/:id', protect, authorize('STAFF'), updateMyProfile);

module.exports = router;
