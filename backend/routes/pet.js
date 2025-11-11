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
  getPetBookings,
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

router
  .route("/:id/bookings")
  .get(protect, authorize("CUSTOMER", "STAFF"), getPetBookings);

module.exports = router;

/** 
 * @swagger
 * tags:
 *   name: Pets
 *   description: Pet management API
 */

/** 
 * @swagger
 * /pet:
 *   get:
 *     summary: Get all pets
 *     tags: [Pets]
 *     responses:
 *       200:
 *         description: List of all pets
 *       500:
 *         description: Internal server error
 */

/** 
 * @swagger
 * /pet/register:
 *   post:
 *     summary: Register a new pet
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Pet registered successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/** 
 * @swagger
 * /pet/available:
 *   get:
 *     summary: Get customer's available pet names
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of available pet names
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/** 
 * @swagger
 * /pet/pet-types:
 *   get:
 *     summary: Get all pet types
 *     tags: [Pets]
 *     responses:
 *       200:
 *         description: List of pet types
 *       500:
 *         description: Internal server error
 */

/** 
 * @swagger
 * /pet/{id}:
 *   get:
 *     summary: Get pet by ID
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The pet ID
 *     responses:
 *       200:
 *         description: Pet details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Pet not found
 *       500:
 *         description: Internal server error
 *   put:
 *     summary: Update pet information
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The pet ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Pet updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Pet not found
 *       500:
 *         description: Internal server error
 *   patch:
 *     summary: Update pet status
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The pet ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Pet status updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Pet not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete pet
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The pet ID
 *     responses:
 *       200:
 *         description: Pet deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Pet not found
 *       500:
 *         description: Internal server error
 */

/** 
 * @swagger
 * /pet/{id}/available:
 *   get:
 *     summary: Get customer's pets by customer ID
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The customer ID
 *     responses:
 *       200:
 *         description: List of customer's pets
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/** 
 * @swagger
 * /pet/{id}/bookings:
 *   get:
 *     summary: Get all bookings for a pet
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The pet ID
 *     responses:
 *       200:
 *         description: List of pet's bookings
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Pet not found
 *       500:
 *         description: Internal server error
 */
