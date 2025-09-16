const prisma = require('../../prisma/prisma');

const findBookedServiceById = async(id)=>{
    const bookedId = Number(id);
    if(isNaN(bookedId)){
        throw new Error("Invalid booked service ID");
    }
    const bookedService = await prisma.bookedService.findUnique({
        where: {id: bookedId}
    });

    return bookedService;
};

const overlappingService = async(serviceId, scheduled)=>{
    const count = await prisma.bookedService.count({
        where: {
            serviceId: serviceId,
            scheduled: new Date(scheduled)
        }
    });

    return count;
}

const isDuplicatedBooking = async(serviceId, petId, scheduled)=>{

    const startOfDay = new Date(scheduled);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(scheduled);
    endOfDay.setHours(23, 59, 59, 999);

    const check = await prisma.bookedService.findFirst({
        where:{
            serviceId: serviceId,
            petId: petId,
            scheduled: {
                gte: startOfDay,
                lte: endOfDay
            }
        }
    });

    return !!existing;
};

const createBookedServiceWithCondition = async (serviceId, petId, bookingId, scheduled) => {
    const count = await overlappingService(serviceId, scheduled);

    if (count >= 3) {
        const error = new Error('Service is not available');
        error.code = 'SERVICE_FULL';
        throw error;
    }

    const overlapping = await duplicatedRoom(roomId, petId, scheduled);
    if (overlapping) {
        const error = new Error('Service is not available for the selected dates');
        error.duplicatedDates = overlapping.map(b => ({
            scheduled: b.scheduled
        }));
        error.code = 'SERVICE_DUPLICATE';
        throw error;
    }

    const bookedService = await prisma.bookedService.create({
        data: {
            roomId,
            petId,
            bookingId,
            scheduled
        }
    });

    return bookedService;
};

module.exports = {
    findBookedServiceById,
    overlappingService,
    isDuplicatedBooking,
    createBookedServiceWithCondition
};