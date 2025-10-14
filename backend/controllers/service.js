const prisma = require('../prisma/prisma');
const {findServiceById, addServicePictures, removeServicePictures } = require('./logics/service');
const {overlappingService} = require('./logics/bookedService');

const getServices = async (req, res) =>{
    let options = {};

    //Select Filter
    if (req.query.filter){
        let where = JSON.parse(req.query.filter)
    if (where.name){
        where.name.mode = 'insensitive';
    }
        options.where = where;
    }

    //Select fields
    if (req.query.select){
        const fields = req.query.select.split(",");
        options.select = fields.reduce((acc, field) => {
            acc[field.trim()] = true;
            return acc;
        }, {});
    }

    //Sort
    if (req.query.sort){
        const sortFields = req.query.sort.split(",");
        options.orderBy = sortFields.map(sortField => {
            const [field, direction = 'asc'] = sortField.split(":");
            const dir = direction.trim().toLowerCase() === 'desc' ? 'desc' : 'asc';
            return {[field.trim()] : dir};
        });
    } else {
        options.orderBy = {id: 'asc'};
    }

    //Pagination
    const page = parseInt(req.query.page,10) || 1;
    const limit = parseInt(req.query.limit,10) || 10;
    const startIndex = (page-1)*limit;
    const endIndex = page*limit;

    options.skip = startIndex;
    options.take = limit;

    try {
        const total = await prisma.service.count({
            where: options.where
        });
        if(total === 0) {
            return res.status(404).json({
                success: false, 
                msg: "No service are available at the moment"
            });
        }

        const services = await prisma.service.findMany(options);

        const pagination = {};
        if(endIndex < total){
            pagination.next = {
                page: page + 1,
                limit: limit
            }
        }
        if(startIndex > 0){
            pagination.prev = {
                page: page - 1,
                limit: limit
            }
        }
        res.status(200).json({success: true, pagination, data: services, count: total});
    } catch (err) {
        res.status(500).json({success: false, message: "Unable to fetch services. Please try again later" });
    }
};

const getService = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const service = await findServiceById(serviceId);
        if(!service) return res.status(404).json({success: false, msg: 'Service is not found'});
        res.status(200).json({success: true, data: service});
    } catch (err) {
        res.status(500).json({
            success: false, 
            message: "Unable to fetch service details. Please try again later"
        });
    }
};

const createService = async (req, res) => { //requirement: 15
    try {
        const {name, price, petType} = req.body;
        const service = await prisma.service.create({
            data: {
                name: name,
                price: price,
                petType: petType,
                picture: ""
            }
        });
        res.status(201).json({success: true, data: service});
    } catch (err) {
        res.status(500).json({success: false, message: "Unable to create service. Please try again later"});
    }
};

const updateService = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const dataToUpdate = {};
        if (req.body.name !== undefined) dataToUpdate.name = req.body.name;
        if (req.body.price !== undefined) dataToUpdate.price = req.body.price;
        if (req.body.petType !== undefined) dataToUpdate.petType = [req.body.petType.toUpperCase()];
        if (req.body.picture !== undefined) dataToUpdate.picture = req.body.picture;

        if(Object.keys(dataToUpdate).length === 0) return res.status(400).json({success: false, msg: "Please provide details to update"});

        const service = await prisma.service.update({
            where: {id: Number(serviceId)},
            data: dataToUpdate
        });
        res.status(200).json({success: true, data: service});
    } catch (err) {
        if (err.code === 'P2025') return res.status(404).json({success: false, msg: 'Service is not found'});
        res.status(500).json({
            success: false, 
            message: "Unable to update service. Please try again later"
        });
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
        res.status(500).json({success: false, message: "Unable to delete service. Please try again later"});
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
        res.status(500).json({
            success: false, 
            message: "Unable to add pictures to service. Please try again later"
        });
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
        res.status(500).json({success: false, error: err.message, message: "Unable to remove pictures from service. Please try again later" });
    }
};

const getServicesWithPagination = async (req, res)=>{ //requirement: 1
    try{
        const services = await prisma.service.findMany({
            include: {
                reviews: true
            }
        });

        const formatted = services.map((service)=>{
            const totalReviews = service.reviews.length;
            const avgRating = totalReviews > 0 ? service.reviews.reduce((sum ,r)=> sum + (r.rating || 0), 0) / totalReviews : 0;
            return {
                image: service.picture,
                name: service.name,
                reviewStar: avgRating,
                forWhich: service.petType.map((p) => p),
                price: service.price,
                commentPages: Math.ceil(totalReviews/3)
            }
        });

        res.status(200).json({success: true, data: formatted});
    }catch(err){
        res.status(500).json({success: false, error: err.message, message: "Unable to fetch services. Please try again later" });
    }
};

const getServiceStatus = async (req, res)=>{ //requirement: 6
    try{
        const name = req.query.name;
        const schedule = new Date(req.query.entry_date_with_time);
        const service = await prisma.service.findFirst({
            where: {name: name}
        });
        if (!service) {
            return res.status(404).json({ 
                success: false, 
                message: "Service not found" 
            });
        }

        const count = await overlappingService(service.id, schedule);
        res.status(200).json({success: true, count: count});
    }catch(err){
        res.status(500).json({success: false, message: "Unable to check service availability. Please try again later"});
    }
};

const getServiceReviews = async (req, res) => { //requirement: 5
  try {
    const { name, star, NSP } = req.query;
    const page = Number(NSP) || 1;
    const take = 3;
    const skip = (page - 1) * take;

    if (!name) {
      return res.status(400).json({ success: false, msg: "Please provide a service name to view reviews" });
    }
    const service = await prisma.service.findFirst({
        where: {name: name}
    });



    const reviews = await prisma.chatLog.findMany({
      where: {
        serviceId: service.id,
        review: { not: null },
        rating: star ? { equals: Number(star) } : undefined
      },
      skip,
      take,
      select: {
        id: true,
        review: true,
        rating: true,
        review_date: true,
        customer: {
          include:{
            user:{
                select: {
                    user_name: true
            }}
          }
        }
      }
    });

    const formattedReviews = reviews.map(r => ({
        id: r.id,
      commenter_name: r.customer?.user.user_name || "Anonymous",
      comment_detail: r.review,
      comment_star: r.rating,
    }));

    res.status(200).json({ success: true, data: formattedReviews });
  } catch (err) {
    res.status(500).json({ success: false, message: "Unable to fetch service reviews. Please try again later" });
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
    getServiceStatus,
    getServicesWithPagination,
    getServiceReviews
};