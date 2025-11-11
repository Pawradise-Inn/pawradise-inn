const prisma = require("../prisma/prisma");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../utils/responseHandler");
const {
  findRoomById,
  // addRoomPictures,
  // removeRoomPictures,
} = require("./logics/room");
const { overlappingRoom } = require("./logics/bookedRoom");

const getRooms = async (req, res) => {
  let options = {};

  //Select filter
  if (req.query.filter) {
    let where = JSON.parse(req.query.filter);
    if (where.name) {
      where.name.mode = "insensitive";
    }
    options.where = where;
  }

  //Select fields
  if (req.query.select) {
    const fields = req.query.select.split(",");
    options.select = fields.reduce((acc, field) => {
      acc[field.trim()] = true;
      return acc;
    }, {});
  }

  //Sort
  if (req.query.sort) {
    const sortFields = req.query.sort.split(",");
    options.orderBy = sortFields.map((sortField) => {
      const [field, direction = "asc"] = sortField.split(":");
      const dir = direction.trim().toLowerCase() === "desc" ? "desc" : "asc";
      return { [field.trim()]: dir };
    });
  } else {
    options.orderBy = { id: "asc" };
  }

  //Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  options.skip = startIndex;
  options.take = limit;

  try {
    const total = await prisma.room.count({
      where: options.where,
    });
    if (total === 0) {
      return sendErrorResponse(
        res,
        404,
        "NO_DATA_FOUND",
        "No rooms are available at the moment"
      );
    }

    const rooms = await prisma.room.findMany(options);

    const pagination = {};
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit: limit,
      };
    }
    return sendSuccessResponse(
      res,
      200,
      "LOADED_SUCCESSFULLY",
      "Rooms loaded successfully",
      rooms,
      { count: total }
    );
  } catch (err) {
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_LOAD",
      "Unable to load rooms. Please refresh and try again"
    );
  }
};

const getRoom = async (req, res) => {
  try {
    const roomId = req.params.id;
    const room = await findRoomById(roomId);
    if (!room)
      return sendErrorResponse(res, 404, "ROOM_NOT_FOUND", "Room not found");
    return sendSuccessResponse(
      res,
      200,
      "LOADED_SUCCESSFULLY",
      "Room details loaded",
      room
    );
  } catch (err) {
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_LOAD",
      "Unable to load room details. Please refresh and try again"
    );
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
        petType: type,
      },
    });
    return sendSuccessResponse(
      res,
      201,
      "CREATED_SUCCESSFULLY",
      "Room created successfully",
      room
    );
  } catch (err) {
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_SAVE",
      "Unable to create room. Please try again"
    );
  }
};

const updateRoom = async (req, res) => {
  try {
    const roomId = req.params.id;
    const dataToUpdate = {};
    if (req.body.price !== undefined) dataToUpdate.price = req.body.price;
    if (req.body.name !== undefined) dataToUpdate.name = req.body.name;
    if (req.body.petType !== undefined) dataToUpdate.petType = req.body.petType;
    if (req.body.capacity !== undefined)
      dataToUpdate.capacity = req.body.capacity;
    if (req.body.picture !== undefined) dataToUpdate.picture = req.body.picture;

    if (Object.keys(dataToUpdate).length === 0) {
      return sendErrorResponse(
        res,
        400,
        "MISSING_FIELDS",
        "Please provide details to update"
      );
    }

    const room = await prisma.room.update({
      where: { id: Number(roomId) },
      data: dataToUpdate,
    });
    return sendSuccessResponse(
      res,
      200,
      "UPDATED_SUCCESSFULLY",
      "Room updated successfully",
      room
    );
  } catch (err) {
    if (err.code === "P2025")
      return sendErrorResponse(res, 404, "ROOM_NOT_FOUND", "Room not found");
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_UPDATE",
      "Unable to update room. Please try again"
    );
  }
};

const deleteRoom = async (req, res) => {
  //requirement: 17;
  try {
    const roomId = req.params.id;
    const room = await prisma.room.delete({
      where: { id: Number(roomId) },
    });
    return sendSuccessResponse(
      res,
      200,
      "DELETED_SUCCESSFULLY",
      "Room deleted successfully",
      {}
    );
  } catch (err) {
    if (err.code === "P2025")
      return sendErrorResponse(
        res,
        404,
        "ROOM_NOT_FOUND",
        "Room not found or has already been deleted"
      );
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_DELETE",
      "Unable to delete room. Please try again"
    );
  }
};

const addPicturesToRoom = async (req, res) => {
  try {
    const roomId = Number(req.params.id);
    // const room = await addRoomPictures(roomId, pictures);
    const room = await prisma.room.update({
      where: { id: Number(roomId) },
      data: {
        picture: req.body.picture,
      },
    });
    return sendSuccessResponse(
      res,
      200,
      "UPDATED_SUCCESSFULLY",
      "Room picture updated successfully",
      room
    );
  } catch (err) {
    if (err.code === "P2025")
      return sendErrorResponse(res, 404, "ROOM_NOT_FOUND", "Room not found");
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_UPDATE",
      "Unable to add pictures to room. Please try again"
    );
  }
};

const deletePicturesFromRoom = async (req, res) => {
  try {
    const roomId = Number(req.params.id);
    // const room = await removeRoomPictures(roomId, pictures);
    const room = await prisma.room.update({
      where: { id: Number(roomId) },
      data: {
        picture: "https://storage.googleapis.com/paw_image/rooms/unnamed.jpg",
      },
    });
    return sendSuccessResponse(
      res,
      200,
      "UPDATED_SUCCESSFULLY",
      "Room picture removed successfully",
      room
    );
  } catch (err) {
    if (err.code === "P2025")
      return sendErrorResponse(res, 404, "ROOM_NOT_FOUND", "Room not found");
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_UPDATE",
      "Unable to remove pictures from room. Please try again"
    );
  }
};

const getRoomStatus = async (req, res) => {
  //requirement: 8
  try {
    const id = Number(req.params.id);
    const checkIn = new Date(req.query.entry_date);
    const checkOut = new Date(req.query.exit_date);

    const room = await findRoomById(id);
    if (!room)
      return sendErrorResponse(
        res,
        404,
        "ROOM_NOT_FOUND",
        "This room could not be found"
      );

    const count = await overlappingRoom(id, checkIn, checkOut);
    return sendSuccessResponse(
      res,
      200,
      "LOADED_SUCCESSFULLY",
      "Room availability checked",
      null,
      { count }
    );
  } catch (err) {
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_LOAD",
      "Unable to check room availability. Please refresh and try again"
    );
  }
};

const getAvailableRooms = async (req, res) => {
  //requirement: 7

  try {
    const { checkIn, checkOut } = req.query;
    const entryDate = new Date(checkIn);
    const exitDate = new Date(checkOut);
    const allRooms = await prisma.room.findMany({
      select: {
        id: true,
        picture: true,
        price: true,
        capacity: true,
        petType: true,
        ChatLog: {
          where: {
            show: true,
          },
          select: {
            rating: true,
          },
        },
        bookings: {
          where: {
            OR: [{ checkIn: { lt: exitDate }, checkOut: { gt: entryDate } }],
          },
          select: {
            id: true,
          },
        },
      },
    });

    // Filter rooms where overlapping bookings < capacity
    const availableRooms = allRooms.filter((room) => {
      const overlappingBookings = room.bookings.length;
      return overlappingBookings < room.capacity;
    });

    const formattedRooms = await Promise.all(
      availableRooms.map(async (r) => {
        let totalReviews = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, total: 0 };
        r.ChatLog.forEach((c) => {
          totalReviews[c.rating] += 1;
          totalReviews["total"] += 1;
        });

        const ratings = r.ChatLog.map((c) => c.rating ?? 5);
        const avgRating = ratings.length
          ? ratings.reduce((a, b) => a + b, 0) / ratings.length
          : 0;

        const count = await overlappingRoom(r.id, entryDate, exitDate);
        const status = count >= r.capacity ? "full" : "available";

        return {
          image: r.picture,
          id: r.id,
          reviewStar: avgRating.toFixed(2),
          forWhich: r.petType,
          price: r.price,
          size: count,
          maxsize: r.capacity,
          commentPages: totalReviews,
          status: status,
        };
      })
    );

    return sendSuccessResponse(
      res,
      200,
      "LOADED_SUCCESSFULLY",
      "Available rooms loaded",
      formattedRooms
    );
  } catch (err) {
    console.error(err);
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_LOAD",
      "Unable to load available rooms. Please refresh and try again"
    );
  }
};

const getRoomsWithPagination = async (req, res) => {
  //requirement: 9
  try {
    const rooms = await prisma.room.findMany({
      select: {
        id: true,
        picture: true,
        price: true,
        capacity: true,
        petType: true,
        ChatLog: {
          where: {
            show: true,
          },
          select: {
            rating: true,
            review: true,
          },
        },
      },
      orderBy: [{ petType: "asc" }, { id: "asc" }],
    });

    if (!rooms || rooms.length === 0) {
      return sendErrorResponse(res, 404, "NO_DATA_FOUND", "No rooms found");
    }

    const formattedRooms = await Promise.all(
      rooms.map(async (r) => {
        let totalReviews = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, total: 0 };
        r.ChatLog.forEach((c) => {
          totalReviews[c.rating] += 1;
          totalReviews["total"] += 1;
        });

        const ratings = r.ChatLog.map((c) => c.rating ?? 5);
        const avgRating = ratings.length
          ? ratings.reduce((a, b) => a + b, 0) / ratings.length
          : 0;

        let entryDate = new Date();
        let exitDate = new Date(entryDate);
        exitDate.setDate(exitDate.getDate() + 1);

        const count = await overlappingRoom(r.id, entryDate, exitDate);

        const status = count >= r.capacity ? "full" : "available";
        return {
          image: r.picture,
          id: r.id,
          reviewStar: avgRating.toFixed(2),
          forWhich: r.petType,
          price: r.price,
          size: count,
          maxsize: r.capacity,
          commentPages: totalReviews,
          status: status,
        };
      })
    );

    return sendSuccessResponse(
      res,
      200,
      "LOADED_SUCCESSFULLY",
      "Rooms loaded",
      formattedRooms
    );
  } catch (err) {
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_LOAD",
      "Unable to load rooms. Please refresh and try again"
    );
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
      return sendErrorResponse(
        res,
        400,
        "MISSING_FIELDS",
        "Please select a room to view reviews"
      );
    }
    const reviews = await prisma.chatLog.findMany({
      where: {
        roomId: Number(roomId),
        review: { not: null },
        rating: star ? { equals: Number(star) } : undefined,
        show: true,
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

    const formattedReviews = reviews.map((r) => ({
      id: r.id,
      commenter_name: r.customer?.user.user_name || "Anonymous",
      comment_detail: r.review,
      comment_star: r.rating,
    }));

    return sendSuccessResponse(
      res,
      200,
      "LOADED_SUCCESSFULLY",
      "Room reviews loaded",
      formattedReviews
    );
  } catch (err) {
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_LOAD",
      "Unable to load room reviews. Please refresh and try again"
    );
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
  getAvailableRooms,
  getRoomsWithPagination,
  getRoomReviews,
};
