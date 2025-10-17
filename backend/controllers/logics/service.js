const prisma = require('../../prisma/prisma');

const findServiceById = async(id)=>{
    const serviceId = Number(id);
    if(isNaN(serviceId)){
        throw new Error("Invalid service ID");
    }

    const service = await prisma.service.findUnique({
        where: {id: serviceId}
    });

    return service;
};

// const addServicePictures = async(id, pictures)=>{
//     const updatedService = await prisma.service.update({
//         where: {id: Number(id)},
//         data: {
//             picture: {
//                 push: pictures
//             }
//         }
//     });
//     return updatedService;
// };

// const removeServicePictures = async(id, pictures)=>{
//     const service = await findServiceById(id);

//     const updatedPictures = service.picture.filter(
//         url => !pictures.includes(url)
//     );

//     const updatedService = await prisma.service.update({
//         where: {id: id},
//         data: {
//             picture: updatedPictures
//         }
//     });

//     return updatedService;
// };

module.exports = {
    findServiceById,
    // addServicePictures,
    // removeServicePictures
};