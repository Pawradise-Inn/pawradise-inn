const prisma = require("../../prisma/prisma");

const findBookedServiceById = async (id) => {
  const bookedId = Number(id);
  if (isNaN(bookedId)) {
    throw new Error("Invalid booked service ID");
  }
  const bookedService = await prisma.bookedService.findUnique({
    where: { id: bookedId },
  });

  return bookedService;
};

const overlappingService = async (serviceId, scheduled) => {
  const count = await prisma.bookedService.count({
    where: {
      serviceId: serviceId,
      scheduled: new Date(scheduled),
      status: {
        not : "CANCELLED"
      }
    }
  });

  return count;
};

const duplicatedService = async (serviceId, petId, scheduled) => {
  const startOfDay = new Date(scheduled);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(scheduled);
  endOfDay.setHours(23, 59, 59, 999);

  const overlapping = await prisma.bookedService.findFirst({
    where: {
      serviceId: serviceId,
      petId: petId,
      scheduled: {
        gte: startOfDay,
        lte: endOfDay,
      },
      status: {
        not : "CANCELLED"
      }
    },
  });

  return overlapping;
};

const isFreeThisTime = async (petId, scheduled) => {
  const pet = await prisma.bookedService.findFirst({
    where: {
      petId: petId,
      scheduled: new Date(scheduled),
    },
  });

  return !pet;
};

const isSuitable = async(serviceId, petId)=>{
    const service = await prisma.service.findUnique({
        where: {id: Number(serviceId)}
    })
    const pet = await prisma.pet.findUnique({
        where: {id: Number(petId)}
    })
    return service.petType.includes(pet.type);
}

const isReservableService = async(serviceId, petId, scheduled) => {
  const count = await overlappingService(serviceId, scheduled);

  if (count >= 3) {
    const error = new Error("This service is fully booked for the selected date and time.");
    error.code = "SERVICE_FULL";
    throw error;
  }

  const duplicated = await duplicatedService(serviceId, petId, scheduled);
  if (duplicated) {
    const error = new Error("This pet has already booked this service on the selected date.");
    error.code = "SERVICE_DUPLICATE";
    throw error;
  }

  const free = await isFreeThisTime(petId, scheduled);
  if (!free) {
    const error = new Error("This pet already has another service booked at the selected date and time.");
    error.code = "PET_NOT_FREE";
    throw error;
  }

  const isSuit = await isSuitable(serviceId, petId);
  if (!isSuit) {
    const error = new Error("This pet is not eligible for the selected service.");
    error.code = "PET_NOT_SUIT";
    throw error;
  }

  return true;
}

const createBookedServiceWithCondition = async (serviceId, petId, bookingId, scheduled) => {
  const count = await overlappingService(serviceId, scheduled);

  if (count >= 3) {
    const error = new Error("This service is fully booked for the selected date and time.");
    error.code = "SERVICE_FULL";
    throw error;
  }

  const duplicated = await duplicatedService(serviceId, petId, scheduled);
  if (duplicated) {
    const error = new Error("This pet has already booked this service on the selected date.");
    error.code = "SERVICE_DUPLICATE";
    throw error;
  }

  const free = await isFreeThisTime(petId, scheduled);
  if (!free) {
    const error = new Error("This pet already has another service booked at the selected date and time.");
    error.code = "PET_NOT_FREE";
    throw error;
  }

  const isSuit = await isSuitable(serviceId, petId);
  if (!isSuit) {
    const error = new Error("This pet is not eligible for the selected service.");
    error.code = "PET_NOT_SUIT";
    throw error;
  }

  const bookedService = await prisma.bookedService.create({
    data: {
      serviceId: serviceId,
      petId: petId,
      scheduled: new Date(scheduled),
      booking_id: bookingId,
    },
  });

  return bookedService;
};

module.exports = {
  findBookedServiceById,
  overlappingService,
  duplicatedService,
  createBookedServiceWithCondition,
  isReservableService
};
