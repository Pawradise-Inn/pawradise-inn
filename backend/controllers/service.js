const prisma = require("../prisma/prisma");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../utils/responseHandler");
const {
  findServiceById,
  //      addServicePictures,
  //       removeServicePictures
} = require("./logics/service");
const { overlappingService } = require("./logics/bookedService");

const getServices = async (req, res) => {
  let options = {};

  //Select Filter
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
    const total = await prisma.service.count({
      where: options.where,
    });
    if (total === 0) {
      return sendErrorResponse(
        res,
        404,
        "NO_DATA_FOUND",
        "No services are available at the moment"
      );
    }

    const services = await prisma.service.findMany(options);

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
      "Services loaded",
      services,
      { count }
    );
  } catch (err) {
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_LOAD",
      "Unable to load services. Please refresh and try again"
    );
  }
};

const getService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const service = await findServiceById(serviceId);
    if (!service)
      return sendErrorResponse(
        res,
        404,
        "SERVICE_NOT_FOUND",
        "Service not found"
      );
    return sendSuccessResponse(
      res,
      200,
      "LOADED_SUCCESSFULLY",
      "Service details loaded",
      service
    );
  } catch (err) {
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_LOAD",
      "Unable to load service details. Please refresh and try again"
    );
  }
};

const createService = async (req, res) => {
  //requirement: 15
  try {
    const { name, price, petType, picture } = req.body;
    const service = await prisma.service.create({
      data: {
        name: name,
        price: price,
        petType: petType,
        picture: picture
          ? picture
          : "https://storage.googleapis.com/paw_image/service/unnamed.jpg",
      },
    });
    return sendSuccessResponse(
      res,
      201,
      "CREATED_SUCCESSFULLY",
      "Service created successfully",
      service
    );
  } catch (err) {
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_SAVE",
      "Unable to create service. Please try again"
    );
  }
};

const updateService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const dataToUpdate = {};
    if (req.body.name !== undefined) dataToUpdate.name = req.body.name;
    if (req.body.price !== undefined) dataToUpdate.price = req.body.price;
    if (req.body.petType !== undefined) {
      const petTypes = Array.isArray(req.body.petType)
        ? req.body.petType.map((p) => p.toUpperCase())
        : [req.body.petType.toUpperCase()];
      dataToUpdate.petType = petTypes;
    }
    if (req.body.picture !== undefined) dataToUpdate.picture = req.body.picture;

    if (Object.keys(dataToUpdate).length === 0)
      return sendErrorResponse(
        res,
        400,
        "MISSING_FIELDS",
        "Please provide details to update"
      );

    const service = await prisma.service.update({
      where: { id: Number(serviceId) },
      data: dataToUpdate,
    });
    return sendSuccessResponse(
      res,
      200,
      "UPDATED_SUCCESSFULLY",
      "Service updated successfully",
      service
    );
  } catch (err) {
    if (err.code === "P2025")
      return sendErrorResponse(
        res,
        404,
        "SERVICE_NOT_FOUND",
        "Service not found"
      );
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_UPDATE",
      "Unable to update service. Please try again"
    );
  }
};

const deleteService = async (req, res) => {
  //requirement: 15
  try {
    const serviceId = req.params.id;
    const service = await prisma.service.delete({
      where: { id: Number(serviceId) },
    });
    return sendSuccessResponse(
      res,
      200,
      "DELETED_SUCCESSFULLY",
      "Service deleted successfully",
      {}
    );
  } catch (err) {
    if (err.code === "P2025")
      return sendErrorResponse(
        res,
        404,
        "SERVICE_NOT_FOUND",
        "Service not found or already deleted"
      );
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_DELETE",
      "Unable to delete service. Please try again"
    );
  }
};

const addPicturesToService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    // const service = await addServicePictures(serviceId, pictures);
    const service = await prisma.service.update({
      where: { id: Number(serviceId) },
      data: {
        picture: req.body.picture,
      },
    });
    return sendSuccessResponse(
      res,
      200,
      "UPDATED_SUCCESSFULLY",
      "Service picture updated successfully",
      service
    );
  } catch (err) {
    if (err.code === "P2025")
      return sendErrorResponse(
        res,
        404,
        "SERVICE_NOT_FOUND",
        "Service not found"
      );
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_UPDATE",
      "Unable to add pictures to service. Please try again"
    );
  }
};

const deletePicturesFromService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    // const service = await removeServicePictures(serviceId, pictures);
    const service = await prisma.service.update({
      where: { id: Number(serviceId) },
      data: {
        picture: "https://storage.googleapis.com/paw_image/service/unnamed.jpg",
      },
    });
    return sendSuccessResponse(
      res,
      200,
      "UPDATED_SUCCESSFULLY",
      "Service picture removed successfully",
      service
    );
  } catch (err) {
    if (err.code === "P2025")
      return sendErrorResponse(
        res,
        404,
        "SERVICE_NOT_FOUND",
        "Service not found"
      );
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_UPDATE",
      "Unable to remove pictures from service. Please try again"
    );
  }
};

const getServicesWithPagination = async (req, res) => {
  //requirement: 1
  try {
    const services = await prisma.service.findMany({
      include: {
        reviews: true,
      },
    });

    const formattedService = await Promise.all(
      services.map(async (s) => {
        let totalReviews = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, total: 0 };
        s.reviews.forEach((c) => {
          totalReviews[c.rating] += 1;
          totalReviews["total"] += 1;
        });

        const ratings = s.reviews.map((c) => c.rating ?? 5);
        const avgRating = ratings.length
          ? ratings.reduce((a, b) => a + b, 0) / ratings.length
          : 0;

        return {
          image: s.picture,
          name: s.name,
          reviewStar: avgRating,
          forWhich: s.petType.map((p) => p),
          price: s.price,
          commentPages: totalReviews
        };
      })
    );

    return sendSuccessResponse(
      res,
      200,
      "LOADED_SUCCESSFULLY",
      "Services loaded",
      formattedService
    );
  } catch (err) {
    console.error(err);
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_LOAD",
      "Unable to load services. Please refresh and try again"
    );
  }
};

const getServiceStatus = async (req, res) => {
  //requirement: 6
  try {
    const name = req.query.name;
    const schedule = new Date(req.query.entry_date_with_time);
    const service = await prisma.service.findFirst({
      where: { name: name },
    });
    if (!service) {
      return sendErrorResponse(
        res,
        404,
        "SERVICE_NOT_FOUND",
        "Service not found"
      );
    }

    const count = await overlappingService(service.id, schedule);
    return sendSuccessResponse(
      res,
      200,
      "LOADED_SUCCESSFULLY",
      "Service availability checked",
      null,
      { count }
    );
  } catch (err) {
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_LOAD",
      "Unable to check service availability. Please refresh and try again"
    );
  }
};

const getServiceReviews = async (req, res) => {
  //requirement: 5
  try {
    const { name, star, NSP } = req.query;
    const page = Number(NSP) || 1;
    const take = 3;
    const skip = (page - 1) * take;

    if (!name) {
      return sendErrorResponse(
        res,
        400,
        "MISSING_FIELDS",
        "Please provide a service name to view reviews"
      );
    }
    const service = await prisma.service.findFirst({
      where: { name: name },
    });

    const reviews = await prisma.chatLog.findMany({
      where: {
        serviceId: service.id,
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
      "Service reviews loaded",
      formattedReviews
    );
  } catch (err) {
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_LOAD",
      "Unable to load service reviews. Please refresh and try again"
    );
  }
};

module.exports = {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
  addPicturesToService,
  deletePicturesFromService,
  getServiceStatus,
  getServicesWithPagination,
  getServiceReviews,
};
