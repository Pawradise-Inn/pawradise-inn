const express = require('express');
const {createService, createRoom, updateMyProfile, updatePetStatus} = require('../controllers/staff');
const {protect, authorize} = require('../middleware/auth');

const router = express.Router();

// router.post('/services', protect, authorize('STAFF'), createService);
// router.post('/rooms', protect, authorize('STAFF'), createRoom);
router.put('/:id', protect, authorize('STAFF'), updateMyProfile);
// router.put('/pets/:id', protect, authorize('STAFF'), updatePetStatus);

module.exports = router;
