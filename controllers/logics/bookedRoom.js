const prisma = require('.../prisma/prisma');

const findBookedRoomById = async(id)=>{
    const bookedId = Number(id);
    if(isNaN(bookedId)){
        throw new Error("Invalid booked room ID");
    }
    const bookedRoom = await prisma.bookedRoom.findUnique({
        where: {id: bookedId}
    });

    return bookedRoom;
};

const overlappingRoom = async(roomId, checkIn, checkOut)=>{
    const count = await prisma.bookedRoom.count({
        where: {roomId: roomId},
        AND: [
            {checkIn: {lte: new Date(checkOut)}},
            {checkOut: {gte: new Date(checkIn)}}
        ]
    });
    return count;
};

module.exports = {
    findBookedRoomById,
    overlappingRoom
};