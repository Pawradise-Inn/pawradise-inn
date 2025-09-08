const prisma = require('../prisma/prisma');
const {findRoomById, addRoomPictures, removeRoomPictures} = require('./logics/room');

const getRooms = async (req, res) => {
    try {
        const rooms = await prisma.room.findMany();
        if(rooms.length === 0) return res.status(404).json({success: false, msg: "No room in database"});
        res.status(200).json({success: true, data: rooms});
    } catch(err){
        res.status(400).json({success: false, error: err.message});
    }
};

const getRoom = async (req, res) => {
    try {
        const roomId = req.params.id;
        const room = await findRoomById(roomId);
        if(!room) return res.status(404).json({success: false, msg: 'Room is not found'});
        res.status(200).json({success: true, data: room});
    } catch(err){
        res.status(400).json({success: false, error: err.message});
    }
};

const createRoom = async (req, res) => {
    try {
        const {capacity, price, petType} = req.body;
        const room = await prisma.room.create({
            data: {
                capacity: capacity,
                price: price,
                petType: petType,
            }
        });
        res.status(201).json({success: true, data: room});
    } catch(err){
        res.status(400).json({success: false, error: err.message});
    }
};

const updateRoom = async (req, res) => {
    try {
        const roomId = req.params.id;
        const dataToUpdate = {};
        if (req.body.price !== undefined) dataToUpdate.price = req.body.price;
        if (req.body.petType !== undefined) dataToUpdate.petType = req.body.petType;

        if (Object.keys(dataToUpdate).length === 0) return res.status(400).json({ success: false, msg: "No valid fields to update" });
        
        const room = await prisma.room.update({
            where: {id: Number(roomId)},
            data: dataToUpdate
        });
        res.status(200).json({success: true, data: room});
    } catch(err){
        if (err.code === 'P2025') return res.status(404).json({success: false, msg: 'Room is not found'});
        res.status(400).json({success: false, error: err.message});
    }
};

const deleteRoom = async (req, res) => {
    try {
        const roomId = req.params.id;
        const room = await prisma.room.delete({
            where: {id: Number(roomId)}
        });
        res.status(200).json({success: true, data: {}});
    } catch(err){
        if (err.code === 'P2025') return res.status(404).json({success: false, msg: 'Room is not found or already deleted'});
        res.status(400).json({success: false, error: err.message});
    }
};

const addPicturesToRoom = async (req, res) =>{
    try {
        const roomId = req.params.id;
        const pictures = req.body.picture;
        const room = await addRoomPictures(roomId, pictures);
        res.status(200).json({success: true, data: room});
    }catch(err){
        if (err.code === 'P2025') return res.status(404).json({success: false, msg: 'Room is not found'});
        res.status(400).json({success: false, error: err.message})
    }
};

const deletePicturesFromRoom = async (req, res) =>{
    const roomId = req.params.id;
    const pictures = req.body.picture;
    try {
        const room = await removeRoomPictures(roomId, pictures);
        res.status(200).json({success: true, data: room});
    }catch(err){
        if (err.code === 'P2025') return res.status(404).json({success: false, msg: 'Room is not found'});
        res.status(400).json({success: false, error: err.message})
    }
};

module.exports = {
    getRooms,
    getRoom,
    createRoom,
    updateRoom,
    deleteRoom,
    addPicturesToRoom,
    deletePicturesFromRoom
};

