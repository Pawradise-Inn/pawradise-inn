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
    getServiceStatus
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

router.route('/:id/status')
    .get(getServiceStatus); //

router.route('/:id/comments')
    .get(getAllServiceComments); //

module.exports = router;