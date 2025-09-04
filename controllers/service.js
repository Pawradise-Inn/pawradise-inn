const prisma = require('../prisma/prisma');

const getServices = async (req, res) =>{
    try {
        const service = await prisma.service.findMany();
        res.status(200).json({success: true, data: service});
    } catch (err) {
        res.status(400).json({success: false, error: err.message});
    }
};

const getService = async (req, res) => {
    try {
        const service = await prisma.service.findUnique({
            where: {id: Number(req.params.id)}
        });
        if(!service) return res.status(404).json({success: false, msg: 'Service not found'});
        res.status(200).json({success: true, data: service});
    } catch (err) {
        res.status(400).json({success: false, error: err.message});
    }
};

const createService = async (req, res) => {
    try {
        const service = await prisma.service.create({
            data: {
                name: req.body.name,
                price: req.body.price,
                petType: req.body.petType,
                picture: req.body.picture
            }
        });
        res.status(201).json({success: true, data: service});
    } catch (err) {
        res.status(400).json({success: false, error: err.message});
    }
}

const updateService = async (req, res) => {
    try {
        const service = await prisma.service.update({
            where: {id: Number(req.params.id)},
            data: req.body
        });
        res.status(200).json({success: true, data: service});
    } catch (err) {
        res.status(400).json({success: false, error: err.message});
    }
}

const deleteService = async (req, res) => {
    try {
        const service = await prisma.service.delete({
            where: {id: Number(req.params.id)}
        });
        res.status(200).json({success: true, data: {}});
    } catch(err){
        res.status(400).json({success: false, error: err.message});
    }
};

exports = module.exports = {
    getServices,
    getService,
    createService,
    updateService,
    deleteService
};