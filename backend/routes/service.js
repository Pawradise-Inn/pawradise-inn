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
    getServiceReviews
} = require('../controllers/service');

router.route('/')
    .get(getServices)       //
    .post(createService);   //

router.route('/:id')
    .get(getService)        //
    .patch(updateService)   //
    .delete(deleteService);

router.route('/:id/pictures')
    .post(addPicturesToService) //
    .delete(deletePicturesFromService); //

router.route('/status')
    .get(getServiceStatus); //

router.route('/comments')
    .get(getAllServiceComments); //

router.route('/reviews')
    .get(getServiceReviews);

module.exports = router;