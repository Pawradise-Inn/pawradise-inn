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
    .get(getServiceStatus);

router.route('/reviews')
    .get(getServicesWithPagination);

// router.get('/pet-types', getPetTypes);

router.route('/')
    .get(getServices)      
    .post(protect, authorize("STAFF"), createService);  

router.route('/:id')
    .get(getService)        
    .patch(protect, authorize("STAFF"), updateService)  
    .delete(protect, authorize("STAFF"), deleteService);

router.route('/:id/pictures')
    .post(protect, authorize("STAFF"), addPicturesToService) 
    .delete(protect, authorize("STAFF"), deletePicturesFromService); 

router.route('/:id/reviews')
    .get(getServiceReviews);


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
 *     summary: Returns the list of all the services
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: The service description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       404:
 *         description: No services found
 *       500:
 *         description: Internal server error
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
 *             $ref: '#/components/schemas/Service'
 *     responses:
 *       201:
 *         description: The service was created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Staff role required
 *       500:
 *         description: Internal server error
 */

/** 
 * @swagger
 * /services/{id}:
 *   get:
 *     summary: Get the service by id
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The service id
 *     responses:
 *       200:
 *         description: The service description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       404:
 *         description: The service was not found
 *       500:
 *         description: Internal server error
 *   patch:
 *     summary: Update service by id
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The service id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Service'
 *     responses:
 *       200:
 *         description: The service was updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Staff role required
 *       404:
 *         description: Service not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete service by id
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The service id
 *     responses:
 *       200:
 *         description: The service was deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Staff role required
 *       404:
 *         description: Service not found
 *       500:
 *         description: Internal server error
 */
/** 
 * 
@swagger
 * /services/{id}/pictures:
 *   post:
 *     summary: Add pictures to service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The service id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Pictures added successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Staff role required
 *       404:
 *         description: Service not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete pictures from service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The service id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Pictures deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Staff role required
 *       404:
 *         description: Service not found
 *       500:
 *         description: Internal server error
 */

/** 
 * @swagger
 * /services/status:
 *   get:
 *     summary: Get service status
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: Service status information
 *       500:
 *         description: Internal server error
 */

/** 
 * @swagger
 * /services/reviews:
 *   get:
 *     summary: Get services with pagination and reviews
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: Paginated list of services with reviews
 *       500:
 *         description: Internal server error
 */

/** 
 * @swagger
 * /services/{id}/reviews:
 *   get:
 *     summary: Get service reviews by id
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The service id
 *     responses:
 *       200:
 *         description: List of service reviews
 *       404:
 *         description: Service not found
 *       500:
 *         description: Internal server error
 */
