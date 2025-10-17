const prisma = require("../prisma/prisma");
const {
  findBookedRoomById,
  overlappingRoom,
  duplicatedRoom,
  createBookedRoomWithCondition,
} = require("./logics/bookedRoom");
const { getRoomCap } = require("./logics/room");

const getBookedRooms = async (req, res) => {
  try {
    const bookedRooms = await prisma.bookedRoom.findMany();
    if (bookedRooms.length === 0)
      return res
        .status(404)
        .json({ success: false, msg: "No room bookings found" });
    res.status(200).json({ success: true, data: bookedRooms });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message, message: "Unable to fetch room bookings. Please try again later" });
  }
};

const getBookedRoom = async (req, res) => {
  try {
    const bookedRoomId = req.params.id;
    const bookedRoom = await findBookedRoomById(bookedRoomId);
    if (!bookedRoom)
      return res
        .status(404)
        .json({ success: false, msg: "Room booking not found" });
    res.status(200).json({ success: true, data: bookedRoom });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message, message: "Unable to fetch booking details. Please try again later" });
  }
};

const createBookedRoom = async (req, res) => {
  try {
    const { roomId, pet_name, bookingId, checkIn, checkOut } = req.body;
    // const checkInDate = new Date(checkIn);
    // const checkOutDate = new Date(checkOut);
    const pet = await prisma.pet.findFirst({
      where: { name: pet_name },
    });
    const bookedRoom = await createBookedRoomWithCondition(
      roomId,
      pet.id,
      bookingId,
      checkIn,
      checkOut
    );
    res.status(201).json({ success: true, data: bookedRoom });
  } catch (err) {
    if (err.code === "PET_NOT_SUIT") {
      return res.status(409).json({
        success: false, 
        message: "This room type is not suitable for your pet"
      });
    }
    if (err.code === "BOOKING_DUPLICATE") {
      return res.status(409).json({
        success: false, 
        message: "Your pet already has a booking for these dates"
      });
    }
    if (err.code === "ROOM_FULL") {
      return res.status(409).json({
        success: false, 
        message: "This room is fully booked for the selected dates"
      });
    }
    console.log(err)
    //   if (err.duplicatedDates) {
    //     return res.status(400).json({
    //       success: false,
    //       message: err.message,
    //       duplicatedDates: err.duplicatedDates,
    //     });
    //   }
    res.status(500).json({ 
      success: false, 
      message: "Unable to create booking. Please try again later" 
    });
  }
};

const updateBookedRoom = async (req, res) => {
  try {
    const bookedId = Number(req.params.id);
    const { checkIn, checkOut } = req.body;
    if ((!checkIn, !checkOut)) {
      return res.status(400).json({ success: false, msg: "Please provide check-in and check-out dates" });
    }

    const bookedRoom = await findBookedRoomById(bookedId);
    const count = await overlappingRoom(bookedRoom.roomId, checkIn, checkOut);
    const cap = await getRoomCap(roomId);
    if (count >= cap) {
      res.status(409).json({ success: false, msg: "This room is not available for the selected dates" });
    }

    const check = await duplicatedRoom(
      bookedRoom.petId,
      checkIn,
      checkOut
    );
    if (check.length > 0) {
      return res
        .status(409)
        .json({ success: false, msg: "Your pet already has a booking during these dates." });
    }

    const updateBookedRoom = await prisma.bookedRoom.update({
      where: { id: bookedId },
      data: {
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
      },
    });
    res.status(200).json({ success: true, data: updateBookedRoom });
  } catch (err) {
    if (err.code === "P2025")
      return res
        .status(404)
        .json({
          success: false,
          msg: "Booked room is not found or already deleted",
        });
    res.status(500).json({ 
      success: false, 
      message: "Unable to update booking. Please try again later" 
    });
  }
};

const deleteBookedRoom = async (req, res) => {
  try {
    const bookedRoomId = req.params.id;
    const bookedRoom = await prisma.bookedRoom.delete({
      where: { id: Number(bookedRoomId) },
    });
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    if (err.code === "P2025")
      return res
        .status(404)
        .json({
          success: false,
          msg: "Booked room is not found or already deleted",
        });
    res.status(500).json({ 
      success: false, 
      message: "Unable to cancel booking. Please try again later" 
    });
  }
};

const getTodayRooms = async (req, res) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const bookedRooms = await prisma.bookedRoom.findMany({
      where: {
        checkIn: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
      include: {
        room: true,
        pet: true,
        booking: true,
      },
    });

    const formattedRooms = bookedRooms.map((br) => ({
      bookingId: br.bookingId,
      roomId: br.roomId,
      roomImage: br.room.picture[0] ?? null,
      petId: br.petId,
      petName: br.pet?.name ?? null,
      checkIn: br.checkIn,
      checkOut: br.checkOut,
      petStatus: br.pet?.status ?? null,
    }));

    res.status(200).json({ success: true, data: formattedRooms });
  } catch (err) {
    res.status(500).json({ success: false, message: "Unable to fetch today's room bookings. Please try again later" });
  }
};

module.exports = {
  getBookedRooms,
  getBookedRoom,
  createBookedRoom,
  updateBookedRoom,
  deleteBookedRoom,
  getTodayRooms,
};
