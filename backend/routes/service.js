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
    getPetTypes
} = require('../controllers/service');

const {protect, authorize} = require('../middleware/auth');

const chatlogs = require('./chatlog');
router.use('/:serviceName/comments', chatlogs);

router.route('/status')
    .get(getServiceStatus);

router.route('/reviews')
    .get(getServicesWithPagination);

router.get('/pet-types', getPetTypes);

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