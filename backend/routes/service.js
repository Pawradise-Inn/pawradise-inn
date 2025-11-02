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
 * /service:
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
 *       500:
 *         description: Internal server error
 */

/** 
 * @swagger
 * /service/{id}:
 *   get:
 *     summary: Get the service by id
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The hospital id
 *     responses:
 *       200:
 *         description: The hospital description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hospital'
 *       404:
 *         description: The hospital was not found
 */