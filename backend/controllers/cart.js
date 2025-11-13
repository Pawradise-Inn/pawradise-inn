const prisma = require("../prisma/prisma");
const { isReservableRoom } = require("./logics/bookedRoom");
const { isReservableService } = require("./logics/bookedService");
const { isValidToCreate } = require("./logics/booking");
const { sendErrorResponse, sendSuccessResponse } = require("../utils/responseHandler");

// GET /cart - load or create current user's cart with items
const getCart = async (req, res) => {
  try {
    const customerId = req.user.roleId;
    if (!customerId) {
      return sendErrorResponse(res, 401, "UNAUTHORIZED", "Please log in to view your cart");
    }

    // Ensure a cart exists (one active cart per customer)
    let cart = await prisma.cart.findFirst({
      where: { customerId },
      include: {
        cartRooms: {
          include: {
            room: true,
            pet: true,
          },
        },
        cartServices: {
          include: {
            service: true,
            pet: true,
          },
        },
      },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { customerId },
        include: {
          cartRooms: true,
          cartServices: true,
        },
      });
    }

    return sendSuccessResponse(
      res,
      200,
      "LOADED_SUCCESSFULLY",
      "Cart loaded",
      cart
    );
  } catch (err) {
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_LOAD",
      "Unable to load your cart. Please refresh and try again"
    );
  }
};

// PATCH /cart/rooms/:id/selected - toggle selection for room item
const toggleCartRoomSelection = async (req, res) => {
  try {
    const customerId = req.user.roleId;
    if (!customerId) {
      return sendErrorResponse(res, 401, "UNAUTHORIZED", "Please log in to modify your cart");
    }
    const { id } = req.params;
    const { selected } = req.body || {};
    if (typeof selected !== "boolean") {
      return sendErrorResponse(res, 400, "MISSING_FIELDS", "Please provide a boolean 'selected'");
    }
    const item = await prisma.cartRoom.findUnique({ where: { id: Number(id) }, include: { cart: true } });
    if (!item || item.cart.customerId !== customerId) {
      return sendErrorResponse(res, 404, "NOT_FOUND", "Cart item not found");
    }
    const updated = await prisma.cartRoom.update({ where: { id: item.id }, data: { selected } });
    //return sendSuccessResponse(res, 200, "UPDATED_SUCCESSFULLY", "Selection updated", updated);
  } catch (err) {
    return sendErrorResponse(res, 500, "UNABLE_TO_UPDATE", "Unable to update selection. Please try again");
  }
};

// PATCH /cart/services/:id/selected - toggle selection for service item
const toggleCartServiceSelection = async (req, res) => {
  try {
    const customerId = req.user.roleId;
    if (!customerId) {
      return sendErrorResponse(res, 401, "UNAUTHORIZED", "Please log in to modify your cart");
    }
    const { id } = req.params;
    const { selected } = req.body || {};
    if (typeof selected !== "boolean") {
      return sendErrorResponse(res, 400, "MISSING_FIELDS", "Please provide a boolean 'selected'");
    }
    const item = await prisma.cartService.findUnique({ where: { id: Number(id) }, include: { cart: true } });
    if (!item || item.cart.customerId !== customerId) {
      return sendErrorResponse(res, 404, "NOT_FOUND", "Cart item not found");
    }
    const updated = await prisma.cartService.update({ where: { id: item.id }, data: { selected } });
    return sendSuccessResponse(res, 200, "UPDATED_SUCCESSFULLY", "Selection updated", updated);
  } catch (err) {
    return sendErrorResponse(res, 500, "UNABLE_TO_UPDATE", "Unable to update selection. Please try again");
  }
};

// POST /cart/rooms - add a room booking draft to cart
const addRoomToCart = async (req, res) => {
  try {
    const customerId = req.user.roleId;
    if (!customerId) {
      return sendErrorResponse(res, 401, "UNAUTHORIZED", "Please log in to add to cart");
    }

    const { roomId, petId, checkIn, checkOut } = req.body || {};
    if (!roomId || !petId || !checkIn || !checkOut) {
      return sendErrorResponse(
        res,
        400,
        "MISSING_FIELDS",
        "roomId, petId, checkIn and checkOut are required"
      );
    }

    // Validate pet belongs to this customer
    const pet = await prisma.pet.findFirst({ where: { id: Number(petId), customerId } });
    if (!pet) {
      return sendErrorResponse(res, 404, "PET_NOT_FOUND", "Selected pet could not be found");
    }

    // Validate room exists
    const room = await prisma.room.findUnique({ where: { id: Number(roomId) } });
    if (!room) {
      return sendErrorResponse(res, 404, "ROOM_NOT_FOUND", "Selected room could not be found");
    }

    // Make sure a cart exists
    const cart = await prisma.cart.upsert({
      where: {
        // emulate single cart by customer using composite unique via findFirst+create fallback
        // Prisma needs a unique field; fall back to find/create earlier if necessary
        id: (await prisma.cart.findFirst({ where: { customerId } }))?.id || -1,
      },
      update: {},
      create: { customerId },
    }).catch(async () => {
      // If upsert failed due to invalid where, just create/get first
      const existing = await prisma.cart.findFirst({ where: { customerId } });
      return existing ?? (await prisma.cart.create({ data: { customerId } }));
    });

    await isReservableRoom(room.id, pet.id, checkIn, checkOut, customerId);

    const created = await prisma.cartRoom.create({
      data: {
        cartId: cart.id,
        roomId: Number(roomId),
        petId: Number(petId),
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        selected: false,
      },
      include: { room: true, pet: true },
    });

    return sendSuccessResponse(
      res,
      201,
      "CREATED_SUCCESSFULLY",
      "Room added to cart",
      created
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
      "Unable to add room booking. Please try again"
    );
  }
};

// POST /cart/services - add a service booking draft to cart
const addServiceToCart = async (req, res) => {
  try {
    const customerId = req.user.roleId;
    if (!customerId) {
      return sendErrorResponse(res, 401, "UNAUTHORIZED", "Please log in to add to cart");
    }

    const { serviceId, petId, scheduled } = req.body || {};
    if (!serviceId || !petId || !scheduled) {
      return sendErrorResponse(
        res,
        400,
        "MISSING_FIELDS",
        "serviceId, petId and scheduled are required"
      );
    }

    // Validate pet belongs to this customer
    const pet = await prisma.pet.findFirst({ where: { id: Number(petId), customerId } });
    if (!pet) {
      return sendErrorResponse(res, 404, "PET_NOT_FOUND", "Selected pet could not be found");
    }

    // Validate service exists
    const service = await prisma.service.findUnique({ where: { id: Number(serviceId) } });
    if (!service) {
      return sendErrorResponse(res, 404, "SERVICE_NOT_FOUND", "Selected service could not be found");
    }

    // Ensure cart exists
    const cart = await prisma.cart.findFirst({ where: { customerId } })
      .then(async (c) => c ?? (await prisma.cart.create({ data: { customerId } })));

    await isReservableService(serviceId, petId, scheduled, customerId);
    
    const created = await prisma.cartService.create({
      data: {
        cartId: cart.id,
        serviceId: Number(serviceId),
        petId: Number(petId),
        scheduled: new Date(scheduled),
        selected: false,
      },
      include: { service: true, pet: true },
    });

    return sendSuccessResponse(
      res,
      201,
      "CREATED_SUCCESSFULLY",
      "Service added to cart",
      created
    );
  } catch (err) {
    if (err.code === "PET_NOT_SUIT") {
      return sendErrorResponse(
        res,
        409,
        "OPERATION_NOT_ALLOWED",
        "This service is not suitable for your pet"
      );
    }
    if (err.code === "SERVICE_FULL") {
      return sendErrorResponse(
        res,
        409,
        "OPERATION_NOT_ALLOWED",
        "This service is fully booked for the selected time"
      );
    }
    if (err.code === "SERVICE_DUPLICATE") {
      return sendErrorResponse(
        res,
        409,
        "DUPLICATE_BOOKING",
        "Your pet already has this service booked for this time"
      );
    }
    if (err.code === "PET_NOT_FREE") {
      return sendErrorResponse(
        res,
        409,
        "OPERATION_NOT_ALLOWED",
        "Your pet has another service scheduled at this time"
      );
    }
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_SAVE",
      "Unable to add service booking. Please try again"
    );
  }
};

// DELETE /cart/rooms/:id - remove a room draft from cart
const deleteCartRoom = async (req, res) => {
  try {
    const customerId = req.user.roleId;
    if (!customerId) {
      return sendErrorResponse(res, 401, "UNAUTHORIZED", "Please log in to modify your cart");
    }

    const { id } = req.params;
    const item = await prisma.cartRoom.findUnique({ where: { id: Number(id) }, include: { cart: true } });
    if (!item || item.cart.customerId !== customerId) {
      return sendErrorResponse(res, 404, "NOT_FOUND", "Cart item not found");
    }

    await prisma.cartRoom.delete({ where: { id: item.id } });

    return sendSuccessResponse(res, 200, "DELETED_SUCCESSFULLY", "Item removed from cart", {});
  } catch (err) {
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_DELETE",
      "Unable to remove item from cart. Please try again"
    );
  }
};

// DELETE /cart/services/:id - remove a service draft from cart
const deleteCartService = async (req, res) => {
  try {
    const customerId = req.user.roleId;
    if (!customerId) {
      return sendErrorResponse(res, 401, "UNAUTHORIZED", "Please log in to modify your cart");
    }

    const { id } = req.params;
    const item = await prisma.cartService.findUnique({ where: { id: Number(id) }, include: { cart: true } });
    if (!item || item.cart.customerId !== customerId) {
      return sendErrorResponse(res, 404, "NOT_FOUND", "Cart item not found");
    }

    await prisma.cartService.delete({ where: { id: item.id } });

    return sendSuccessResponse(res, 200, "DELETED_SUCCESSFULLY", "Item removed from cart", {});
  } catch (err) {
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_DELETE",
      "Unable to remove item from cart. Please try again"
    );
  }
};

const checkItem = async (req, res) => {
    const customerId = req.user.roleId;
    try {
      const cart = await isValidToCreate(customerId);
      return sendSuccessResponse(
        res,
        200,
        "CHECK_SUCCESSFULLY",
        "Check items successfully",
        cart
      );
    }catch (err){
      return sendErrorResponse(
        res,
        500,
        "UNABLE_TO_CHECK",
        "Unable to check items from cart. Please try again"
      );
    }
}

module.exports = {
  getCart,
  addRoomToCart,
  addServiceToCart,
  deleteCartRoom,
  deleteCartService,
  toggleCartRoomSelection,
  toggleCartServiceSelection,
  checkItem
};