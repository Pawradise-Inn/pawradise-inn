const express = require('express');
const {register, getPet, updatePet, deletePet} = require('../controllers/pet');
const {protect, authorize} = require('../middleware/auth');

const router = express.Router();

router.post('/register', protect, authorize('CUSTOMER'),register);
router.get("/:id", getPet);
//router.get("/:id/pets", getCustomerPets);
router.put("/:id", updatePet);
router.delete("/:id", deletePet);

module.exports = router;
