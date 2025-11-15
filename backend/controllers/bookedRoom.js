const prisma = require("../prisma/prisma");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../utils/responseHandler");
const {
  findBookedRoomById,
  overlappingRoom,
  duplicatedRoom,
  createBookedRoomWithCondition,
} = require("./logics/bookedRoom");
const { getRoomCap } = require("./logics/room");

const getBookedRooms = async (req, res) => {
  try {
    const bookedRooms = await prisma.bookedRoom.findMany({
      include: {
        room: true,
        pet: true,
        booking: true,
      }
    });

    if (bookedRooms.length === 0)
      return sendErrorResponse(
        res,
        404,
        "NO_DATA_FOUND",
        "No room bookings found"
      );

    const formattedRooms = bookedRooms.map((br) => ({
      bookingId: br.bookingId,
      roomId: br.roomId,
      roomImage: br.room.picture ?? null,
      petId: br.petId,
      petName: br.pet?.name ?? null,
      checkIn: br.checkIn,
      checkOut: br.checkOut,
      petStatus: br.pet?.status ?? null,
      roomName: br.room.name,
      roomStatus: br.status
    }));
    return sendSuccessResponse(
      res,
      200,
      "LOADED_SUCCESSFULLY",
      "Room bookings loaded",
      formattedRooms
    );
  } catch (err) {
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_LOAD",
      "Unable to load room bookings. Please refresh and try again"
    );
  }
};

const getBookedRoom = async (req, res) => {
  try {
    const bookedRoomId = req.params.id;
    const bookedRoom = await findBookedRoomById(bookedRoomId);
    if (!bookedRoom)
      return sendErrorResponse(
        res,
        404,
        "BOOKING_NOT_FOUND",
        "Room booking not found"
      );
    return sendSuccessResponse(
      res,
      200,
      "LOADED_SUCCESSFULLY",
      "Room booking details loaded",
      bookedRoom
    );
  } catch (err) {
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_LOAD",
      "Unable to load booking details. Please refresh and try again"
    );
  }
};

const createBookedRoom = async (req, res) => {
  try {
    const customerId = req.user.roleId;
    const { roomId, pet_name, bookingId, checkIn, checkOut } = req.body;
    const pet = await prisma.pet.findFirst({
      where: {
        name: pet_name,
        customerId: customerId,
      },
    });
    const bookedRoom = await createBookedRoomWithCondition(
      roomId,
      pet.id,
      bookingId,
      checkIn,
      checkOut
    );
    return sendSuccessResponse(
      res,
      201,
      "BOOKING_CREATED",
      "Room booking created successfully",
      bookedRoom
    );
  } catch (err) {
    if (err.code === "PET_NOT_SUIT") {
      return sendErrorResponse(
        res,
        409,
        "OPERATION_NOT_ALLOWED",
        "This room type is not suitable for your pet"
      );
    }
    if (err.code === "BOOKING_DUPLICATE") {
      return sendErrorResponse(
        res,
        409,
        "DUPLICATE_BOOKING",
        "Your pet already has a booking for these dates"
      );
    }
    if (err.code === "ROOM_FULL") {
      return sendErrorResponse(
        res,
        409,
        "OPERATION_NOT_ALLOWED",
        "This room is fully booked for the selected dates"
      );
    }
    console.log(err);
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_SAVE",
      "Unable to create room booking. Please try again"
    );
  }
};

const updateBookedRoom = async (req, res) => {
  try {
    const bookedId = Number(req.params.id);
    const { checkIn, checkOut, status } = req.body;
    
    // Build update data object
    const dataToUpdate = {};
    
    // If dates are provided, validate and add them
    if (checkIn || checkOut) {
      if (!checkIn || !checkOut) {
        return sendErrorResponse(
          res,
          400,
          "MISSING_FIELDS",
          "Please provide both check-in and check-out dates"
        );
      }

      const bookedRoom = await findBookedRoomById(bookedId);
      const count = await overlappingRoom(bookedRoom.roomId, checkIn, checkOut);
      const cap = await getRoomCap(bookedRoom.roomId);
      if (count >= cap) {
        return sendErrorResponse(
          res,
          409,
          "OPERATION_NOT_ALLOWED",
          "This room is not available for the selected dates"
        );
      }

      const check = await duplicatedRoom(bookedRoom.petId, checkIn, checkOut);
      if (check.length > 0) {
        return sendErrorResponse(
          res,
          409,
          "DUPLICATE_BOOKING",
          "Your pet already has a booking during these dates"
        );
      }

      dataToUpdate.checkIn = new Date(checkIn);
      dataToUpdate.checkOut = new Date(checkOut);
    }
    
    // If status is provided, add it to update
    if (status) {
      const validStatuses = ["PENDING", "CONFIRMED", "CHECKED_IN", "CHECKED_OUT", "CANCELLED"];
      if (!validStatuses.includes(status)) {
        return sendErrorResponse(
          res,
          400,
          "INVALID_STATUS",
          "Invalid status. Must be one of: PENDING, CONFIRMED, CHECKED_IN, CHECKED_OUT, CANCELLED"
        );
      }
      dataToUpdate.status = status;
    }
    
    // Check if there's anything to update
    if (Object.keys(dataToUpdate).length === 0) {
      return sendErrorResponse(
        res,
        400,
        "MISSING_FIELDS",
        "Please provide fields to update (checkIn, checkOut, or status)"
      );
    }

    const updatedBookedRoom = await prisma.bookedRoom.update({
      where: { id: bookedId },
      data: dataToUpdate,
    });
    
    return sendSuccessResponse(
      res,
      200,
      "BOOKING_UPDATED",
      "Room booking updated successfully",
      updatedBookedRoom
    );
  } catch (err) {
    if (err.code === "P2025")
      return sendErrorResponse(
        res,
        404,
        "BOOKING_NOT_FOUND",
        "Room booking not found or already deleted"
      );
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_UPDATE",
      "Unable to update booking. Please try again"
    );
  }
};

const deleteBookedRoom = async (req, res) => {
  try {
    const bookedRoomId = Number(req.params.id);
    
    // First, fetch the booked room to check cancellation deadline
    const bookedRoom = await prisma.bookedRoom.findUnique({
      where: { id: bookedRoomId },
    });

    if (!bookedRoom) {
      return sendErrorResponse(
        res,
        404,
        "BOOKING_NOT_FOUND",
        "Room booking not found or already deleted"
      );
    }

    // Check if cancellation deadline has passed
    // Users can cancel if today is before the next day after check-in
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of today
    
    const checkInDate = new Date(bookedRoom.checkIn);
    checkInDate.setHours(0, 0, 0, 0); // Set to start of check-in day
    
    // Calculate cancellation deadline: check-in date + 1 day
    const cancellationDeadline = new Date(checkInDate);
    cancellationDeadline.setDate(cancellationDeadline.getDate() - 1);
    
    // If today is on or after the cancellation deadline, reject cancellation
    if (today >= cancellationDeadline) {
      return sendErrorResponse(
        res,
        403,
        "CANCELLATION_DEADLINE_PASSED",
        "Cannot cancel booking. The cancellation deadline has passed. You can only cancel bookings before the next day after the check-in date."
      );
    }

    // If deadline hasn't passed, proceed with deletion
    await prisma.bookedRoom.delete({
      where: { id: bookedRoomId },
    });
    
    return sendSuccessResponse(
      res,
      200,
      "DELETED_SUCCESSFULLY",
      "Room booking cancelled successfully",
      {}
    );
  } catch (err) {
    if (err.code === "P2025")
      return sendErrorResponse(
        res,
        404,
        "BOOKING_NOT_FOUND",
        "Room booking not found or already deleted"
      );
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_DELETE",
      "Unable to cancel booking. Please try again"
    );
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
      roomImage: br.room.picture ?? null,
      petId: br.petId,
      petName: br.pet?.name ?? null,
      checkIn: br.checkIn,
      checkOut: br.checkOut,
      petStatus: br.pet?.status ?? null,
      roomName: br.room.name,
      roomStatus:br.status
    }));

    return sendSuccessResponse(
      res,
      200,
      "LOADED_SUCCESSFULLY",
      "Today's room bookings loaded",
      formattedRooms
    );
  } catch (err) {
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_LOAD",
      "Unable to load today's room bookings. Please refresh and try again"
    );
  }
};

const getTodayCheckOuts = async (req, res) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const bookedRooms = await prisma.bookedRoom.findMany({
      where: {
        checkOut: {
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
      roomImage: br.room.picture ?? null,
      petId: br.petId,
      petName: br.pet?.name ?? null,
      checkIn: br.checkIn,
      checkOut: br.checkOut,
      petStatus: br.pet?.status ?? null,
      roomName: br.room.name,
      roomStatus:br.status
    }));

    return sendSuccessResponse(
      res,
      200,
      "LOADED_SUCCESSFULLY",
      "Today's check-out rooms loaded",
      formattedRooms
    );
  } catch (err) {
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_LOAD",
      "Unable to load today's check-out rooms. Please refresh and try again"
    );
  }
};

module.exports = {
  getBookedRooms,
  getBookedRoom,
  createBookedRoom,
  updateBookedRoom,
  deleteBookedRoom,
  getTodayRooms,
  getTodayCheckOuts,
};
