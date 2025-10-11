const express = require('express');
const {
  register,
  getPet,
  updatePet,
  updatePetStatus,
  deletePet,
  getAllPets,
  getCustomerPets,
  getCustomerPetNamesWithAvailable
} = require('../controllers/pet');
const {protect, authorize} = require('../middleware/auth');

const router = express.Router();

router.route("/").get(getAllPets)

router.route("/:id").get(getPet).put(updatePet).delete(deletePet).patch(updatePetStatus)

router.route("/register").post(register);

router.route("/available").get(getCustomerPetNamesWithAvailable)

router.route("/:id/available").get(getCustomerPets)

module.exports = router;
