const prisma = require('../prisma/prisma');
const {createCareWithCheck} = require('./logics/care');

const getCares = async (req, res) => {
    let options = {};
    let check = true;


    if (!req.query.bookedServiceId){
        options.where = {bs_id: Number(req.query.BookedServiceId)};
        check = true;
    }else if(!req.query.bookedRoomId){
        options.where = {br_id: Number(req.query.BookedServiceId)};
        check = false;
    }
    if (req.query.filter){
        let filter = JSON.parse(req.query.filter);
        options.where = {...options.where, ...filter};
    }
    
    if (req.query.select){
        const fields = req.query.select.split(",");
        options.select = fields.reduce((acc, field) => {
            acc[field.trim()] = true;
            return acc;
        }, {});
    }

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

    const page = parseInt(req.query.page,10) || 1;
    const limit = parseInt(req.query.limit,10) || 3;
    const startIndex = (page-1)*limit;
    const endIndex = page*limit;

    options.skip = startIndex;
    options.take = limit;
    try {
        const total = await prisma.care.count({
            where: options.where
        });
        if(total === 0) {
            return res.status(200).json({
                success: true, 
                msg: "No care found"
            });
        }

        if (check){
            options.include = {
                staff: {
                    include: {
                        user: {
                            select:{user_name:true}
                        }
                    }
                },
                bookedService: {
                    include: {
                        pet: {
                            select: {name: true}
                        }
                    }
                }
            };
        }else{
            options.include = {
                staff: {
                    include: {
                        user: {
                            select:{user_name:true}
                        }
                    }
                },
                bookedRoom: {
                    include: {
                        pet: {
                            select: {name: true}
                        }
                    }
                }
            };
        }
        
        const care = await prisma.care.findMany(options);

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
        res.status(200).json({ success: true, pagination, data: care, count: total });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Unable to fetch cares. Please try again later"
        });
    }
};

const getCare = async (req, res) => {
    try {
        const id = req.params.id;
        const care = await prisma.care.findUnique({
            where: { id: Number(id) }
        })

        if (!care) return res.status(404).json({success: false, msg: 'Care not found'});

        res.status(200).json({success: true, data: care});
    } catch (err) {
        res.status(500).json({ success: false, message: "unable to fetch care. Please try again later"});
    }
};

const createCare = async(req, res)=> {
    let care;
    const petId = req.body.petId;
    try{
        if (req.body.bookedServiceId){
            care = await createCareWithCheck(req.body.bookedServiceId, "service", petId, req.user.roleId, new Date(), req.body.status);
        }else if (req.body.bookedRoomId){
            care = await createCareWithCheck(req.body.bookedRoomId, "room", petId, req.user.roleId, new Date(), req.body.status);
        }
        res.status(201).json({ success: true, data: care });
    }catch(err){
        if (err.code === "INVALID_ROOM_STATUS"){
            return res.status(400).json({
                success: false,
                message: "This room status is invalid"
            });
        }else if (err.code === "INVALID_SERVICE_STATUS"){
            return res.status(400).json({
                success: false,
                message: "This service status is invalid"
            });
        }else if (err.code === "INVALID_TYPE"){
            return res.status(400).json({
                success: false,
                message: "This type is invalid"
            });
        }
        res.status(500).json({ success: false, message: "Unable to create care"});
    }
};

const deleteCare = async(req, res)=> {
    try{
        const careId = Number(req.params.id);
        const care = await prisma.care.delete({
            where: { id: careId }
        });
        res.status(200).json({success: true, data: {}});
    }catch(err){
        if (err.code === "P2025")
            return res.status(404).json({
                success: false,
                msg: "care is not found or already deleted",
            });
        res.status(500).json({ 
            success: false, 
            message: "Unable to delete care" 
        });
    }
};

module.exports = {
    getCares,
    getCare,
    createCare,
    deleteCare
};