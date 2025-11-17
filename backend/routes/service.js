const express = require('express');
const router = express.Router();

const {
    getServices,
    getService,
    createService,
    updateService,
    deleteService,
    addPicturesToService,
    deletePicturesFromService,
    getServicesWithPagination,
    getServiceStatus,
    getServiceReviews,
    // getPetTypes
} = require('../controllers/service');

const {protect, authorize} = require('../middleware/auth');

const chatlogs = require('./chatlog');
router.use('/:serviceName/comments', chatlogs);

router.route('/status')
    .get(protect, getServiceStatus);

router.route('/reviews')
    .get(protect, getServicesWithPagination);

// router.get('/pet-types', getPetTypes);

router.route('/')
    .get(protect, getServices)      
    .post(protect, authorize("STAFF"), createService);  

router.route('/:id')
    .get(protect, getService)        
    .patch(protect, authorize("STAFF"), updateService)  
    .delete(protect, authorize("STAFF"), deleteService);

router.route('/:id/pictures')
    .post(protect, authorize("STAFF"), addPicturesToService) 
    .delete(protect, authorize("STAFF"), deletePicturesFromService); 

router.route('/:id/reviews')
    .get(protect, getServiceReviews);


module.exports = router;

/** 
 * @swagger
 * tags:
 *   name: Services
 *   description: The services managing API
 */

/** 
 * @swagger
 * /services:
 *   get:
 *     summary: Returns the list of all the services with filtering, sorting, and pagination
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: JSON string for filtering (e.g., {"name":{"contains":"Grooming"}})
 *         example: '{"name":{"contains":"Grooming"}}'
 *       - in: query
 *         name: select
 *         schema:
 *           type: string
 *         description: Comma-separated list of fields to select (e.g., "id,name,price")
 *         example: 'id,name,price'
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Comma-separated list of fields with optional direction (e.g., "name:asc,price:desc")
 *         example: 'name:asc'
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *         example: 10
 *     responses:
 *       200:
 *         description: Services loaded successfully
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
 *                   example: "Services loaded"
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
 *                         example: "Pet Grooming"
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 500.00
 *                       petType:
 *                         type: array
 *                         items:
 *                           type: string
 *                           enum: [DOG, CAT, MOUSE, RABBIT, BIRD]
 *                         example: ["DOG", "CAT"]
 *                       picture:
 *                         type: string
 *                         example: "https://storage.googleapis.com/paw_image/service/grooming.jpg"
 *                 total:
 *                   type: integer
 *                   example: 25
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
 *                   example: "Authentication required"
 *       404:
 *         description: No services found
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
 *                   example: "No services are available at the moment"
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
 *                   example: "Unable to load services. Please refresh and try again"
 *   post:
 *     summary: Create a new service
 *     tags: [Services]
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
 *               - price
 *               - petType
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 30
 *                 description: Service name
 *                 example: "Pet Grooming"
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Service price
 *                 example: 500.00
 *               petType:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [DOG, CAT, MOUSE, RABBIT, BIRD]
 *                 description: Array of pet types this service is available for
 *                 example: ["DOG", "CAT"]
 *               picture:
 *                 type: string
 *                 description: Service picture URL (optional, defaults to unnamed.jpg)
 *                 example: "https://storage.googleapis.com/paw_image/service/grooming.jpg"
 *     responses:
 *       201:
 *         description: The service was created successfully
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
 *                   example: "CREATED_SUCCESSFULLY"
 *                 message:
 *                   type: string
 *                   example: "Service created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Pet Grooming"
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 500.00
 *                     petType:
 *                       type: array
 *                       items:
 *                         type: string
 *                         enum: [DOG, CAT, MOUSE, RABBIT, BIRD]
 *                       example: ["DOG", "CAT"]
 *                     picture:
 *                       type: string
 *                       example: "https://storage.googleapis.com/paw_image/service/grooming.jpg"
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
 *                   example: "Authentication required"
 *       403:
 *         description: Forbidden - Staff role required
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
 *                   example: "FORBIDDEN"
 *                 message:
 *                   type: string
 *                   example: "Staff role required"
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
 *                   example: "UNABLE_TO_SAVE"
 *                 message:
 *                   type: string
 *                   example: "Unable to create service. Please try again"
 */

/** 
 * @swagger
 * /services/{id}:
 *   get:
 *     summary: Get the service by id
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The service id
 *         example: 1
 *     responses:
 *       200:
 *         description: Service details loaded successfully
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
 *                   example: "Service details loaded"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Pet Grooming"
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 500.00
 *                     petType:
 *                       type: array
 *                       items:
 *                         type: string
 *                         enum: [DOG, CAT, MOUSE, RABBIT, BIRD]
 *                       example: ["DOG", "CAT"]
 *                     picture:
 *                       type: string
 *                       example: "https://storage.googleapis.com/paw_image/service/grooming.jpg"
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
 *                   example: "Authentication required"
 *       404:
 *         description: The service was not found
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
 *                   example: "SERVICE_NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "Service not found"
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
 *                   example: "Unable to load service details. Please refresh and try again"
 *   patch:
 *     summary: Update service by id
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The service id
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
 *                 description: Service name (optional)
 *                 example: "Pet Grooming Deluxe"
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Service price (optional)
 *                 example: 600.00
 *               petType:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [DOG, CAT, MOUSE, RABBIT, BIRD]
 *                 description: Array of pet types this service is available for (optional)
 *                 example: ["DOG", "CAT", "RABBIT"]
 *               picture:
 *                 type: string
 *                 description: Service picture URL (optional)
 *                 example: "https://storage.googleapis.com/paw_image/service/grooming-deluxe.jpg"
 *     responses:
 *       200:
 *         description: The service was updated successfully
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
 *                   example: "Service updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Pet Grooming Deluxe"
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 600.00
 *                     petType:
 *                       type: array
 *                       items:
 *                         type: string
 *                         enum: [DOG, CAT, MOUSE, RABBIT, BIRD]
 *                       example: ["DOG", "CAT", "RABBIT"]
 *                     picture:
 *                       type: string
 *                       example: "https://storage.googleapis.com/paw_image/service/grooming-deluxe.jpg"
 *       400:
 *         description: Missing fields to update
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
 *                   example: "Please provide details to update"
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
 *                   example: "Authentication required"
 *       403:
 *         description: Forbidden - Staff role required
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
 *                   example: "FORBIDDEN"
 *                 message:
 *                   type: string
 *                   example: "Staff role required"
 *       404:
 *         description: Service not found
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
 *                   example: "SERVICE_NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "Service not found"
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
 *                   example: "Unable to update service. Please try again"
 *   delete:
 *     summary: Delete service by id
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The service id
 *         example: 1
 *     responses:
 *       200:
 *         description: The service was deleted successfully
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
 *                   example: "Service deleted successfully"
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
 *                   example: "Authentication required"
 *       403:
 *         description: Forbidden - Staff role required
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
 *                   example: "FORBIDDEN"
 *                 message:
 *                   type: string
 *                   example: "Staff role required"
 *       404:
 *         description: Service not found
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
 *                   example: "SERVICE_NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "Service not found or already deleted"
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
 *                   example: "Unable to delete service. Please try again"
 */
/** 
 * @swagger
 * /services/{id}/pictures:
 *   post:
 *     summary: Add/update picture for service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The service id
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - picture
 *             properties:
 *               picture:
 *                 type: string
 *                 description: Service picture URL
 *                 example: "https://storage.googleapis.com/paw_image/service/grooming-new.jpg"
 *     responses:
 *       200:
 *         description: Service picture updated successfully
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
 *                   example: "Service picture updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Pet Grooming"
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 500.00
 *                     petType:
 *                       type: array
 *                       items:
 *                         type: string
 *                         enum: [DOG, CAT, MOUSE, RABBIT, BIRD]
 *                       example: ["DOG", "CAT"]
 *                     picture:
 *                       type: string
 *                       example: "https://storage.googleapis.com/paw_image/service/grooming-new.jpg"
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
 *                   example: "Authentication required"
 *       403:
 *         description: Forbidden - Staff role required
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
 *                   example: "FORBIDDEN"
 *                 message:
 *                   type: string
 *                   example: "Staff role required"
 *       404:
 *         description: Service not found
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
 *                   example: "SERVICE_NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "Service not found"
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
 *                   example: "Unable to add pictures to service. Please try again"
 *   delete:
 *     summary: Remove picture from service (resets to default)
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The service id
 *         example: 1
 *     responses:
 *       200:
 *         description: Service picture removed successfully
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
 *                   example: "Service picture removed successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Pet Grooming"
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 500.00
 *                     petType:
 *                       type: array
 *                       items:
 *                         type: string
 *                         enum: [DOG, CAT, MOUSE, RABBIT, BIRD]
 *                       example: ["DOG", "CAT"]
 *                     picture:
 *                       type: string
 *                       example: "https://storage.googleapis.com/paw_image/service/unnamed.jpg"
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
 *                   example: "Authentication required"
 *       403:
 *         description: Forbidden - Staff role required
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
 *                   example: "FORBIDDEN"
 *                 message:
 *                   type: string
 *                   example: "Staff role required"
 *       404:
 *         description: Service not found
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
 *                   example: "SERVICE_NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "Service not found"
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
 *                   example: "Unable to remove pictures from service. Please try again"
 */

/** 
 * @swagger
 * /services/status:
 *   get:
 *     summary: Check service availability at a specific time
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Service name to check availability
 *         example: "Pet Grooming"
 *       - in: query
 *         name: entry_date_with_time
 *         schema:
 *           type: string
 *           format: date-time
 *         required: true
 *         description: Date and time to check availability (ISO 8601 format)
 *         example: "2024-12-25T10:00:00Z"
 *     responses:
 *       200:
 *         description: Service availability checked successfully
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
 *                   example: "Service availability checked"
 *                 data:
 *                   type: null
 *                   example: null
 *                 total:
 *                   type: object
 *                   properties:
 *                     count:
 *                       type: integer
 *                       description: Number of overlapping bookings at the specified time
 *                       example: 3
 *       400:
 *         description: Missing required fields
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
 *                   example: "Please provide service name and date"
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
 *                   example: "Authentication required"
 *       404:
 *         description: Service not found
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
 *                   example: "SERVICE_NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "Service not found"
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
 *                   example: "Unable to check service availability. Please refresh and try again"
 */

/** 
 * @swagger
 * /services/reviews:
 *   get:
 *     summary: Get all services with review statistics and pagination
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Services with review statistics loaded successfully
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
 *                   example: "Services loaded"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       image:
 *                         type: string
 *                         example: "https://storage.googleapis.com/paw_image/service/grooming.jpg"
 *                       name:
 *                         type: string
 *                         example: "Pet Grooming"
 *                       reviewStar:
 *                         type: string
 *                         description: Average rating formatted to 2 decimal places
 *                         example: "4.50"
 *                       forWhich:
 *                         type: array
 *                         items:
 *                           type: string
 *                           enum: [DOG, CAT, MOUSE, RABBIT, BIRD]
 *                         example: ["DOG", "CAT"]
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 500.00
 *                       commentPages:
 *                         type: object
 *                         description: Review count by star rating
 *                         properties:
 *                           1:
 *                             type: integer
 *                             example: 2
 *                           2:
 *                             type: integer
 *                             example: 1
 *                           3:
 *                             type: integer
 *                             example: 3
 *                           4:
 *                             type: integer
 *                             example: 5
 *                           5:
 *                             type: integer
 *                             example: 10
 *                           total:
 *                             type: integer
 *                             example: 21
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
 *                   example: "Authentication required"
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
 *                   example: "Unable to load services. Please refresh and try again"
 */

/** 
 * @swagger
 * /services/{id}/reviews:
 *   get:
 *     summary: Get paginated reviews for a specific service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The service id
 *         example: 1
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Service name to get reviews for
 *         example: "Pet Grooming"
 *       - in: query
 *         name: star
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *         description: Filter reviews by star rating (optional)
 *         example: 5
 *       - in: query
 *         name: NSP
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination (Next Service Page)
 *         example: 1
 *     responses:
 *       200:
 *         description: Service reviews loaded successfully
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
 *                   example: "Service reviews loaded"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 15
 *                       commenter_name:
 *                         type: string
 *                         example: "john_doe"
 *                       comment_detail:
 *                         type: string
 *                         example: "Excellent grooming service! My dog looks amazing."
 *                       comment_star:
 *                         type: number
 *                         format: float
 *                         example: 5.0
 *       400:
 *         description: Missing required fields
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
 *                   example: "Please provide a service name to view reviews"
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
 *                   example: "Authentication required"
 *       404:
 *         description: Service not found
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
 *                   example: "SERVICE_NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "Service not found"
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
 *                   example: "Unable to load service reviews. Please refresh and try again"
 */
