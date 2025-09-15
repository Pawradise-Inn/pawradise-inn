const express = require('express');
const router = express.Router();

<<<<<<< HEAD
// router.post('/services', protect, authorize('STAFF'), createService);
// router.post('/rooms', protect, authorize('STAFF'), createRoom);
router.put('/:id', protect, authorize('STAFF'), updateMyProfile);
// router.put('/pets/:id', protect, authorize('STAFF'), updatePetStatus);
=======
const {updateMyProfile, getStaffProfile} = require('../controllers/staff');
const {protect, authorize} = require('../middleware/auth');

router.put('/:id', protect, authorize('STAFF'), updateMyProfile);
router.route('/:id')
    .get(getStaffProfile);
>>>>>>> c252c4ca659b1c00cb83621363b86ed637cb6d2c

module.exports = router;
