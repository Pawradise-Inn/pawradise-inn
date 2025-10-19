const express = require("express");
const {
  register,
  getPet,
  updatePet,
  updatePetStatus,
  deletePet,
  getAllPets,
  getCustomerPets,
  getCustomerPetNamesWithAvailable,
  getPetTypes,
} = require("../controllers/pet");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(getAllPets);

router
  .route("/register")
  .post(protect, authorize("CUSTOMER", "STAFF"), register);

router
  .route("/available")
  .get(
    protect,
    authorize("CUSTOMER", "STAFF"),
    getCustomerPetNamesWithAvailable
  );

router.route("/pet-types").get(getPetTypes);

router
  .route("/:id")
  .get(protect, authorize("CUSTOMER", "STAFF"), getPet)
  .put(protect, authorize("CUSTOMER", "STAFF"), updatePet)
  .delete(protect, authorize("CUSTOMER", "STAFF"), deletePet)
  .patch(protect, authorize("CUSTOMER", "STAFF"), updatePetStatus);

router
  .route("/:id/available")
  .get(protect, authorize("CUSTOMER", "STAFF"), getCustomerPets);

module.exports = router;
