const prisma = require("../prisma/prisma");
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
      return res
        .status(404)
        .json({ success: false, msg: "No Service bookings found" });
    res.status(200).json({ success: true, data: bookedServices });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: "Unable to fetch service bookings. Please try again later" 
    });
  }
};



const getBookedService = async (req, res) => {
  //requirement: 13
  try {
    const bookedServiceId = Number(req.params.id);
    const bookedService = await findBookedServiceById(bookedServiceId);
    if (!bookedService)
      return res
        .status(404)
        .json({ success: false, msg: "Service booking not found" });
    res.status(200).json({ success: true, data: bookedService });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: "Unable to fetch booking details. Please try again later" 
    });
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
    res.status(201).json({ success: true, data: bookedService });
  } catch (err) {
    if (err.code === "PET_NOT_SUIT") {
      return res.status(409).json({
        success: false, 
        message: "This service is not suitable for your pet"
      });
    }
    if (err.code === "SERVICE_FULL") {
      return res.status(409).json({
        success: false, 
        message: "This service is fully booked for the selected time"
      });
    }
    if (err.code === "SERVICE_DUPLICATE") {
      return res.status(409).json({
        success: false, 
        message: "Your pet already has this service booked for this time"
      });
    }
    if (err.code === "PET_NOT_FREE") {
      return res.status(409).json({
        success: false, 
        message: "Your pet has another service scheduled at this time"
      });
    }
    res.status(500).json({ success: false, message: "Unable to create booking. Please try again later" });
  }
};

const updateBookedService = async (req, res) => {
  try {
    const bookedId = Number(req.params.id);
    const scheduled = req.body.scheduled;
    if (!scheduled)
      return res.status(400).json({ success: false, msg: "Please select a new appointment time" });
    const updateScheduled = new Date(scheduled);
    const bookedService = await findBookedServiceById(bookedId);
    const count = await overlappingService(
      bookedService.serviceId,
      updateScheduled
    );
    if (count >= 3) {
      return res
        .status(409)
        .json({ success: false, msg: "This time slot is fully booked. Please choose another time" });
    }
    const check = await duplicatedService(
      bookedService.serviceId,
      bookedService.petId,
      updateScheduled
    );
    if (check)
      return res.status(409).json({
        success: false,
        msg: "Your pet had already schedule in this day",
      });
    const updateBookedService = await prisma.bookedService.update({
      where: { id: bookedId },
      data: { scheduled: updateScheduled },
    });
    res.status(200).json({ success: true, data: updateBookedService });
  } catch (err) {
    if (err.code === "P2025")
      return res.status(404).json({
        success: false,
        msg: "Booked service is not found or already deleted",
      });
    res.status(500).json({ 
      success: false, 
      message: "Unable to update booking. Please try again later" 
    });
  }
};

const deleteBookedService = async (req, res) => {
  try {
    const bookedServiceId = Number(req.params.id);
    const bookedService = await prisma.bookedService.delete({
      where: { id: bookedServiceId },
    });
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    if (err.code === "P2025")
      return res.status(404).json({
        success: false,
        msg: "Booked service is not found or already deleted",
      });
    res.status(500).json({ 
      success: false, 
      message: "Unable to cancel service booking. Please try again later" 
    });
  }
};

const getTodayService = async (req, res) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const bookedServices = await prisma.bookedService.findMany({
      // just comment for a test data in postgres
      //   where: {
      //     scheduled: {
      //       gte: todayStart,
      //       lte: todayEnd
      //     }
      //   },
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
    }));

    res.status(200).json({ success: true, data: formattedServices });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: "Unable to fetch today's services. Please try again later" 
    });
  }
};

module.exports = {
  getBookedServices,
  getBookedService,
  createBookedService,
  updateBookedService,
  deleteBookedService,
  getTodayService,
};
