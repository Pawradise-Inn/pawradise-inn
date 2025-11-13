const prisma = require("../../prisma/prisma");

const createCareWithCheck = async (bookedId, type, petId, staffId, date, status) => {
    let data = {}
    if (type === "room"){
        data.br_id = bookedId; 
        if (!["IDLE", "CHECKED_IN", "CHECKED_OUT"].includes(status)){
            const error = new Error("Invalid status for room (only IDLE, CHECKED_IN, CHECKED_OUT)");
            error.code = "INVALID_ROOM_STATUS";
            throw error;
        }
        const updatedBookedRoom = await prisma.bookedRoom.update({
            where: { id: bookedId },
            data: {
                status: status
            },
        });
    }else if (type === "service"){
        data.bs_id = bookedId;
        if (!["IDLE", "QUEUE", "IN_PROGESS", "COMPLETED"].includes(status)){
            const error = new Error("Invalid status for service (only IDLE, QUEUE, IN_PROGESS, COMPLETED)");
            error.code = "INVALID_SERVICE_STATUS";
            throw error;
        }
        const updatedBookedService = await prisma.bookedService.update({
            where: { id: bookedId },
            data: {
                status: status
            },
        });
    }else{
        const error = new Error("Invalid booked type (only service or room)");
        error.code = "INVALID_TYPE";
        throw error;
    }
    data.date = new Date(date);
    data.staff_id = staffId;
    data.status = status;
    data.pet_id = petId;
    const care = await prisma.care.create({data});
    return care;
};

module.exports = {
    createCareWithCheck
};