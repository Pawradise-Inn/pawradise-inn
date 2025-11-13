const prisma = require('../../prisma/prisma');
const {getRoomCap} = require('./room');

const findBookedRoomById = async(id)=>{
    const bookedId = Number(id);
    if(isNaN(bookedId)){
        throw new Error("Invalid booked room ID");
    }
    const bookedRoom = await prisma.bookedRoom.findUnique({
        where: { id: bookedId }
    });

    return bookedRoom;
};

const overlappingRoom = async(id, checkIn, checkOut)=>{
    const count = await prisma.bookedRoom.count({
        where: {
            roomId: Number(id),
            checkIn: {lt: new Date(checkOut)},
            checkOut: {gt: new Date(checkIn)},
            status: {
                not : "CANCELLED"
            }
        }
    });
    return count;
};

const checkRoomBeforePaid = async(customerId, roomId, checkIn, checkOut) => {
    const cap = await getRoomCap(roomId);
    const count = await overlappingRoom(roomId, checkIn, checkOut);

    if (count >= cap){
        return "THIS_ROOM_IS_FULL";
    }

    const cartCount = await prisma.cartRoom.count({
        where: {
            cart: {customerId: customerId},
            roomId: Number(roomId),
            checkIn: { lt: new Date(checkOut) },
            checkOut: { gt: new Date(checkIn) },
            selected: true
        }
    });

    if ((cartCount + count) > cap){
        return "ITEM_EXCEED";
    }

    return "VALID";
}

const duplicatedRoom = async(petId, checkIn, checkOut)=>{
    const duplicated = await prisma.bookedRoom.count({
        where: {
            petId: petId,
            checkIn: { lt: new Date(checkOut) },
            checkOut: { gt: new Date(checkIn) },
            status: {
                not : "CANCELLED"
            }
        }
    });

    const countCart = await prisma.cartRoom.count({
        where: {
            petId: petId,
            checkIn: { lt: new Date(checkOut) },
            checkOut: { gt: new Date(checkIn) },
        }
    })
    return duplicated + countCart;
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

const isReservableRoom = async(roomId, petId, checkIn, checkOut, customerId) => {
    const count = await overlappingRoom(roomId, checkIn, checkOut);
    const cap = await getRoomCap(roomId);

    // Include items currently in carts for the same room and overlapping dates
    const cartCount = await prisma.cartRoom.count({
        where: {
            cart: {customerId: customerId},
            roomId: Number(roomId),
            checkIn: { lt: new Date(checkOut) },
            checkOut: { gt: new Date(checkIn) },
        }
    });

    const isSuit = await isSuitable(roomId, petId);
    if (!isSuit) {
        const error = new Error('This pet is not eligible for the selected room.');
        error.code = 'PET_NOT_SUIT';
        throw error;
    }

    if (count + cartCount >= cap) {
        const error = new Error('This room has reached its maximum capacity for the selected dates.');
        error.code = 'ROOM_FULL';
        throw error;
    }

    const overlapping = await duplicatedRoom(petId, checkIn, checkOut);
    if (overlapping > 0) {
        const error = new Error('This pet already has a booking during the selected dates.');
        error.code = 'BOOKING_DUPLICATE';
        throw error;
    }

    return true;
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

    // 2. Check if the same pet is already booked during that period
    const overlapping = await duplicatedRoom(petId, checkIn, checkOut);
    if (overlapping.length > 0) {
        const error = new Error('This pet already has a booking during the selected dates.');
        error.code = 'BOOKING_DUPLICATE';
        throw error;
    }

    // 3. Check if the room is suitable for the pet type
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
    createBookedRoomWithCondition,
    isReservableRoom,
    checkRoomBeforePaid
};