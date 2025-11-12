const prisma = require("../prisma/prisma");
const { createCareWithCheck } = require("./logics/care");
const { sendErrorResponse, sendSuccessResponse } = require("../utils/responseHandler");

const register = async (req, res) => {
  try {
    const customerId = Number(req.user.roleId); // from protect middleware
    // find the customer record that belongs to this user
    const customer = await prisma.customer.findUnique({
      where: { id: customerId }, // requires Customer.userId to be unique
    });
    if (!customer) {
      return sendErrorResponse(
        res,
        400,
        "NOT_FOUND",
        "Customer profile not found"
      );
    }

    const { name, sex, age, type, status, breed, disease, allergic, picture } =
      req.body;

    const pet = await prisma.pet.create({
      data: {
        name,
        sex,
        age: Number(age),
        type: type ? type : "DOG",
        status: "IDLE",
        breed: type ? breed : null,
        disease: disease ? disease : [],
        allergic: allergic ? allergic : [],
        customerId: customer.id,
        picture: picture
          ? picture
          : "https://storage.googleapis.com/paw_image/unnamed.jpg",
      },
    });
    return sendSuccessResponse(res, 201, "PET_REGISTERED", "Your pet has been registered successfully", pet);
  } catch (err) {
    if (err.code === "P2003") {
      return sendErrorResponse(
        res,
        400,
        "INVALID_DATA",
        "Unable to register pet. Please check your customer information"
      );
    }
    console.error("pet.register:", err);
    return sendErrorResponse(
      res,
      500,
      "SERVER_ERROR",
      "Unable to register your pet. Please try again"
    );
  }
};

const getAllPets = async (req, res) => {
  try {
    const pets = await prisma.pet.findMany({
      include: {
        scheduled: {
          include: {
            service: true,
          },
        },
        stayed: {
          include: {
            room: true,
          },
        },
      },
    });

    // Check if any pets were found
    if (pets.length === 0) {
      return sendErrorResponse(
        res,
        404,
        "NOT_FOUND",
        "No pets found in our system"
      );
    }
    return sendSuccessResponse(res, 200, "LOADED_SUCCESSFULLY", "All pets loaded", pets);
  } catch (err) {
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_LOAD",
      "Unable to load pets. Please refresh and try again"
    );
  }
};

const getPet = async (req, res) => {
  //Both
  try {
    const pet = await prisma.pet.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        scheduled: {
          include: {
            service: true,
          },
        },
        stayed: {
          include: {
            room: true,
          },
        },
      },
    });
    if (!pet) {
      return sendErrorResponse(res, 404, "NOT_FOUND", "Pet not found");
    }
    return sendSuccessResponse(res, 200, "LOADED_SUCCESSFULLY", "Pet details loaded", pet);
  } catch (err) {
    console.error("pet.getPet:", err);
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_LOAD",
      "Unable to load pet details. Please refresh and try again"
    );
  }
};

const updatePet = async (req, res) => {
  try {
    const pet = await prisma.pet.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    if (!pet) {
      return sendErrorResponse(res, 404, "PET_NOT_FOUND", "Pet not found");
    }
    return sendSuccessResponse(res, 200, "UPDATED_SUCCESSFULLY", "Pet information updated successfully", pet);
  } catch (err) {
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_UPDATE",
      "Unable to update pet information. Please try again"
    );
  }
};

const updatePetStatus = async (req, res) => {
  try {
    const staffId = req.user.roleId;
    const petId = Number(req.params.id);
    const { status, type, bookedId } = req.body;

    if (!status) {
      return sendErrorResponse(
        res,
        400,
        "MISSING_FIELDS",
        "Please provide a status for the pet"
      );
    }

    if (!type || !bookedId) {
      return sendErrorResponse(
        res,
        400,
        "MISSING_FIELDS",
        "Please provide a type (room or service) with the id"
      );
    }

    const pet = await prisma.pet.update({
      where: { id: petId },
      data: { status },
    });
    console.log(pet);
    const log = await createCareWithCheck(
      bookedId,
      type,
      petId,
      staffId,
      new Date(),
      status
    );
    return sendSuccessResponse(res, 200, "PET_STATUS_UPDATED", "Pet status updated successfully", pet);
  } catch (err) {
    if (err.code === "P2025") {
      return sendErrorResponse(res, 404, "PET_NOT_FOUND", "Pet not found");
    }
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_UPDATE",
      "Unable to update pet status. Please try again"
    );
  }
};

const deletePet = async (req, res) => {
  try {
    const pet = await prisma.pet.delete({
      where: { id: Number(req.params.id) },
    });
    if (!pet) {
      return sendErrorResponse(res, 404, "PET_NOT_FOUND", "Pet not found");
    }
    return sendSuccessResponse(res, 200, "DELETED_SUCCESSFULLY", "Pet deleted successfully", {});
  } catch (err) {
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_DELETE",
      "Unable to delete pet. Please try again"
    );
  }
};

const getCustomerPets = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const fields = req.query.fields
      ? req.query.fields.split(",")
      : [
        "id",
        "name",
        "breed",
        "sex",
        "age",
        "type",
        "status",
        "breed",
        "disease",
        "allergic",
        "picture",
      ];

    const select = {};
    fields.forEach((f) => (select[f] = true));

    const pets = await prisma.pet.findMany({
      where: { customerId: userId },
      select,
    });

    return sendSuccessResponse(res, 200, "LOADED_SUCCESSFULLY", "Customer pets loaded", pets);
  } catch (err) {
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_LOAD",
      "Unable to load pets. Please refresh and try again"
    );
  }
};

const getCustomerPetNamesWithAvailable = async (req, res) => {
  //requirement: 4
  try {
    const customerId = Number(req.query.customerId);
    const bookingDate = new Date();

    const pets = await prisma.pet.findMany({
      where: {
        customerId: customerId,
        stayed: {
          none: {
            checkIn: { lte: bookingDate },
            checkOut: { gte: bookingDate },
          },
        },
      },
      select: {
        id: true,
        name: true,
        type: true,
      },
    });
    if (!pets || pets.length === 0) {
      return sendErrorResponse(
        res,
        404,
        "NO_DATA_FOUND",
        "No available pets found for booking"
      );
    }
    return sendSuccessResponse(res, 200, "LOADED_SUCCESSFULLY", "Available pets loaded", pets);
  } catch (err) {
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_LOAD",
      "Unable to check pet availability. Please refresh and try again"
    );
  }
};

const getPetTypes = async (req, res) => {
  try {
    return sendSuccessResponse(
      res,
      200,
      "LOADED_SUCCESSFULLY",
      "Pet types loaded successfully",
      ["DOG", "CAT", "MOUSE", "RABBIT", "BIRD"]
    );
  } catch (err) {
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_LOAD",
      "Could not load pet types. Please try again"
    );
  }
};

const getPetBookings = async (req, res) => {
  try {
    const petId = Number(req.params.id);

    // Verify pet exists
    const pet = await prisma.pet.findUnique({
      where: { id: petId },
    });

    if (!pet) {
      return sendErrorResponse(
        res,
        404,
        "NOT_FOUND",
        "Pet not found"
      );
    }

    // Get all booked services for this pet
    const bookedServices = await prisma.bookedService.findMany({
      where: { petId: petId },
      include: {
        service: true,
        pet: true,
      },
      orderBy: {
        id: 'desc',
      },
    });

    // Get all booked rooms for this pet
    const bookedRooms = await prisma.bookedRoom.findMany({
      where: { petId: petId },
      include: {
        room: true,
        pet: true,
      },
      orderBy: {
        id: 'desc',
      },
    });

    return sendSuccessResponse(
      res,
      200,
      "BOOKINGS_RETRIEVED",
      "Pet bookings retrieved successfully",
      {
        petId: petId,
        petName: pet.name,
        services: bookedServices,
        rooms: bookedRooms,
      }
    );
  } catch (err) {
    console.error("pet.getPetBookings:", err);
    return sendErrorResponse(
      res,
      500,
      "SERVER_ERROR",
      "Unable to retrieve pet bookings"
    );
  }
};

module.exports = {
  register,
  getPet,
  updatePet,
  updatePetStatus,
  deletePet,
  getCustomerPets,
  getCustomerPetNamesWithAvailable,
  getAllPets,
  getPetTypes,
  getPetBookings,
};
