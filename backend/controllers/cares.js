const prisma = require("../prisma/prisma");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../utils/responseHandler");
const { createCareWithCheck } = require("./logics/care");

const getCares = async (req, res) => {
  let options = {};
  let check = true;
  if (req.query.filter) {
    let filter = JSON.parse(req.query.filter);
    options.where = { ...options.where, ...filter };
  }

  if (req.query.select) {
    const fields = req.query.select.split(",");
    options.select = fields.reduce((acc, field) => {
      acc[field.trim()] = true;
      return acc;
    }, {});
  }

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

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 3;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  options.skip = startIndex;
  options.take = limit;
  try {
    const total = await prisma.care.count({
      where: options.where,
    });
    if (total === 0) {
      return sendSuccessResponse(
        res,
        200,
        "LOADED_SUCCESSFULLY",
        "No care records found",
        []
      );
    }
    options.include = {
      staff: {
        include: {
          user: {
            select: { user_name: true },
          },
        },
      },
      bookedRoom: {
        include: {
          pet: {
            select: { name: true, customerId: true },
          },
        },
      },
      bookedService: {
        include: {
          pet: {
            select: { name: true, customerId: true },
          },
        },
      },
    };

    const care = await prisma.care.findMany(options);

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
      "Care records loaded",
      care,
      { pagination, count: total }
    );
  } catch (err) {
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_LOAD",
      "Unable to load care records. Please refresh and try again"
    );
  }
};

const getCare = async (req, res) => {
  try {
    const id = req.params.id;
    const care = await prisma.care.findUnique({
      where: { id: Number(id) },
    });

    if (!care)
      return sendErrorResponse(res, 404, "NOT_FOUND", "Care record not found");

    return sendSuccessResponse(
      res,
      200,
      "LOADED_SUCCESSFULLY",
      "Care record details loaded",
      care
    );
  } catch (err) {
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_LOAD",
      "Unable to load care record. Please refresh and try again"
    );
  }
};

const createCare = async (req, res) => {
  let care;
  const petId = req.body.petId;
  try {
    if (req.body.bookedServiceId) {
      care = await createCareWithCheck(
        req.body.bookedServiceId,
        "service",
        petId,
        req.user.roleId,
        new Date(),
        req.body.status
      );
    } else if (req.body.bookedRoomId) {
      care = await createCareWithCheck(
        req.body.bookedRoomId,
        "room",
        petId,
        req.user.roleId,
        new Date(),
        req.body.status
      );
    }
    return sendSuccessResponse(
      res,
      201,
      "CREATED_SUCCESSFULLY",
      "Care record created successfully",
      care
    );
  } catch (err) {
    if (err.code === "INVALID_ROOM_STATUS") {
      return sendErrorResponse(
        res,
        400,
        "INVALID_STATUS",
        "This room status is invalid"
      );
    } else if (err.code === "INVALID_SERVICE_STATUS") {
      return sendErrorResponse(
        res,
        400,
        "INVALID_STATUS",
        "This service status is invalid"
      );
    } else if (err.code === "INVALID_TYPE") {
      return sendErrorResponse(
        res,
        400,
        "INVALID_DATA",
        "This type is invalid"
      );
    }
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_SAVE",
      "Unable to create care record. Please try again"
    );
  }
};

const deleteCare = async (req, res) => {
  try {
    const careId = Number(req.params.id);
    const care = await prisma.care.delete({
      where: { id: careId },
    });
    return sendSuccessResponse(
      res,
      200,
      "DELETED_SUCCESSFULLY",
      "Care record deleted successfully",
      {}
    );
  } catch (err) {
    if (err.code === "P2025")
      return sendErrorResponse(
        res,
        404,
        "NOT_FOUND",
        "Care record not found or already deleted"
      );
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_DELETE",
      "Unable to delete care record. Please try again"
    );
  }
};

module.exports = {
  getCares,
  getCare,
  createCare,
  deleteCare,
};
