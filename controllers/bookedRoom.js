const prisma = require('../prisma/prisma');

const getBookedRooms = async (req, res) => {
    try {
        const bookedRooms = await prisma.bookedRoom.findMany();
        res.status(200).json({success: true, data: bookedRooms});
    } catch (err){
        res.status(400).json({success: false, error: err.message});
    }
};

const getBookedRoom = async (req, res) => {
    try {
        const bookedRoom = await prisma.bookedRoom.findUnique({
            where: {id: Number(req.params.id)}
        });
        if(!bookedRoom) res.status(404).json({success: false, msg: 'Booked Room not found'});
        res.status(200).json({success:true, data: bookedRoom});
    } catch (err){
        res.status(400).json({success: false, error: err.message});
    }
}

const createBookedRoom = async (req, res) => {
    try {
        const bookedRoom = await prisma.bookedRoom.create({
            data: {
                bookingId: req.body.bookingId,
                roomId: req.body.roomId,
                petId: req.body.petId,
                checkIn: req.body.checkIn,
                checkOut: req.body.checkOut
            }
        });
        res.status(201).json({success: true, data: bookedRoom});
    } catch (err){
        res.status(400).json({success: false, error: err.message});
    }
}

const updateBookedRoom = async (req, res) => {
    try {
        const bookedRoom = await prisma.bookedRoom.update({
            where: {id: Number(req.params.id)},
            data: req.body
        });
        res.status(200).json({success: true, data: bookedRoom});
    } catch (err){
        res.status(400).json({success: false, error: err.message});
    }
};

const deleteBookedRoom = async (req, res) => {
    try {
        const bookedRoom = await prisma.bookedRoom.delete({
            where: {id: Number(req.params.id)}
        });
        res.status(200).json({success: true, data: {}});
    } catch (err){
        res.status(400).json({success: false, error: err.message})
    }
};

module.exports = {
    getBookedRooms,
    getBookedRoom,
    createBookedRoom,
    updateBookedRoom,
    deleteBookedRoom
};