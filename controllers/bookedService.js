const prisma = require('../prisma/prisma');

const getBookedServices = async (req, res) => {
    try {
        const bookedServices = await prisma.bookedService.findMany();
        res.status(200).json({success: true, data: bookedServices});
    } catch (err){
        res.status(400).json({success: false, error: err.message});
    }
};

const getBookedService = async (req, res) => {
    try {
        const bookedService = await prisma.bookedService.findUnique({
            where: {id: Number(req.params.id)}
        });
        if(!bookedService) res.status(404).json({success: false, msg: 'Booked Service not found'});
        res.status(200).json({success: true, data: bookedService});
    } catch(err){
        res.status(400).json({success: false, error: err.message});
    }
};

const createBookedService = async (req, res) => {
    try {
        const bookedService = await prisma.bookedService.create({
            data: {
                bookingId: req.body.bookingId,
                serviceId: req.body.serviceId,
            }
        });
        res.status(201).json({success: true, data: bookedService});
    } catch(err){
        res.status(400).json({success: false, error: err.message});
    }
};

const updateBookedService = async (req, res) => {
    try {
        const bookedService = await prisma.bookedService.update({
            where: {id: Number(req.params.id)}
        });
        if(!bookedService) return res.status(404).json({success: false, msg: 'Booked Service not found'});
        res.status(200).json({success: true, data: bookedService});
    } catch(err){
        res.status(400).json({success: false, error: err.message});
    }
};

const deleteBookedService = async (req, res) => {
    try {
        const bookedService = await prisma.bookedService.delete({
            where: {id: Number(req.params.id)}
        });
        if(!bookedService) return res.status(404).json({success: false, msg: 'Booked Service not found or already deleted'});
        res.status(200).json({success: true, data: {}});
    } catch(err){
        res.status(400).json({success: false, error: err.message});
    }
};

module.exports = {
    getBookedServices,
    getBookedService,
    createBookedService,
    updateBookedService,
    deleteBookedService
};