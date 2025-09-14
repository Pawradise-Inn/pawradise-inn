const express = require('express');
const {
  register,
  getPet,
  updatePet,
  updatePetStatus,
  deletePet,
  getCustomerPetNames,
  getCustomerPetNamesWithAvailable
} = require('../controllers/pet');
const {protect, authorize} = require('../middleware/auth');

const router = express.Router();

router.post('/register', protect, authorize('CUSTOMER'),register);

router.route('/')
    .get(getCustomerPetNames);
  
router.route('/:id')
    .get(getPet)
    .put(updatePet)
    .delete(deletePet)
    .patch(updatePetStatus);

router.get('/:id/available', getCustomerPetNamesWithAvailable);

module.exports = router;
