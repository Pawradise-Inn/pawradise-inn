const prisma = require('../prisma/prisma');
const {findServiceById, addServicePictures, removeServicePictures } = require('./logics/service');
const {overlappingService} = require('./logics/bookedService');

const getServices = async (req, res) =>{
    try {
        const services = await prisma.service.findMany();
        if(services.length === 0) return res.status(404).json({success: false, msg: "No service in database"});
        res.status(200).json({success: true, data: services});
    } catch (err) {
        res.status(400).json({success: false, error: err.message});
    }
};

const getService = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const service = await findServiceById(serviceId);
        if(!service) return res.status(404).json({success: false, msg: 'Service is not found'});
        res.status(200).json({success: true, data: service});
    } catch (err) {
        res.status(400).json({success: false, error: err.message});
    }
};

const createService = async (req, res) => { //requirement: 15
    try {
        const {name, price, petType, picture} = req.body;
        const service = await prisma.service.create({
            data: {
                name: name,
                price: price,
                petType: petType,
                picture: picture
            }
        });
        res.status(201).json({success: true, data: service});
    } catch (err) {
        res.status(400).json({success: false, error: err.message});
    }
};

const updateService = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const dataToUpdate = {};
        if (req.body.name !== undefined) dataToUpdate.name = req.body.name;
        if (req.body.price !== undefined) dataToUpdate.price = req.body.price;
        if (req.body.petType !== undefined) dataToUpdate.petType = req.body.petType;
        if (req.body.picture !== undefined) dataToUpdate.picture = req.body.picture;

        if(Object.keys(dataToUpdate).length === 0) return res.status(400).json({success: false, msg: "No valid fields to update"});

        const service = await prisma.service.update({
            where: {id: Number(serviceId)},
            data: dataToUpdate
        });
        res.status(200).json({success: true, data: service});
    } catch (err) {
        if (err.code === 'P2025') return res.status(404).json({success: false, msg: 'Service is not found'});
        res.status(400).json({success: false, error: err.message});
    }
};

const deleteService = async (req, res) => { //requirement: 15
    try {
        const serviceId = req.params.id;
        const service = await prisma.service.delete({
            where: {id: Number(serviceId)}
        });
        res.status(200).json({success: true, data: {}});
    } catch(err){
        if (err.code === 'P2025') return res.status(404).json({success: false, msg: 'Service is not found or already deleted'});
        res.status(400).json({success: false, error: err.message});
    }
};

const addPicturesToService = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const pictures = req.body.picture;
        const service = await addServicePictures(serviceId, pictures);
        res.status(200).json({success: true, data: service});
    }catch(err){
        if(err.code === 'P2025') return res.status(404).json({success: false, msg: 'Service is not found'});
        res.status(400).json({success: false, error: err.message});
    }
};

const deletePicturesFromService = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const pictures = req.body.picture;
        const service = await removeServicePictures(serviceId, pictures);
        res.status(200).json({success: true, data: service});
    }catch(err){
        if(err.code === 'P2025') return res.status(404).json({success: false, msg: 'Service is not found'});
        res.status(400).json({success: false, error: err.message});
    }
};

const getAllServiceComments = async (req, res)=>{ //requirement: 1
    try{
        const services = await prisma.service.findMany({
            include: {
                reviews: true,
                petType: true
            }
        });

        const formatted = services.map((service)=>{
            const totalReviews = service.reviews.length;
            const avgRating = totalReviews > 0 ? service.reviews.reduce((sum ,r)=> sum + (r.rating || 0), 0) / totalReviews : 0;
            return {
                image: service.picture,
                name: service.name,
                reviewStar: avgRating,
                forWhich: service.petType.map((p) => p.name),
                price: service.price,
                commentPages: Math.ceil(totalReviews/3)
            }
        });

        res.status(200).json({success: true, data: formatted});
    }catch(err){
        res.status(400).json({success: false, error: err.message});
    }
};

const getServiceStatus = async (req, res)=>{ //requirement: 6
    try{
        const name = req.query.name;
        const schedule = new Date(req.query.entry_date_with_time);
        const service = await prisma.service.findFirst({
            where: {name: name}
        });
        if (!service) return res.status(404).json({ success: false, error: "Service not found" });

        const status = await overlappingService(service.id, schedule);
        res.status(200).json({success: true, available: status < 3});
    }catch(err){
        res.status(400).json({success: false, error: err.message});
    }
};

const getServiceReviews = async (req, res) => { //requirement: 7
  try {
    const { serviceId, NSP } = req.query;
    const page = Number(NSP) || 1;
    const take = 3;
    const skip = (page - 1) * take;

    if (!serviceId) {
      return res.status(400).json({ success: false, msg: "serviceId is required" });
    }

    const reviews = await prisma.chatLog.findMany({
      where: {
        serviceId: Number(serviceId),
        review: { not: null }
      },
      skip,
      take,
      select: {
        review: true,
        rating: true,
        review_date: true,
        customer: {
          select: { name: true }
        }
      }
    });

    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ success: false, msg: "No reviews found" });
    }

    const formattedReviews = reviews.map(r => ({
      commenter_name: r.customer?.name || "Anonymous",
      comment_detail: r.review,
      comment_star: r.rating,
    }));

    res.status(200).json({ success: true, data: formattedReviews });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


module.exports = {
    getServices,
    getService,
    createService,
    updateService,
    deleteService,
    addPicturesToService,
    deletePicturesFromService,
    getAllServiceComments,
    getServiceStatus,
    getServiceReviews
};