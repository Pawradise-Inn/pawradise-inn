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
 * /pets:
 *   get:
 *     summary: Get all pets
 *     tags: [Pets]
 *     responses:
 *       200:
 *         description: List of all pets loaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 type:
 *                   type: string
 *                   example: "LOADED_SUCCESSFULLY"
 *                 message:
 *                   type: string
 *                   example: "All pets loaded"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Buddy"
 *                       sex:
 *                         type: string
 *                         enum: ["MALE", "FEMALE"]
 *                         example: "MALE"
 *                       age:
 *                         type: integer
 *                         example: 3
 *                       type:
 *                         type: string
 *                         enum: ["DOG", "CAT", "MOUSE", "RABBIT", "BIRD"]
 *                         example: "DOG"
 *                       status:
 *                         type: string
 *                         enum: ["IDLE", "RESERVED", "CHECKED_IN", "CHECKED_OUT", "QUEUE", "IN_PROGRESS", "COMPLETED"]
 *                         example: "IDLE"
 *                       breed:
 *                         type: string
 *                         example: "Golden Retriever"
 *                       disease:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["Arthritis"]
 *                       allergic:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["Pollen"]
 *                       picture:
 *                         type: string
 *                         example: "https://storage.googleapis.com/paw_image/buddy.jpg"
 *                       customerId:
 *                         type: integer
 *                         example: 1
 *                       scheduled:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 1
 *                             scheduled:
 *                               type: string
 *                               format: date-time
 *                               example: "2024-01-15T10:00:00Z"
 *                             status:
 *                               type: string
 *                               enum: ["PENDING", "RESERVED", "QUEUE", "IN_PROGRESS", "COMPLETED", "CANCELLED"]
 *                               example: "RESERVED"
 *                             serviceId:
 *                               type: integer
 *                               example: 1
 *                             petId:
 *                               type: integer
 *                               example: 1
 *                             booking_id:
 *                               type: integer
 *                               example: 1
 *                             service:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: integer
 *                                   example: 1
 *                                 name:
 *                                   type: string
 *                                   example: "Grooming"
 *                                 price:
 *                                   type: number
 *                                   format: float
 *                                   example: 500.00
 *                                 petType:
 *                                   type: array
 *                                   items:
 *                                     type: string
 *                                     enum: ["DOG", "CAT", "MOUSE", "RABBIT", "BIRD"]
 *                                   example: ["DOG", "CAT"]
 *                                 picture:
 *                                   type: string
 *                                   example: "https://storage.googleapis.com/paw_image/grooming.jpg"
 *                       stayed:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 1
 *                             checkIn:
 *                               type: string
 *                               format: date-time
 *                               example: "2024-01-15T14:00:00Z"
 *                             checkOut:
 *                               type: string
 *                               format: date-time
 *                               example: "2024-01-17T12:00:00Z"
 *                             status:
 *                               type: string
 *                               enum: ["PENDING", "RESERVED", "CHECKED_IN", "CHECKED_OUT", "CANCELLED"]
 *                               example: "RESERVED"
 *                             roomId:
 *                               type: integer
 *                               example: 1
 *                             petId:
 *                               type: integer
 *                               example: 1
 *                             bookingId:
 *                               type: integer
 *                               example: 1
 *                             room:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: integer
 *                                   example: 1
 *                                 name:
 *                                   type: string
 *                                   example: "Deluxe Suite"
 *                                 number:
 *                                   type: integer
 *                                   example: 101
 *                                 capacity:
 *                                   type: integer
 *                                   example: 2
 *                                 price:
 *                                   type: number
 *                                   format: float
 *                                   example: 2000.00
 *                                 picture:
 *                                   type: string
 *                                   example: "https://storage.googleapis.com/paw_image/room101.jpg"
 *                                 petType:
 *                                   type: string
 *                                   enum: ["DOG", "CAT", "MOUSE", "RABBIT", "BIRD"]
 *                                   example: "DOG"
 *       404:
 *         description: No pets found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "No pets found in our system"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNABLE_TO_LOAD"
 *                 message:
 *                   type: string
 *                   example: "Unable to load pets. Please refresh and try again"
 */

/** 
 * @swagger
 * /pets/register:
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
 *             required:
 *               - name
 *               - sex
 *               - age
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 30
 *                 example: "Buddy"
 *                 description: Pet name
 *               sex:
 *                 type: string
 *                 enum: ["MALE", "FEMALE"]
 *                 example: "MALE"
 *                 description: Pet sex
 *               age:
 *                 type: integer
 *                 example: 3
 *                 description: Pet age in years
 *               type:
 *                 type: string
 *                 enum: ["DOG", "CAT", "MOUSE", "RABBIT", "BIRD"]
 *                 example: "DOG"
 *                 description: Pet type (defaults to DOG if not provided)
 *               breed:
 *                 type: string
 *                 maxLength: 30
 *                 example: "Golden Retriever"
 *                 description: Pet breed
 *               disease:
 *                 type: array
 *                 items:
 *                   type: string
 *                   maxLength: 30
 *                 example: ["Arthritis"]
 *                 description: List of pet diseases
 *               allergic:
 *                 type: array
 *                 items:
 *                   type: string
 *                   maxLength: 30
 *                 example: ["Pollen", "Dust"]
 *                 description: List of pet allergies
 *               picture:
 *                 type: string
 *                 example: "https://storage.googleapis.com/paw_image/buddy.jpg"
 *                 description: Pet picture URL (defaults to unnamed.jpg if not provided)
 *     responses:
 *       201:
 *         description: Pet registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 type:
 *                   type: string
 *                   example: "PET_REGISTERED"
 *                 message:
 *                   type: string
 *                   example: "Your pet has been registered successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Buddy"
 *                     sex:
 *                       type: string
 *                       enum: ["MALE", "FEMALE"]
 *                       example: "MALE"
 *                     age:
 *                       type: integer
 *                       example: 3
 *                     type:
 *                       type: string
 *                       enum: ["DOG", "CAT", "MOUSE", "RABBIT", "BIRD"]
 *                       example: "DOG"
 *                     status:
 *                       type: string
 *                       enum: ["IDLE", "RESERVED", "CHECKED_IN", "CHECKED_OUT", "QUEUE", "IN_PROGRESS", "COMPLETED"]
 *                       example: "IDLE"
 *                     breed:
 *                       type: string
 *                       example: "Golden Retriever"
 *                     disease:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Arthritis"]
 *                     allergic:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Pollen"]
 *                     picture:
 *                       type: string
 *                       example: "https://storage.googleapis.com/paw_image/buddy.jpg"
 *                     customerId:
 *                       type: integer
 *                       example: 1
 *       400:
 *         description: Bad request - Customer profile not found or invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "Customer profile not found"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNAUTHORIZED"
 *                 message:
 *                   type: string
 *                   example: "Not authorized to access this route"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "SERVER_ERROR"
 *                 message:
 *                   type: string
 *                   example: "Unable to register your pet. Please try again"
 */

/** 
 * @swagger
 * /pets/available:
 *   get:
 *     summary: Get customer's available pet names
 *     description: Returns pets that are not currently booked (not in a room during the booking date)
 *     tags: [Pets]
 *     parameters:
 *       - in: query
 *         name: customerId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The customer ID
 *         example: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of available pet names loaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 type:
 *                   type: string
 *                   example: "LOADED_SUCCESSFULLY"
 *                 message:
 *                   type: string
 *                   example: "Available pets loaded"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Buddy"
 *                       type:
 *                         type: string
 *                         enum: ["DOG", "CAT", "MOUSE", "RABBIT", "BIRD"]
 *                         example: "DOG"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNAUTHORIZED"
 *                 message:
 *                   type: string
 *                   example: "Not authorized to access this route"
 *       404:
 *         description: No available pets found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "NO_DATA_FOUND"
 *                 message:
 *                   type: string
 *                   example: "No available pets found for booking"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNABLE_TO_LOAD"
 *                 message:
 *                   type: string
 *                   example: "Unable to check pet availability. Please refresh and try again"
 */

/** 
 * @swagger
 * /pets/pet-types:
 *   get:
 *     summary: Get all pet types
 *     description: Returns all available pet types in the system
 *     tags: [Pets]
 *     responses:
 *       200:
 *         description: List of pet types loaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 type:
 *                   type: string
 *                   example: "LOADED_SUCCESSFULLY"
 *                 message:
 *                   type: string
 *                   example: "Pet types loaded successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                     enum: ["DOG", "CAT", "MOUSE", "RABBIT", "BIRD"]
 *                   example: ["DOG", "CAT", "MOUSE", "RABBIT", "BIRD"]
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNABLE_TO_LOAD"
 *                 message:
 *                   type: string
 *                   example: "Could not load pet types. Please try again"
 */

/** 
 * @swagger
 * /pets/{id}:
 *   get:
 *     summary: Get pet by ID
 *     description: Returns complete pet details including scheduled services and stayed rooms
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The pet ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Pet details loaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 type:
 *                   type: string
 *                   example: "LOADED_SUCCESSFULLY"
 *                 message:
 *                   type: string
 *                   example: "Pet details loaded"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Buddy"
 *                     sex:
 *                       type: string
 *                       enum: ["MALE", "FEMALE"]
 *                       example: "MALE"
 *                     age:
 *                       type: integer
 *                       example: 3
 *                     type:
 *                       type: string
 *                       enum: ["DOG", "CAT", "MOUSE", "RABBIT", "BIRD"]
 *                       example: "DOG"
 *                     status:
 *                       type: string
 *                       enum: ["IDLE", "RESERVED", "CHECKED_IN", "CHECKED_OUT", "QUEUE", "IN_PROGRESS", "COMPLETED"]
 *                       example: "IDLE"
 *                     breed:
 *                       type: string
 *                       example: "Golden Retriever"
 *                     disease:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Arthritis"]
 *                     allergic:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Pollen"]
 *                     picture:
 *                       type: string
 *                       example: "https://storage.googleapis.com/paw_image/buddy.jpg"
 *                     customerId:
 *                       type: integer
 *                       example: 1
 *                     scheduled:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           scheduled:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-01-15T10:00:00Z"
 *                           status:
 *                             type: string
 *                             enum: ["PENDING", "RESERVED", "QUEUE", "IN_PROGRESS", "COMPLETED", "CANCELLED"]
 *                             example: "RESERVED"
 *                           serviceId:
 *                             type: integer
 *                             example: 1
 *                           petId:
 *                             type: integer
 *                             example: 1
 *                           booking_id:
 *                             type: integer
 *                             example: 1
 *                           service:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 example: 1
 *                               name:
 *                                 type: string
 *                                 example: "Grooming"
 *                               price:
 *                                 type: number
 *                                 format: float
 *                                 example: 500.00
 *                               petType:
 *                                 type: array
 *                                 items:
 *                                   type: string
 *                                   enum: ["DOG", "CAT", "MOUSE", "RABBIT", "BIRD"]
 *                                 example: ["DOG", "CAT"]
 *                               picture:
 *                                 type: string
 *                                 example: "https://storage.googleapis.com/paw_image/grooming.jpg"
 *                     stayed:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           checkIn:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-01-15T14:00:00Z"
 *                           checkOut:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-01-17T12:00:00Z"
 *                           status:
 *                             type: string
 *                             enum: ["PENDING", "RESERVED", "CHECKED_IN", "CHECKED_OUT", "CANCELLED"]
 *                             example: "RESERVED"
 *                           roomId:
 *                             type: integer
 *                             example: 1
 *                           petId:
 *                             type: integer
 *                             example: 1
 *                           bookingId:
 *                             type: integer
 *                             example: 1
 *                           room:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 example: 1
 *                               name:
 *                                 type: string
 *                                 example: "Deluxe Suite"
 *                               number:
 *                                 type: integer
 *                                 example: 101
 *                               capacity:
 *                                 type: integer
 *                                 example: 2
 *                               price:
 *                                 type: number
 *                                 format: float
 *                                 example: 2000.00
 *                               picture:
 *                                 type: string
 *                                 example: "https://storage.googleapis.com/paw_image/room101.jpg"
 *                               petType:
 *                                 type: string
 *                                 enum: ["DOG", "CAT", "MOUSE", "RABBIT", "BIRD"]
 *                                 example: "DOG"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNAUTHORIZED"
 *                 message:
 *                   type: string
 *                   example: "Not authorized to access this route"
 *       404:
 *         description: Pet not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "Pet not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNABLE_TO_LOAD"
 *                 message:
 *                   type: string
 *                   example: "Unable to load pet details. Please refresh and try again"
 *   put:
 *     summary: Update pet information
 *     description: Update any pet fields (name, sex, age, type, breed, disease, allergic, picture)
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The pet ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 30
 *                 example: "Buddy"
 *               sex:
 *                 type: string
 *                 enum: ["MALE", "FEMALE"]
 *                 example: "MALE"
 *               age:
 *                 type: integer
 *                 example: 4
 *               type:
 *                 type: string
 *                 enum: ["DOG", "CAT", "MOUSE", "RABBIT", "BIRD"]
 *                 example: "DOG"
 *               breed:
 *                 type: string
 *                 maxLength: 30
 *                 example: "Golden Retriever"
 *               disease:
 *                 type: array
 *                 items:
 *                   type: string
 *                   maxLength: 30
 *                 example: ["Arthritis", "Hip Dysplasia"]
 *               allergic:
 *                 type: array
 *                 items:
 *                   type: string
 *                   maxLength: 30
 *                 example: ["Pollen", "Dust"]
 *               picture:
 *                 type: string
 *                 example: "https://storage.googleapis.com/paw_image/buddy_updated.jpg"
 *     responses:
 *       200:
 *         description: Pet updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 type:
 *                   type: string
 *                   example: "UPDATED_SUCCESSFULLY"
 *                 message:
 *                   type: string
 *                   example: "Pet information updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Buddy"
 *                     sex:
 *                       type: string
 *                       enum: ["MALE", "FEMALE"]
 *                       example: "MALE"
 *                     age:
 *                       type: integer
 *                       example: 4
 *                     type:
 *                       type: string
 *                       enum: ["DOG", "CAT", "MOUSE", "RABBIT", "BIRD"]
 *                       example: "DOG"
 *                     status:
 *                       type: string
 *                       enum: ["IDLE", "RESERVED", "CHECKED_IN", "CHECKED_OUT", "QUEUE", "IN_PROGRESS", "COMPLETED"]
 *                       example: "IDLE"
 *                     breed:
 *                       type: string
 *                       example: "Golden Retriever"
 *                     disease:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Arthritis", "Hip Dysplasia"]
 *                     allergic:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Pollen", "Dust"]
 *                     picture:
 *                       type: string
 *                       example: "https://storage.googleapis.com/paw_image/buddy_updated.jpg"
 *                     customerId:
 *                       type: integer
 *                       example: 1
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNAUTHORIZED"
 *                 message:
 *                   type: string
 *                   example: "Not authorized to access this route"
 *       404:
 *         description: Pet not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "PET_NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "Pet not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNABLE_TO_UPDATE"
 *                 message:
 *                   type: string
 *                   example: "Unable to update pet information. Please try again"
 *   patch:
 *     summary: Update pet status
 *     description: Update pet status and create a care log entry
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The pet ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *               - type
 *               - bookedId
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ["IDLE", "RESERVED", "CHECKED_IN", "CHECKED_OUT", "QUEUE", "IN_PROGRESS", "COMPLETED"]
 *                 example: "CHECKED_IN"
 *                 description: New pet status
 *               type:
 *                 type: string
 *                 enum: ["room", "service"]
 *                 example: "room"
 *                 description: Type of booking (room or service)
 *               bookedId:
 *                 type: integer
 *                 example: 1
 *                 description: ID of the booked room or booked service
 *     responses:
 *       200:
 *         description: Pet status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 type:
 *                   type: string
 *                   example: "PET_STATUS_UPDATED"
 *                 message:
 *                   type: string
 *                   example: "Pet status updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Buddy"
 *                     sex:
 *                       type: string
 *                       enum: ["MALE", "FEMALE"]
 *                       example: "MALE"
 *                     age:
 *                       type: integer
 *                       example: 3
 *                     type:
 *                       type: string
 *                       enum: ["DOG", "CAT", "MOUSE", "RABBIT", "BIRD"]
 *                       example: "DOG"
 *                     status:
 *                       type: string
 *                       enum: ["IDLE", "RESERVED", "CHECKED_IN", "CHECKED_OUT", "QUEUE", "IN_PROGRESS", "COMPLETED"]
 *                       example: "CHECKED_IN"
 *                     breed:
 *                       type: string
 *                       example: "Golden Retriever"
 *                     disease:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Arthritis"]
 *                     allergic:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Pollen"]
 *                     picture:
 *                       type: string
 *                       example: "https://storage.googleapis.com/paw_image/buddy.jpg"
 *                     customerId:
 *                       type: integer
 *                       example: 1
 *       400:
 *         description: Bad request - Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "MISSING_FIELDS"
 *                 message:
 *                   type: string
 *                   example: "Please provide a status for the pet"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNAUTHORIZED"
 *                 message:
 *                   type: string
 *                   example: "Not authorized to access this route"
 *       404:
 *         description: Pet not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "PET_NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "Pet not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNABLE_TO_UPDATE"
 *                 message:
 *                   type: string
 *                   example: "Unable to update pet status. Please try again"
 *   delete:
 *     summary: Delete pet
 *     description: Permanently delete a pet from the system
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The pet ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Pet deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 type:
 *                   type: string
 *                   example: "DELETED_SUCCESSFULLY"
 *                 message:
 *                   type: string
 *                   example: "Pet deleted successfully"
 *                 data:
 *                   type: object
 *                   example: {}
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNAUTHORIZED"
 *                 message:
 *                   type: string
 *                   example: "Not authorized to access this route"
 *       404:
 *         description: Pet not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "PET_NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "Pet not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNABLE_TO_DELETE"
 *                 message:
 *                   type: string
 *                   example: "Unable to delete pet. Please try again"
 */

/** 
 * @swagger
 * /pets/{id}/available:
 *   get:
 *     summary: Get customer's pets by customer ID
 *     description: Returns pets belonging to a specific customer with optional field selection
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The customer ID
 *         example: 1
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         required: false
 *         description: Comma-separated list of fields to return (e.g., "id,name,breed")
 *         example: "id,name,breed,type"
 *     responses:
 *       200:
 *         description: List of customer's pets loaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 type:
 *                   type: string
 *                   example: "LOADED_SUCCESSFULLY"
 *                 message:
 *                   type: string
 *                   example: "Customer pets loaded"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Buddy"
 *                       sex:
 *                         type: string
 *                         enum: ["MALE", "FEMALE"]
 *                         example: "MALE"
 *                       age:
 *                         type: integer
 *                         example: 3
 *                       type:
 *                         type: string
 *                         enum: ["DOG", "CAT", "MOUSE", "RABBIT", "BIRD"]
 *                         example: "DOG"
 *                       status:
 *                         type: string
 *                         enum: ["IDLE", "RESERVED", "CHECKED_IN", "CHECKED_OUT", "QUEUE", "IN_PROGRESS", "COMPLETED"]
 *                         example: "IDLE"
 *                       breed:
 *                         type: string
 *                         example: "Golden Retriever"
 *                       disease:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["Arthritis"]
 *                       allergic:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["Pollen"]
 *                       picture:
 *                         type: string
 *                         example: "https://storage.googleapis.com/paw_image/buddy.jpg"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNAUTHORIZED"
 *                 message:
 *                   type: string
 *                   example: "Not authorized to access this route"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNABLE_TO_LOAD"
 *                 message:
 *                   type: string
 *                   example: "Unable to load pets. Please refresh and try again"
 */

/** 
 * @swagger
 * /pets/{id}/bookings:
 *   get:
 *     summary: Get all bookings for a pet
 *     description: Returns all booked services and rooms for a specific pet
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The pet ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Pet bookings retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 type:
 *                   type: string
 *                   example: "BOOKINGS_RETRIEVED"
 *                 message:
 *                   type: string
 *                   example: "Pet bookings retrieved successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     petId:
 *                       type: integer
 *                       example: 1
 *                     petName:
 *                       type: string
 *                       example: "Buddy"
 *                     services:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           scheduled:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-01-15T10:00:00Z"
 *                           status:
 *                             type: string
 *                             enum: ["PENDING", "RESERVED", "QUEUE", "IN_PROGRESS", "COMPLETED", "CANCELLED"]
 *                             example: "RESERVED"
 *                           serviceId:
 *                             type: integer
 *                             example: 1
 *                           petId:
 *                             type: integer
 *                             example: 1
 *                           booking_id:
 *                             type: integer
 *                             example: 1
 *                           service:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 example: 1
 *                               name:
 *                                 type: string
 *                                 example: "Grooming"
 *                               price:
 *                                 type: number
 *                                 format: float
 *                                 example: 500.00
 *                               petType:
 *                                 type: array
 *                                 items:
 *                                   type: string
 *                                   enum: ["DOG", "CAT", "MOUSE", "RABBIT", "BIRD"]
 *                                 example: ["DOG", "CAT"]
 *                               picture:
 *                                 type: string
 *                                 example: "https://storage.googleapis.com/paw_image/grooming.jpg"
 *                           pet:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 example: 1
 *                               name:
 *                                 type: string
 *                                 example: "Buddy"
 *                               sex:
 *                                 type: string
 *                                 enum: ["MALE", "FEMALE"]
 *                                 example: "MALE"
 *                               age:
 *                                 type: integer
 *                                 example: 3
 *                               type:
 *                                 type: string
 *                                 enum: ["DOG", "CAT", "MOUSE", "RABBIT", "BIRD"]
 *                                 example: "DOG"
 *                               status:
 *                                 type: string
 *                                 enum: ["IDLE", "RESERVED", "CHECKED_IN", "CHECKED_OUT", "QUEUE", "IN_PROGRESS", "COMPLETED"]
 *                                 example: "IDLE"
 *                               breed:
 *                                 type: string
 *                                 example: "Golden Retriever"
 *                               disease:
 *                                 type: array
 *                                 items:
 *                                   type: string
 *                                 example: ["Arthritis"]
 *                               allergic:
 *                                 type: array
 *                                 items:
 *                                   type: string
 *                                 example: ["Pollen"]
 *                               picture:
 *                                 type: string
 *                                 example: "https://storage.googleapis.com/paw_image/buddy.jpg"
 *                               customerId:
 *                                 type: integer
 *                                 example: 1
 *                     rooms:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           checkIn:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-01-15T14:00:00Z"
 *                           checkOut:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-01-17T12:00:00Z"
 *                           status:
 *                             type: string
 *                             enum: ["PENDING", "RESERVED", "CHECKED_IN", "CHECKED_OUT", "CANCELLED"]
 *                             example: "RESERVED"
 *                           roomId:
 *                             type: integer
 *                             example: 1
 *                           petId:
 *                             type: integer
 *                             example: 1
 *                           bookingId:
 *                             type: integer
 *                             example: 1
 *                           room:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 example: 1
 *                               name:
 *                                 type: string
 *                                 example: "Deluxe Suite"
 *                               number:
 *                                 type: integer
 *                                 example: 101
 *                               capacity:
 *                                 type: integer
 *                                 example: 2
 *                               price:
 *                                 type: number
 *                                 format: float
 *                                 example: 2000.00
 *                               picture:
 *                                 type: string
 *                                 example: "https://storage.googleapis.com/paw_image/room101.jpg"
 *                               petType:
 *                                 type: string
 *                                 enum: ["DOG", "CAT", "MOUSE", "RABBIT", "BIRD"]
 *                                 example: "DOG"
 *                           pet:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 example: 1
 *                               name:
 *                                 type: string
 *                                 example: "Buddy"
 *                               sex:
 *                                 type: string
 *                                 enum: ["MALE", "FEMALE"]
 *                                 example: "MALE"
 *                               age:
 *                                 type: integer
 *                                 example: 3
 *                               type:
 *                                 type: string
 *                                 enum: ["DOG", "CAT", "MOUSE", "RABBIT", "BIRD"]
 *                                 example: "DOG"
 *                               status:
 *                                 type: string
 *                                 enum: ["IDLE", "RESERVED", "CHECKED_IN", "CHECKED_OUT", "QUEUE", "IN_PROGRESS", "COMPLETED"]
 *                                 example: "IDLE"
 *                               breed:
 *                                 type: string
 *                                 example: "Golden Retriever"
 *                               disease:
 *                                 type: array
 *                                 items:
 *                                   type: string
 *                                 example: ["Arthritis"]
 *                               allergic:
 *                                 type: array
 *                                 items:
 *                                   type: string
 *                                 example: ["Pollen"]
 *                               picture:
 *                                 type: string
 *                                 example: "https://storage.googleapis.com/paw_image/buddy.jpg"
 *                               customerId:
 *                                 type: integer
 *                                 example: 1
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "UNAUTHORIZED"
 *                 message:
 *                   type: string
 *                   example: "Not authorized to access this route"
 *       404:
 *         description: Pet not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "Pet not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 type:
 *                   type: string
 *                   example: "SERVER_ERROR"
 *                 message:
 *                   type: string
 *                   example: "Unable to retrieve pet bookings"
 */
