const prisma = require('../prisma/prisma');
const {findBookedRoomById, overlappingRoom, createBookedRoomWithCondition} = require('./logics/bookedRoom');
const {getRoomCap} = require('./logics/room');

const getBookedRooms = async (req, res) => {
    try {
        const bookedRooms = await prisma.bookedRoom.findMany();
        if(bookedRooms.length === 0) return res.status(404).json({success: false, msg: "No booked room in database"});
        res.status(200).json({success: true, data: bookedRooms});
    } catch (err){
        res.status(400).json({success: false, error: err.message});
    }
};

const getBookedRoom = async (req, res) => {
    try {
        const bookedRoomId = req.params.id;
        const bookedRoom = await findBookedRoomById(bookedRoomId);
        if(!bookedRoom) return res.status(404).json({success: false, msg: 'Booked room is not found'});
        res.status(200).json({success:true, data: bookedRoom});
    } catch (err){
        res.status(400).json({success: false, error: err.message});
    }
}

const createBookedRoom = async (req, res) => {
    try {
        const {roomId, petId, bookingId, checkIn, checkOut} = req.body;
        const bookedRoom = await createBookedRoomWithCondition(
             roomId, 
             petId, 
             bookingId, 
             checkIn, 
             checkOut
        );
        res.status(201).json({success: true, data: bookedRoom});
    } catch (err){
        if (err.duplicatedDates) {
            return res.status(400).json({
                success: false,
                message: err.message,
                duplicatedDates: err.duplicatedDates
            });
        }
        res.status(400).json({success: false, error: err.message});
    }
};

const updateBookedRoom = async (req, res) => {
    try {
        const bookedId = Number(req.params.id);
        const {checkIn, checkOut} = req.body;
        if(!checkIn, !checkOut){
            return res.status(400).json({success: false, msg: "Nothing to update"});
        }

        const bookedRoom = await findBookedRoomById(bookedId);
        const count = await overlappingRoom(bookedRoom.roomId, checkIn, checkOut);
        const cap = await getRoomCap(roomId);
        if (count >= cap){
            res.status(400).json({success: false, msg: 'Room is not available'});
        }

        const updateBookedRoom = await prisma.bookedRoom.update({
            where: {id: bookedId},
            data: {
                checkIn: new Date(checkIn),
                checkOut: new Date(checkOut)
            }
        });
        res.status(200).json({success: true, data: updateBookedRoom});
    }catch(err){
        if (err.code === 'P2025') return res.status(404).json({success: false, msg: 'Booked room is not found or already deleted'});
        res.status(400).json({success: false, error: err.message});
    }
};

const deleteBookedRoom = async (req, res) => {
    try {
        const bookedRoomId = req.params.id;
        const bookedRoom = await prisma.bookedRoom.delete({
            where: {id: Number(bookedRoomId)}
        });
        res.status(200).json({success: true, data: {}});
    } catch (err){
        if (err.code === 'P2025') return res.status(404).json({success: false, msg: 'Booked room is not found or already deleted'});
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