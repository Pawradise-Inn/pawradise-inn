const prisma = require("../prisma/prisma");
const {
  findRoomById,
  addRoomPictures,
  removeRoomPictures,
} = require("./logics/room");
const { overlappingRoom } = require("./logics/bookedRoom");

const getRooms = async (req, res) => {
  let options = {};
  
  //Select filter
  if (req.query.filter){
    let where = JSON.parse(req.query.filter)
    if (where.name){
      where.name.mode = 'insensitive';
    }
    options.where = where;
  }

  //Select fields
  if (req.query.select){
    const fields = req.query.select.split(",");
    options.select = fields.reduce((acc, field) => {
      acc[field.trim()] = true;
      return acc;
    }, {});
  }

  //Sort
  if (req.query.sort){
    const sortFields = req.query.sort.split(",");
    options.orderBy = sortFields.map(sortField => {
      const [field, direction = 'asc'] = sortField.split(":");
      const dir = direction.trim().toLowerCase() === 'desc' ? 'desc' : 'asc';
      return {[field.trim()] : dir};
    });
  } else {
    options.orderBy = {id: 'asc'};
  }

  //Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1)*limit;
  const endIndex = page*limit;

  options.skip = startIndex;
  options.take = limit;

  try {
    const total = await prisma.room.count({
      where: options.where
    });
    if (total === 0){
      return res
        .status(200)
        .json({ success: false, msg: "No room in database" });
    }

    const rooms = await prisma.room.findMany(options);

    const pagination = {};
    if (endIndex < total){
      pagination.next = {
        page: page + 1,
        limit: limit
      };
    }
    if (startIndex > 0){
      pagination.prev = {
        page: page - 1,
        limit: limit
      };
    }
    res.status(200).json({ success: true, pagination,data: rooms, count: total });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

const getRoom = async (req, res) => {
  try {
    const roomId = req.params.id;
    const room = await findRoomById(roomId);
    if (!room)
      return res.status(404).json({ success: false, msg: "Room is not found" });
    res.status(200).json({ success: true, data: room });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

const createRoom = async (req, res) => {
  try {
    const { number, name, capacity, price, type } = req.body;
    const room = await prisma.room.create({
      data: {
        number: number,
        name: name,
        capacity: capacity,
        price: price,
        petType: type
      },
    });
    res.status(201).json({ success: true, data: room });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

const updateRoom = async (req, res) => {
  try {
    const roomId = req.params.id;
    const dataToUpdate = {};
    if (req.body.price !== undefined) dataToUpdate.price = req.body.price;
    if (req.body.name !== undefined) dataToUpdate.name = req.body.name;
    if (req.body.petType !== undefined) dataToUpdate.petType = req.body.petType;
    if (req.body.capacity !== undefined) dataToUpdate.capacity = req.body.capacity;

    if (Object.keys(dataToUpdate).length === 0)
      return res
        .status(400)
        .json({ success: false, msg: "No valid fields to update" });

    const room = await prisma.room.update({
      where: { id: Number(roomId) },
      data: dataToUpdate,
    });
    res.status(200).json({ success: true, data: room });
  } catch (err) {
    if (err.code === "P2025")
      return res.status(404).json({ success: false, msg: "Room is not found" });
    res.status(400).json({ success: false, error: err.message });
  }
};

const deleteRoom = async (req, res) => {
  //requirement: 17;
  try {
    const roomId = req.params.id;
    const room = await prisma.room.delete({
      where: { id: Number(roomId) },
    });
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    if (err.code === "P2025")
      return res
        .status(404)
        .json({ success: false, msg: "Room is not found or already deleted" });
    res.status(400).json({ success: false, error: err.message });
  }
};

const addPicturesToRoom = async (req, res) => {
  try {
    const roomId = Number(req.params.id);
    const pictures = req.body.picture;
    const room = await addRoomPictures(roomId, pictures);
    res.status(200).json({ success: true, data: room });
  } catch (err) {
    if (err.code === "P2025")
      return res.status(404).json({ success: false, msg: "Room is not found" });
    res.status(400).json({ success: false, error: err.message });
  }
};

const deletePicturesFromRoom = async (req, res) => {
  try {
    const roomId = Number(req.params.id);
    const pictures = req.body.picture;
    const room = await removeRoomPictures(roomId, pictures);
    res.status(200).json({ success: true, data: room });
  } catch (err) {
    if (err.code === "P2025")
      return res.status(404).json({ success: false, msg: "Room is not found" });
    res.status(400).json({ success: false, error: err.message });
  }
};

const getRoomStatus = async (req, res) => {
  //requirement: 8
  try {
    const id = Number(req.params.id);
    const checkIn = new Date(req.query.entry_date);
    const checkOut = new Date(req.query.exit_date);

    if (checkIn >= checkOut) {
      return res.status(400).json({
        success: false,
        msg: "Check-in date must be before check-out date",
      });
    }

    const room = await findRoomById(id);
    if (!room)
      return res
        .status(404)
        .json({ success: false, error: "Room is not found" });

    const count = await overlappingRoom(id, checkIn, checkOut);
    res.status(200).json({ success: true, count: count });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

const getAvailableRooms = async (req, res) => { //requirement: 7
  let options = {};

  if(req.query.checkIn){
    const entryDate = new Date(checkIn);
    options.checkOut = {gt: entryDate};
  }
  if(req.query.checkOut){
    const exitDate = new Date(checkOut);
    options.checkIn = {lt: exitDate};
  }

  console.log(entryDate);
  console.log(exitDate);
  try {
    const allRooms = await prisma.room.findMany({
      select: {
        id: true,
        picture: true,
        price: true,
        capacity: true,
        petType: true,
        ChatLog: {
          select: {
            rating: true
          }
        },
        bookings: {
          where: {
            OR: [
              { checkIn: { lt: exitDate }, checkOut: { gt: entryDate } }
            ]
          },
          select: {
            id: true
          }
        }
      }
    });

    // Filter rooms where overlapping bookings < capacity
    const availableRooms = allRooms.filter(room => {
      const overlappingBookings = room.bookings.length;
      return overlappingBookings < room.capacity;
    })

    const formattedRooms = await Promise.all(
      availableRooms.map(async (r) => {
        const totalBookings = r.bookings.length;
        const totalReviews = r.ChatLog.length;
        const ratings = r.ChatLog.map(c => c.rating ?? 5);
        const avgRating = ratings.length
          ? ratings.reduce((a, b) => a + b, 0) / ratings.length
          : 5;

        return {
          image: r.picture,
          roomId: r.id,
          reviewStar: avgRating,
          forWhich: r.petType,
          price: r.price,
          size: totalBookings,
          maxsize: r.capacity,
          commentPages: Math.ceil(totalReviews / 3),
        };
      })
    );

    res.status(200).json({ success: true, data: formattedRooms });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getAllRoomsWithReviews = async (req, res) => { //requirement: 9
  try {
    const rooms = await prisma.room.findMany({
      select: {
        id: true,
        picture: true,
        price: true,
        capacity: true,
        petType: true,
        ChatLog: {
          select: {
            rating: true,
            review: true
          }
        }
        
      },
    });

    if (!rooms || rooms.length === 0) {
      return res.status(200).json({ success: false, msg: "No rooms found" });
    }
    

    const formattedRooms = await Promise.all(
    rooms.map(async (r) => {
    const totalReviews = r.ChatLog.length;
    const ratings = r.ChatLog.map(c => c.rating ?? 5);
    const avgRating = ratings.length
      ? ratings.reduce((a, b) => a + b, 0) / ratings.length
      : 5;

    let entryDate = new Date(); 
    let exitDate = new Date(entryDate);
    exitDate.setDate(exitDate.getDate() + 1);

    const count = await overlappingRoom(r.id, entryDate, exitDate);
    return {
      image: r.picture,
      roomId: r.id,
      reviewStar: avgRating,
      forWhich: r.petType,
      price: r.price,
      size: count,
      maxsize: r.capacity,
      commentPages: Math.ceil(totalReviews / 3),
    };
  })
);


    res.status(200).json({ success: true, data: formattedRooms });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getRoomReviews = async (req, res) => {
  //requirement: 5
  try {
    const { roomId, star, NSP } = req.query;
    const page = Number(NSP) || 1;
    const take = 3;
    const skip = (page - 1) * take;

    if (!roomId) {
      return res
        .status(400)
        .json({ success: false, msg: "roomId is required" });
    }
    const reviews = await prisma.chatLog.findMany({
      where: {
        roomId: Number(roomId),
        review: { not: null },
        rating: star ? { equals: Number(star) } : undefined,
      },
      skip,
      take,
      select: {
        id: true,
        review: true,
        rating: true,
        review_date: true,
        customer: {
          include: {
            user: {
              select: {
                user_name: true,
              },
            },
          },
        },
      },
    });

    if (!reviews || reviews.length === 0) {
      return res.status(200).json({ success: false, msg: "No reviews found" });
    }

    const formattedReviews = reviews.map((r) => ({
      id: r.id,
      commenter_name: r.customer?.name || "Anonymous",
      comment_detail: r.review,
      comment_star: r.rating,
    }));

    res.status(200).json({ success: true, data: formattedReviews });
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
  getRoomStatus,
  getRoomReviews,
  getAvailableRooms,
  getAllRoomsWithReviews,
};
