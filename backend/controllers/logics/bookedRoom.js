const prisma = require('../../prisma/prisma');
const {getRoomCap} = require('./room');

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
    const count = await prisma.bookedRoom.findMany({
        where: {
            roomId: roomId,
            checkIn: {lte: new Date(checkOut)},
            checkOut: {gte: new Date(checkIn)}
        }
    });
    return count.length;
};

const duplicatedRoom = async(roomId, petId, checkIn, checkOut)=>{
    const overlapping = await prisma.bookedRoom.findMany({
        where: {
            roomId: roomId,
            petId: petId,
            checkIn: { lte: new Date(checkOut) },
            checkOut: { gte: new Date(checkIn) }
        },
        select: {
            checkIn: true,
            checkOut: true
        }
    });
    return overlapping;
}

const isFreeThisTime = async(petId, checkIn, checkOut)=>{
    const pet = await prisma.bookedRoom.findFirst({
        where: {
            petId: petId,
            checkIn: { lte: new Date(checkOut) },
            checkOut: { gte: new Date(checkIn) } 
        }
    });
    return !pet;
}

const createBookedRoomWithCondition = async (roomId, petId, bookingId, checkIn, checkOut) => {
    const count = await overlappingRoom(roomId, checkIn, checkOut);
    const cap = await getRoomCap(roomId);

    if (count >= cap) {
        const error = new Error('Room is not available');
        error.code = 'ROOM_FULL';
        throw error;
    }

    const overlapping = await duplicatedRoom(roomId, petId, checkIn, checkOut);
    if (overlapping.length > 0) {
        const error = new Error('Room is not available for the selected dates');
        error.duplicatedDates = overlapping.map(b => ({
            checkIn: b.checkIn,
            checkOut: b.checkOut
        }));
        error.code = 'ROOM_DUPLICATE';
        throw error;
    }

    const pet = await isFreeThisTime(petId, checkIn, checkOut);
    if(!pet){
        const error = new Error('Pet is not available for the selected dates');
        error.code = 'PET_NOT_FREE';
        throw error;
    }

    const bookedRoom = await prisma.bookedRoom.create({
        data: {
            roomId,
            petId,
            bookingId,
            checkIn: new Date(checkIn),
            checkOut: new Date(checkOut)
        }
    });

    return bookedRoom;
};

module.exports = {
    findBookedRoomById,
    overlappingRoom,
    duplicatedRoom,
    createBookedRoomWithCondition
};