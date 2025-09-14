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
}

module.exports = {
    findBookedServiceById,
    overlappingService,
    isDuplicatedBooking
};