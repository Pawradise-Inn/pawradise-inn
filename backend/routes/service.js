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
    getAllServiceComments,
    getServiceStatus,
    //getServiceReviews
} = require('../controllers/service');

const {protect, authorize} = require('../middleware/auth');

router.route('/status')
    .get(getServiceStatus);

router.route('/comments')
    .get(getAllServiceComments);

// router.route('/reviews')
    // .get(getServiceReviews);

const chatlogs = require('./chatlog.js');
router.use('/:serviceId/comments', chatlogs);

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

module.exports = router;