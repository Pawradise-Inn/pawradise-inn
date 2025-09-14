const prisma = require('../prisma/prisma');
const {findRoomById, addRoomPictures, removeRoomPictures} = require('./logics/room');
const {overlappingRoom} = require('./logics/bookedRoom');

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
        const {capacity, price, petType, picture} = req.body;
        const room = await prisma.room.create({
            data: {
                capacity: capacity,
                price: price,
                petType: petType,
                picture: picture
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

        if (Object.keys(dataToUpdate).length === 0) return res.status(400).json({ success: false, msg: "No valid fields to update"});
        
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

const deleteRoom = async (req, res) => { //requirement: 17;
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
        const roomId = Number(req.params.id);
        const pictures = req.body.picture;
        const room = await addRoomPictures(roomId, pictures);
        res.status(200).json({success: true, data: room});
    }catch(err){
        if (err.code === 'P2025') return res.status(404).json({success: false, msg: 'Room is not found'});
        res.status(400).json({success: false, error: err.message});
    }
};

const deletePicturesFromRoom = async (req, res) =>{
    try {
        const roomId = Number(req.params.id);
        const pictures = req.body.picture;
        const room = await removeRoomPictures(roomId, pictures);
        res.status(200).json({success: true, data: room});
    }catch(err){
        if (err.code === 'P2025') return res.status(404).json({success: false, msg: 'Room is not found'});
        res.status(400).json({success: false, error: err.message});
    }
};

const getRoomStatus = async (req, res)=>{ //requirement: 8
    try{
        const id = Number(req.params.id);
        const checkIn = new Date(req.query.entry_date);
        const checkOut = new Date(req.query.exit_date);

        if (checkIn >= checkOut) {
            return res.status(400).json({ success: false, msg: "Check-in date must be before check-out date" });
        }

        const room = await findRoomById(id);
        if(!room) return res.status(404).json({ success: false, error: "Room is not found" });

        const status = await overlappingRoom(id, checkIn, checkOut);
        res.status(200).json({success: true, available: status < room.capacity});
    }catch(err){
        res.status(400).json({success: false, error: err.message});
    }
};

const getAvailableRooms = async (req, res) => { //requirement: 7
  try {
    const { pet_type, entry_date_with_time, exit_date_with_time } = req.query;

    if (!pet_type || !entry_date_with_time || !exit_date_with_time) {
      return res.status(400).json({ success: false, msg: "Missing required parameters" });
    }

    const entryDate = new Date(entry_date_with_time);
    const exitDate = new Date(exit_date_with_time);

    if (entryDate >= exitDate) {
      return res.status(400).json({ success: false, msg: "entry_date must be before exit_date" });
    }

    const availableRooms = await prisma.room.findMany({
      where: {
        petType: pet_type,
        bookings: {
          none: {
            OR: [
              { checkIn: { lt: exitDate }, checkOut: { gt: entryDate } } 
            ]
          }
        }
      },
      select: {
        id: true,
        picture: true,
        price: true,
        capacity: true,
        ChatLog: {
          select: {
            rating: true
          }
        }
      }
    });

    if (!availableRooms || availableRooms.length === 0) {
      return res.status(404).json({ success: false, msg: "No rooms available" });
    }

    const formattedRooms = availableRooms.map(r => {
      const ratings = r.ChatLog.map(c => c.rating ?? 5);
      const avgRating = ratings.length ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 5;

      return {
        image: r.picture,
        roomId: r.id,
        price: r.price,
        size: r.capacity,
        maxsize: r.capacity,
        review: avgRating
      };
    });

    res.status(200).json({ success: true, data: formattedRooms });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getAllRoomsWithReviews = async (req, res) => {
  try {
    const rooms = await prisma.room.findMany({
      select: {
        picture: true,
        price: true,
        capacity: true,
        petType: true,
        ChatLog: {
          select: {
            rating: true
          }
        }
      }
    });

    if (!rooms || rooms.length === 0) {
      return res.status(404).json({ success: false, msg: "No rooms found" });
    }

    const formattedRooms = rooms.map(r => {
      const ratings = r.ChatLog.map(c => c.rating ?? 5);
      const avgRating = ratings.length
        ? ratings.reduce((a, b) => a + b, 0) / ratings.length
        : 5;

      return {
        image: r.picture,
        roomId: r.id,
        review: avgRating,
        forwhich: r.petType,
        price: r.price,
        size: r.capacity,
        maxsize: r.capacity
      };
    });

    res.status(200).json({ success: true, data: formattedRooms });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};




module.exports = {
    getRooms,
    getRoom,
    createRoom,
    updateRoom,
    deleteRoom,
    addPicturesToRoom,
    deletePicturesFromRoom,
    getRoomStatus
};

