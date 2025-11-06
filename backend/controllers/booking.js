const prisma = require("../prisma/prisma");
const { createBookedRoomWithCondition } = require("./logics/bookedRoom");
const { createBookedServiceWithCondition } = require("./logics/bookedService");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../utils/responseHandler");

const getBookings = async (req, res) => {
  try {
    const { customerId, status, fields } = req.query;
    const where = {};
    let select = undefined;
    if (customerId) where.customerId = parseInt(customerId);
    if (status) where.status = status;
    if (fields) {
      select = {};
      fields.split(",").forEach((f) => {
        select[f.trim()] = true;
      });
    }
    const bookings = await prisma.booking.findMany({
      where,
      select,
    });
    return sendSuccessResponse(
      res,
      200,
      "LOADED_SUCCESSFULLY",
      "Bookings loaded",
      bookings
    );
  } catch (err) {
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_LOAD",
      "Unable to load bookings. Please refresh and try again"
    );
  }
};

const getBooking = async (req, res) => {
  try {
    const bookingId = Number(req.params.id);
    const { fields } = req.query;
    let select = undefined;
    if (fields) {
      select = {};
      fields.split(",").forEach((f) => {
        select[f.trim()] = true;
      });
    }
    const booking = await prisma.booking.findUnique({
      where: {
        id: bookingId,
      },
      select,
    });
    if (!booking) {
      return sendErrorResponse(
        res,
        404,
        "BOOKING_NOT_FOUND",
        "Booking not found"
      );
    }
    return sendSuccessResponse(
      res,
      200,
      "LOADED_SUCCESSFULLY",
      "Booking details loaded",
      booking
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

const updateBookingStatus = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const status = req.body.status;
    const allowedStatuses = ["BOOKED", "CANCELLED", "PENDING"];
    if (!allowedStatuses.includes(status)) {
      return sendErrorResponse(
        res,
        400,
        "INVALID_STATUS",
        "Invalid booking status. Please select a valid status"
      );
    }
    const booking = await prisma.booking.update({
      where: {
        id: Number(bookingId),
      },
      data: {
        status: status,
      },
    });

    return sendSuccessResponse(
      res,
      200,
      "UPDATED_SUCCESSFULLY",
      "Booking status updated successfully",
      booking
    );
  } catch (err) {
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_UPDATE",
      "Unable to update booking status. Please try again"
    );
  }
};

const createBooking = async (req, res) => {
  try {
    const bookingDate = req.body.date;
    const paymentId = req.body.paymentId;
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });
    const booking = await prisma.booking.create({
      data: {
        customerId: req.user.roleId,
        date: new Date(bookingDate),
        status: "PENDING",
        paymentId: new Date(paymentId),
        customerName: user.firstname + " " + user.lastname,
        customerEmail: user.email,
        customerNumber: user.phone_number,
      },
    });
    return sendSuccessResponse(
      res,
      201,
      "BOOKING_CREATED",
      "Your booking has been created successfully",
      booking
    );
  } catch (err) {
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_SAVE",
      "Unable to create your booking. Please try again"
    );
  }
};

const deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking = await prisma.booking.delete({
      where: { id: Number(bookingId) },
    });
    return sendSuccessResponse(
      res,
      200,
      "DELETED_SUCCESSFULLY",
      "Booking deleted successfully"
    );
  } catch (err) {
    if (err.code === "P2025") {
      return sendErrorResponse(
        res,
        404,
        "BOOKING_NOT_FOUND",
        "This booking no longer exists"
      );
    }
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_DELETE",
      "Unable to cancel booking. Please try again"
    );
  }
};

const checkBookingStatus = async (req, res) => {
  const bookingId = Number(req.query.id);
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!booking) {
    return sendErrorResponse(
      res,
      404,
      "BOOKING_NOT_FOUND",
      "Booking not found"
    );
  }
  return sendSuccessResponse(
    res,
    200,
    "LOADED_SUCCESSFULLY",
    "Booking status loaded",
    booking
  );
};

const getMyBookings = async (req, res) => {
  try {
    const customerId = Number(req.user.roleId);
    console.log(customerId);

    const bookings = await prisma.booking.findMany({
      where: { customerId },
      include: {
        booked_room: {
          include: {
            room: true,
            pet: {
              select: {
                name: true,
                type: true,
              },
            },
          },
        },
        booked_service: {
          include: {
            service: {
              select: {
                name: true,
                picture: true,
              },
            },
            pet: true,
          },
        },
      },
    });
    console.log(bookings);

    return sendSuccessResponse(
      res,
      200,
      "LOADED_SUCCESSFULLY",
      "Your bookings loaded successfully",
      bookings
    );
  } catch (err) {
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_LOAD",
      "Unable to load your bookings. Please refresh and try again"
    );
  }
};

const cancelBooking = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const booking = await prisma.booking.findUnique({
      where: {
        id: id,
      },
    });

    if (!booking) {
      return sendErrorResponse(
        res,
        404,
        "BOOKING_NOT_FOUND",
        "Booking not found"
      );
    }

    if (booking.status !== "BOOKED" && booking.status !== "PENDING") {
      return sendErrorResponse(
        res,
        409,
        "OPERATION_NOT_ALLOWED",
        "This booking cannot be cancelled"
      );
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: id },
      data: { status: "CANCELLED" },
    });

    return sendSuccessResponse(
      res,
      200,
      "BOOKING_CANCELLED",
      "Your booking has been cancelled",
      { booking: updatedBooking }
    );
  } catch (err) {
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_UPDATE",
      "Unable to cancel booking. Please try again"
    );
  }
};

module.exports = {
  getBookings,
  getBooking,
  updateBookingStatus,
  createBooking,
  deleteBooking,
  getMyBookings,
  cancelBooking,
};
