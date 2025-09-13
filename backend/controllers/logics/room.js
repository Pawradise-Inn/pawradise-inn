const prisma = require('.../prisma/prisma');

const findRoomById = async(id)=>{
    const roomId = Number(id);
    if(isNaN(roomId)){
        throw new Error("Invalid room ID");
    }
    const room = await prisma.room.findUnique({
        where: {id: roomId}
    });
    return room;
};

const addRoomPictures = async(id, pictures)=>{
    const updatedRoom = await prisma.room.update({
        where: {id: Number(id)},
        data: {
            picture: {
                push: pictures
            }
        }
    });
    return updatedRoom;
};

const removeRoomPictures = async(id, pictures)=>{
    const room = await findRoomById(id);

    const updatedPictures = room.picture.filter(
        url => !pictures.includes(url)
    );

    const updatedRoom = await prisma.room.update({
        where: {id: id},
        data: {
            picture: updatedPictures
        }
    });

    return updatedRoom;
};

const getRoomCap = async(id)=>{
    const room = await findRoomById(id);

    return room.capacity;
}

module.exports = {
    findRoomById,
    addRoomPictures,
    removeRoomPictures,
    getRoomCap
};