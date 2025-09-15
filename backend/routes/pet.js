const express = require('express');
const {
  register,
  getPet,
  updatePet,
  updatePetStatus,
  deletePet,
  getCustomerPets,
  getCustomerPetNamesWithAvailable
} = require('../controllers/pet');
const {protect, authorize} = require('../middleware/auth');

const router = express.Router();

router.post('/register', protect, authorize('CUSTOMER'),register);
router.get("/:id", getPet);
router.get("/", getCustomerPets);
router.put("/:id", updatePet);
router.delete("/:id", deletePet);

router.patch('/:id', updatePetStatus);
router.get('/:id/available', getCustomerPetNamesWithAvailable);

module.exports = router;
