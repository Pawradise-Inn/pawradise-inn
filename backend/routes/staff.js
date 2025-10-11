const express = require('express');
const router = express.Router();

const {updateMyProfile, getStaffProfile} = require('../controllers/staff');
const {login, logout} = require('../controllers/auth');
const {protect, authorize} = require('../middleware/auth');

router.put('/:id', protect, authorize('STAFF'), updateMyProfile);
router.post('/login', login);
router.post('/logout', protect, logout);
router.route('/:id')
    .get(getStaffProfile);

module.exports = router;
