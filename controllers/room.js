const prisma = require('../prisma/prisma');

const getRooms = async (req, res) => {
    try {
        const rooms = await prisma.room.findMany();
        res.status(200).json({success: true, data: rooms});
    } catch(err){
        res.status(400).json({success: false, error: err.message});
    }
};

const getRoom = async (req, res) => {
    try {
        const room = await prisma.room.findUnique({
            where: {id: Number(req.params.id)}
        });
        if(!room) return res.status(404).json({success: false, msg: 'Room not found'});
        res.status(200).json({success: true, data: room});
    } catch(err){
        res.status(400).json({success: false, error: err.message});
    }
};

const createRoom = async (req, res) => {
    try {
        const room = await prisma.room.create({
            data: {
                name: req.body.name,
                capacity: req.body.capacity,
                price: req.body.price,
                petType: req.body.petType,
                picture: req.body.picture
            }
        });
        res.status(201).json({success: true, data: room});
    } catch(err){
        res.status(400).json({success: false, error: err.message});
    }
};

const updateRoom = async (req, res) => {
    try {
        const room = await prisma.room.update({
            where: {id: Number(req.params.id)},
            data: req.body
        });
        if(!room) return res.status(404).json({success: false, msg: 'Room not found'});
        res.status(200).json({success: true, data: room});
    } catch(err){
        res.status(400).json({success: false, error: err.message});
    }
};

const deleteRoom = async (req, res) => {
    try {
        const room = await prisma.room.delete({
            where: {id: Number(req.params.id)}
        });
        if(!room) return res.status(404).json({success: false, msg: 'Room not found or already deleted'});
        res.status(200).json({success: true, data: {}});
    } catch(err){
        res.status(400).json({success: false, error: err.message});
    }
};

module.exports = {
    getRooms,
    getRoom,
    createRoom,
    updateRoom,
    deleteRoom
};