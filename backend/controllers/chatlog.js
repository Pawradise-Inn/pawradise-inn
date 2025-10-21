const prisma = require("../prisma/prisma");
const { sendErrorResponse, sendSuccessResponse } = require("../utils/responseHandler");

const getChatLogs = async (req, res) => {
  let options = {};

  //wait testing 1
  // if(req.params.serviceId){
  //     query = chatlogs.findMany({
  //         where: {serviceId: Number(req.params.serviceId)},
  //         include: { customer: true, staff: true },
  //         orderBy: { review_date: 'desc' },
  //     });
  // }else if (req.params.roomId){
  //     query = chatlogs.findMany({
  //         where: {
  //             roomId: Number(req.params.roomId),
  //         },
  //         include: { customer: true, staff: true },
  //     });
  // } else if (req.params.customerId && req.user.role === 'STAFF') {
  //     query = chatlogs.findMany({
  //         where: {customerId : Number(req.params.customerId)}
  //     })
  // } else {
  //     query = chatlogs.findMany();
  // }

  //Select filter
  if (req.params.serviceName) {
    try {
      const service = await prisma.service.findFirst({
        where: { name: req.params.serviceName },
      });

      if (!service) {
        return res.status(404).json({ success: false, message: `Service '${req.params.serviceName}' not found.` });
      }

      options.where = { serviceId: service.id };
    } catch (err) {
      return sendErrorResponse(res, 400, "INVALID_DATA", "Invalid service name provided");
    }
  } else if (req.params.roomId) {
    options.where = { roomId: Number(req.params.roomId) };
  }
  if (req.query.filter) {
    let filter = JSON.parse(req.query.filter);
    options.where = { ...options.where, ...filter };

    if (filter.rating) {
      const star = filter.rating;
      if (star === 5) {
        options.where.rating = { gte: 5 };
      } else {
        options.where.rating = { gte: star, lt: star + 1 };
      }
    }

    if (filter.search && filter.search.length > 0) {
        options.where.OR = [
      {
        service: {
          name: {
            contains: filter.search,
            mode: "insensitive",
          },
        },
      },
      {
        room: {
          name: {
            contains: filter.search,
            mode: "insensitive",
          },
        },
      },
    ];
    }
    if (filter.review_date) {
      const date = new Date(filter.review_date);//เช่น "2025-10-21"
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      options.where.review_date = {
        gte: startOfDay,
        lt: endOfDay
      };
    }
    delete options.where.search;
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
  const limit = parseInt(req.query.limit, 10) || 3;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  options.skip = startIndex;
  options.take = limit;

  try {
    const total = await prisma.chatLog.count({
      where: options.where,
    });
    if (total === 0) {
      return sendErrorResponse(res, 404, "NO_REVIEWS_FOUND", "No reviews found matching your criteria");
    }

    options.include = {
      customer: { include: { user: { select: { user_name: true } } } },
      service: { select: {
         name: true,
         picture: true,
      } },
      room: {select:{
        name: true,
        picture: true,
      }},
    };

    const reviews = await prisma.chatLog.findMany(options);
    const formattedReviews = reviews.map((r) => ({
      id: r.id,
      commenter_name: r.customer?.user.user_name || "Anonymous",
      commenter_detail: r.review,
      commenter_star: r.rating,
      serviceName: r.service?.name,
      reviewDate: r.review_date,
      roomName:r.room?.name,
      roomImg: r.room?.picture ?? null,
      serviceImg: r.service?.picture ?? null,
    }));

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
    return sendSuccessResponse(res, 200, "LOADED_SUCCESSFULLY", "Reviews loaded", formattedReviews, { pagination, count: total });
  } catch (err) {
    console.error("🔥 ERROR fetching reviews:", err);
    return sendErrorResponse(res, 500, "UNABLE_TO_LOAD", "Unable to load reviews. Please refresh and try again");
  }
};

const getChatLog = async (req, res) => {
  try {
    const id = req.params.id;
    const chatlog = await prisma.chatLog.findUnique({
      where: { id: Number(id) },
    });

    if (!chatlog) {
      return sendErrorResponse(res, 404, "REVIEW_NOT_FOUND", "This review could not be found");
    }

    return sendSuccessResponse(res, 200, "LOADED_SUCCESSFULLY", "Review details loaded", chatlog);
  } catch (err) {
    return sendErrorResponse(res, 500, "UNABLE_TO_LOAD", "Unable to load review details. Please try again");
  }
};

const createChatLog = async (req, res) => {
  let data = {};
  if (req.body.rating) {
    data.rating = Number(req.body.rating);
  }
  if (req.body.review) {
    data.review = req.body.review;
  }

  if (req.body.serviceId) {
    data.serviceId = Number(req.body.serviceId);
  } else if (req.body.roomId) {
    data.roomId = Number(req.body.roomId);
  }

  try {
    if (!data.serviceId && !data.roomId) {
      return sendErrorResponse(res, 400, "MISSING_FIELDS", "Please select a service or room to review");
    }
    data.customerId = req.user.roleId;
    const existingReview = await prisma.chatLog.findFirst({
      where: {
        customerId: req.user.roleId,
        OR: [{ serviceId: data.serviceId }, { roomId: data.roomId }],
      },
    });

    if (existingReview) {
      if (data.roomId) {
        return sendErrorResponse(res, 409, "DUPLICATE_REVIEW", "You have already reviewed this room");
      } else {
        return sendErrorResponse(res, 409, "DUPLICATE_REVIEW", "You have already reviewed this service");
      }
    }

    const chatlog = await prisma.chatLog.create({ 
      data,
      include: {
        room: true,
        service: true,
        staff: {
          include: {
            user: true
          }
        }
      }
    });

    console.log(chatlog.room)

    let name, image, type;
    if (chatlog.serviceId) {
      name = chatlog.service.name;
      image = chatlog.service.picture;
      type = "service";
    } else if (chatlog.roomId) {
      name = chatlog.roomId;
      image = chatlog.room.picture;
      type = "room";
    }

    chatlog.isRead = chatlog.isRead || !chatlog.staff?.user?.user_name;

    const formatted = {
      id: chatlog.id,
      image: image,
      name: name,
      date: chatlog.review_date,
      nameOfStaffReply: chatlog.staff?.user?.user_name,
      readingStatus: chatlog.isRead,
      type: type,
      rating: chatlog.rating ?? null,
      userReview: chatlog.review ?? null,
      reply: chatlog.reply ?? null,
      review: chatlog.review ?? null,
    };

    return sendSuccessResponse(res, 201, "REVIEW_SUBMITTED", "Thank you for your review", formatted);
  } catch (err) {
    console.log(err.message);
    return sendErrorResponse(res, 500, "SERVER_ERROR", "Unable to submit your review. Please try again");
  }
};

const replyToChatLog = async (req, res) => {
  try {
    const id = req.params.id;
    const staffId = req.user.roleId;
    const reply = req.body.reply;
    if (!reply || !staffId) {
      return sendErrorResponse(res, 400, "MISSING_FIELDS", "Please provide your reply message");
    }

    const chatlog = await prisma.chatLog.update({
      where: { id: Number(id) },
      data: {
        reply: reply,
        staffId: staffId,
        reply_date: new Date(),
      },
    });

    return sendSuccessResponse(res, 200, "REPLY_POSTED", "Your reply has been posted successfully", chatlog);
  } catch (err) {
    return sendErrorResponse(res, 500, "SERVER_ERROR", "Unable to post your reply. Please try again");
  }
};

const updateChatLog = async (req, res) => {
  let dataToUpdate = {};
  if (req.user.role === "CUSTOMER") {
    if (req.body.isRead !== undefined) dataToUpdate.isRead = req.body.isRead;
    if (req.body.review !== undefined) dataToUpdate.review = req.body.review;
    if (req.body.rating !== undefined) dataToUpdate.rating = req.body.rating;
  } else if (req.user.role === "STAFF") {
    if (req.body.reply !== undefined) dataToUpdate.reply = req.body.reply;
    if (req.body.show !== undefined) dataToUpdate.show = req.body.show;
  }
  try {
    const id = req.params.id;

    if (Object.keys(dataToUpdate).length === 0) {
      return sendErrorResponse(res, 400, "MISSING_FIELDS", "No changes were provided to update");
    }

    const chatlog = await prisma.chatLog.update({
      where: { id: Number(id) },
      data: dataToUpdate,
    });

    return sendSuccessResponse(res, 200, "UPDATED_SUCCESSFULLY", "Review updated successfully", chatlog);
  } catch (err) {
    return sendErrorResponse(res, 500, "SERVER_ERROR", "Unable to update review. Please try again");
  }
};

const deleteChatLog = async (req, res) => {
  try {
    const id = req.params.id;
    const chatlog = await prisma.chatLog.delete({
      where: { id: Number(id) },
    });

    return sendSuccessResponse(res, 200, "DELETED_SUCCESSFULLY", "Review deleted successfully", chatlog);
  } catch (err) {
    if (err.code === "P2025") {
      return sendErrorResponse(res, 404, "REVIEW_NOT_FOUND", "This review no longer exists");
    }
    return sendErrorResponse(res, 500, "SERVER_ERROR", "Unable to delete review. Please try again");
  }
};

const getMyreviews = async (req, res) => {
  try {
    const id = req.user.roleId;
    const chatlog = await prisma.chatLog.findMany({
      where: { customerId: id },
      include: {
        staff: {
          include: {
            user: { select: { user_name: true } },
          },
        },
        service: true,
        room: true,
      },
    });

    const formatted = chatlog.map((r) => {
      let name, image, type;
      if (r.service) {
        name = r.service.name;
        image = r.service.picture;
        type = "service";
      } else if (r.room) {
        name = r.room.id;
        image = r.room.picture;
        type = "room";
      }
      r.isRead = r.isRead || !r.staff?.user?.user_name;

      return {
        id: r.id,
        image: image,
        name: name,
        date: r.review_date,
        nameOfStaffReply: r.staff?.user?.user_name,
        readingStatus: r.isRead,
        type: type,
        rating: r.rating ?? null,
        userReview: r.review ?? null,
        reply: r.reply ?? null,
        review: r.review ?? null,
      };
    });

    formatted.sort((a, b) => {
      // Prioritize unread reviews with staff replies
      //   Sort by readingStatus: false first, then true
      if (!a.readingStatus && b.readingStatus) return -1;
      if (a.readingStatus && !b.readingStatus) return 1;

      // Sort by type: rooms first, then services
      if (a.type === "room" && b.type === "service") return 1;
      if (a.type === "service" && b.type === "room") return -1;
      return new Date(b.date) - new Date(a.date);
    });
    // console.log(formatted);
    return sendSuccessResponse(res, 200, "LOADED_SUCCESSFULLY", "Your reviews loaded", formatted);
  } catch (err) {
    return sendErrorResponse(res, 500, "UNABLE_TO_LOAD", "Unable to load your reviews. Please refresh and try again");
  }
};

const getToBeReview = async (req, res) => {
  const customerId = req.user.roleId;
  try {
    const chatlog = await prisma.chatLog.findMany({
      where: {
        customerId: customerId,
      },
      select: {
        serviceId: true,
        roomId: true,
      },
    });

    const serviceDone = [
      ...new Set(chatlog.map((log) => log.serviceId).filter((id) => id)),
    ];
    const roomDone = [
      ...new Set(chatlog.map((log) => log.roomId).filter((id) => id)),
    ];

    const care = await prisma.care.findMany({
      where: {
        pet: {
          customerId: customerId,
        },
        status: {
          in: ["COMPLETED", "CHECKED_OUT"],
        },
      },
      select: {
        date: true,
        staff: {
          select: { user: { select: { user_name: true } } },
        },
        pet: { select: { name: true } },
        bookedRoom: {
          select: { room: { select: { id: true, name: true, picture: true } } },
        },
        bookedService: {
          select: {
            service: { select: { id: true, name: true, picture: true } },
          },
        },
      },
    });

    let roomsToBeReview = new Set();
    let servicesToBeReview = new Set();

    care.forEach((c) => {
      const roomId = c.bookedRoom?.room.id;

      if (roomId && !roomDone.includes(roomId)) {
        roomsToBeReview.add({
          id: roomId,
          pic: c.bookedRoom.room.picture,
          roomName: c.bookedRoom.room.name,
          petName: c.pet.name,
          date: c.date,
          staffName: c.staff.user.user_name,
        });
      }

      const serviceId = c.bookedService?.service.id;
      if (serviceId && !serviceDone.includes(serviceId)) {
        servicesToBeReview.add({
          id: serviceId,
          pic: c.bookedService.service.picture,
          serviceName: c.bookedService.service.name,
          petName: c.pet.name,
          date: c.date,
          staffName: c.staff.user.user_name,
        });
      }
    });

    const waited = {
      rooms: [...roomsToBeReview],
      services: [...servicesToBeReview],
    };

    return sendSuccessResponse(res, 200, "LOADED_SUCCESSFULLY", "Items to review loaded", waited);
  } catch (err) {
    return sendErrorResponse(res, 500, "UNABLE_TO_LOAD", "Unable to load items waiting for review. Please refresh and try again");
  }
};

module.exports = {
  getChatLogs,
  getChatLog,
  createChatLog,
  replyToChatLog,
  deleteChatLog,
  updateChatLog,
  getMyreviews,
  getToBeReview,
};
