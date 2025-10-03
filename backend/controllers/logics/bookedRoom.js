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

const isSuitable = async(roomId, petId)=>{
    const room = await prisma.room.findUnique({
        where: {id: Number(roomId)}
    })
    const pet = await prisma.pet.findUnique({
        where: {id: Number(petId)}
    })
    return pet.type === room.petType;
}

const createBookedRoomWithCondition = async (roomId, petId, bookingId, checkIn, checkOut) => {
    const count = await overlappingRoom(roomId, checkIn, checkOut);
    const cap = await getRoomCap(roomId);

    // 1. Check room capacity
    if (count >= cap) {
        const error = new Error('This room has reached its maximum capacity for the selected dates.');
        error.code = 'ROOM_FULL';
        throw error;
    }

    // 2. Check if the same pet is already booked in this room during that period
    const overlapping = await duplicatedRoom(roomId, petId, checkIn, checkOut);
    if (overlapping.length > 0) {
        const error = new Error('This pet already has a booking in this room during the selected dates.');
        error.duplicatedDates = overlapping.map(b => ({
            checkIn: b.checkIn,
            checkOut: b.checkOut
        }));
        error.code = 'ROOM_DUPLICATE';
        throw error;
    }

    // 3. Check if the pet is free during that time (not in another room)
    const pet = await isFreeThisTime(petId, checkIn, checkOut);
    if (!pet) {
        const error = new Error('This pet is already booked in another room during the selected dates.');
        error.code = 'PET_NOT_FREE';
        throw error;
    }

    // 4. Check if the room is suitable for the pet type
    const isSuit = await isSuitable(roomId, petId);
    if (!isSuit) {
        const error = new Error('This pet is not eligible for the selected room.');
        error.code = 'PET_NOT_SUIT';
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