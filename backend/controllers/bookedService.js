const prisma = require("../prisma/prisma");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../utils/responseHandler");
const {
  findBookedServiceById,
  overlappingService,
  duplicatedService,
  createBookedServiceWithCondition,
} = require("./logics/bookedService");

const getBookedServices = async (req, res) => {
  try {
    const bookedServices = await prisma.bookedService.findMany();
    if (bookedServices.length === 0)
      return sendErrorResponse(
        res,
        404,
        "NO_DATA_FOUND",
        "No service bookings found"
      );
    return sendSuccessResponse(res, 200, "LOADED_SUCCESSFULLY", "Service bookings loaded", bookedServices);
  } catch (err) {
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_LOAD",
      "Unable to load service bookings. Please refresh and try again"
    );
  }
};

const getBookedService = async (req, res) => {
  //requirement: 13
  try {
    const bookedServiceId = Number(req.params.id);
    const bookedService = await findBookedServiceById(bookedServiceId);
    if (!bookedService)
      return sendErrorResponse(
        res,
        404,
        "BOOKING_NOT_FOUND",
        "Service booking not found"
      );
    return sendSuccessResponse(res, 200, "LOADED_SUCCESSFULLY", "Service booking details loaded", bookedService);
  } catch (err) {
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_LOAD",
      "Unable to load booking details. Please refresh and try again"
    );
  }
};

const createBookedService = async (req, res) => {
  try {
    const { service_name, pet_name, scheduled, bookingId } = req.body;
    const service = await prisma.service.findFirst({
      where: { name: service_name },
    });
    const pet = await prisma.pet.findFirst({
      where: { name: pet_name },
    });
    const bookedService = await createBookedServiceWithCondition(
      service.id,
      pet.id,
      bookingId,
      scheduled
    );
    return sendSuccessResponse(
      res,
      201,
      "BOOKING_CREATED",
      "Service booking created successfully",
      bookedService
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
      "Unable to create service booking. Please try again"
    );
  }
};

const updateBookedService = async (req, res) => {
  try {
    const bookedId = Number(req.params.id);
    const { scheduled, status } = req.body;
    
    // Build update data object
    const dataToUpdate = {};
    
    // If scheduled time is provided, validate and add it
    if (scheduled) {
      const updateScheduled = new Date(scheduled);
      const bookedService = await findBookedServiceById(bookedId);
      
      const count = await overlappingService(
        bookedService.serviceId,
        updateScheduled
      );
      if (count >= 3) {
        return sendErrorResponse(
          res,
          409,
          "OPERATION_NOT_ALLOWED",
          "This time slot is fully booked. Please choose another time"
        );
      }
      
      const check = await duplicatedService(
        bookedService.serviceId,
        bookedService.petId,
        updateScheduled
      );
      if (check)
        return sendErrorResponse(
          res,
          409,
          "DUPLICATE_BOOKING",
          "Your pet already has a service scheduled for this day"
        );
      
      dataToUpdate.scheduled = updateScheduled;
    }
    
    // If status is provided, add it to update
    if (status) {
      const validStatuses = ["PENDING", "CONFIRMED", "IN_PROGRESS", "COMPLETED", "CANCELLED"];
      if (!validStatuses.includes(status)) {
        return sendErrorResponse(
          res,
          400,
          "INVALID_STATUS",
          "Invalid status. Must be one of: PENDING, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED"
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
        "Please provide fields to update (scheduled or status)"
      );
    }
    
    const updatedBookedService = await prisma.bookedService.update({
      where: { id: bookedId },
      data: dataToUpdate,
    });
    
    return sendSuccessResponse(
      res,
      200,
      "BOOKING_UPDATED",
      "Service booking updated successfully",
      updatedBookedService
    );
  } catch (err) {
    if (err.code === "P2025")
      return sendErrorResponse(
        res,
        404,
        "BOOKING_NOT_FOUND",
        "Service booking not found or already deleted"
      );
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_UPDATE",
      "Unable to update booking. Please try again"
    );
  }
};
const deleteBookedService = async (req, res) => {
  try {
    const bookedServiceId = Number(req.params.id);
    
    // First, fetch the booked service to check cancellation deadline
    const bookedService = await prisma.bookedService.findUnique({
      where: { id: bookedServiceId },
    });

    if (!bookedService) {
      return sendErrorResponse(
        res,
        404,
        "BOOKING_NOT_FOUND",
        "Service booking not found or already deleted"
      );
    }

    // Check if cancellation deadline has passed
    // Users can cancel if today is before the next day after scheduled date
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of today
    
    const scheduledDate = new Date(bookedService.scheduled);
    scheduledDate.setHours(0, 0, 0, 0); // Set to start of scheduled day
    
    // Calculate cancellation deadline: scheduled date + 1 day
    const cancellationDeadline = new Date(scheduledDate);
    cancellationDeadline.setDate(cancellationDeadline.getDate() - 1);
    
    // If today is on or after the cancellation deadline, reject cancellation
    if (today >= cancellationDeadline) {
      return sendErrorResponse(
        res,
        403,
        "CANCELLATION_DEADLINE_PASSED",
        "Cannot cancel booking. The cancellation deadline has passed. You can only cancel bookings before the next day after the scheduled date."
      );
    }

    // If deadline hasn't passed, proceed with deletion
    await prisma.bookedService.delete({
      where: { id: bookedServiceId },
    });
    
    return sendSuccessResponse(
      res,
      200,
      "DELETED_SUCCESSFULLY",
      "Service booking cancelled successfully",
      {}
    );
  } catch (err) {
    if (err.code === "P2025")
      return sendErrorResponse(
        res,
        404,
        "BOOKING_NOT_FOUND",
        "Service booking not found or already deleted"
      );
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_DELETE",
      "Unable to cancel service booking. Please try again"
    );
  }
};

const getTodayServices = async (req, res) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const bookedServices = await prisma.bookedService.findMany({
      // just comment for a test data in postgres
      where: {
        scheduled: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
      include: {
        service: true,
        pet: true,
        booking: true,
      },
    });

    const formattedServices = bookedServices.map((bs) => ({
      bookingId: bs.booking_id,
      serviceId: bs.serviceId,
      serviceName: bs.service.name,
      serviceImage: bs.service.picture ?? null,
      petId: bs.petId,
      petName: bs.pet?.name ?? null,
      timeBooked: bs.scheduled,
      petStatus: bs.pet?.status ?? null,
    }));

    return sendSuccessResponse(res, 200, "LOADED_SUCCESSFULLY", "Today's services loaded", formattedServices);
  } catch (err) {
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_LOAD",
      "Unable to load today's services. Please refresh and try again"
    );
  }
};

module.exports = {
  getBookedServices,
  getBookedService,
  createBookedService,
  updateBookedService,
  deleteBookedService,
  getTodayServices,
};
