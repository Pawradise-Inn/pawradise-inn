const prisma = require('../prisma/prisma');
const {findServiceById} = require('logics/service');
const { addServicePictures, removeServicePictures } = require('./logics/service');

const getServices = async (req, res) =>{
    try {
        const services = await prisma.service.findMany();
        if(services.length === 0) return res.status(404).json({success: false, msg: "No service in database"});
        res.status(200).json({success: true, data: services});
    } catch (err) {
        res.status(400).json({success: false, error: err.message});
    }
};

const getService = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const service = await findServiceById(serviceId);
        if(!service) return res.status(404).json({success: false, msg: 'Service is not found'});
        res.status(200).json({success: true, data: service});
    } catch (err) {
        res.status(400).json({success: false, error: err.message});
    }
};

const createService = async (req, res) => {
    try {
        const {name, price, petType} = req.body;
        const service = await prisma.service.create({
            data: {
                name: name,
                price: price,
                petType: petType
            }
        });
        res.status(201).json({success: true, data: service});
    } catch (err) {
        res.status(400).json({success: false, error: err.message});
    }
}

const updateService = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const dataToUpdate = {};
        if (req.body.name !== undefined) dataToUpdate.name = req.body.name;
        if (req.body.price !== undefined) dataToUpdate.price = req.body.price;
        if (req.body.petType !== undefined) dataToUpdate.petType = req.body.petType;

        if(Object.keys(dataToUpdate).length === 0) return res.status(400).json({success: false, msg: "No valid fields to update"});

        const service = await prisma.service.update({
            where: {id: Number(serviceId)},
            data: dataToUpdate
        });
        res.status(200).json({success: true, data: service});
    } catch (err) {
        if (err.code === 'P2025') return res.status(404).json({success: false, msg: 'Service is not found'});
        res.status(400).json({success: false, error: err.message});
    }
}

const deleteService = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const service = await prisma.service.delete({
            where: {id: Number(serviceId)}
        });
        res.status(200).json({success: true, data: {}});
    } catch(err){
        if (err.code === 'P2025') return res.status(404).json({success: false, msg: 'Service is not found or already deleted'});
        res.status(400).json({success: false, error: err.message});
    }
};

const addPicturesToService = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const pictures = req.body.picture;
        const service = await addServicePictures(serviceId, pictures);
        res.status(200).json({success: true, data: service});
    }catch(err){
        if(err.code === 'P2025') return res.status(404).json({success: false, msg: 'Service is not found'});
        res.status(400).json({success: false, error: err.message});
    }
};

const deletePicturesFromService = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const pictures = req.body.picture;
        const service = await removeServicePictures(serviceId, pictures);
        res.status(200).json({success: true, data: service});
    }catch(err){
        if(err.code === 'P2025') return res.status(404).json({success: false, msg: 'Service is not found'});
        res.status(400).json({success: false, error: err.message});
    }
};

module.exports = {
    getServices,
    getService,
    createService,
    updateService,
    deleteService,
    addPicturesToService,
    deletePicturesFromService
};