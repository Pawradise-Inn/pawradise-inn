const prisma = require('../prisma/prisma')

const getChatLogs = async (req, res) => {
    let options = {};

    //wait testing 1
    // if(req.params.serviceId){
    //     query = chatlogs.findMany({
    //         where: {serviceId: Number(req.params.serviceId)},
    //         include: { customer: true, staff: true },
    //         orderBy: { review_date: 'desc' },
    //     });
    // }else if (req.params.roomId){
    //     query = chatlogs.findMany({
    //         where: {
    //             roomId: Number(req.params.roomId),
    //         },
    //         include: { customer: true, staff: true },
    //     });
    // } else if (req.params.customerId && req.user.role === 'STAFF') {
    //     query = chatlogs.findMany({
    //         where: {customerId : Number(req.params.customerId)}
    //     })
    // } else {
    //     query = chatlogs.findMany();
    // }
    if (req.params.serviceId){
        options.serviceId = Number(serviceId);
    }

    if (req.params.roomId){
        options.roomId = Number(roomId);
    }

    //Select filter
    if (req.query.filter){
        let where = JSON.parse(req.query.filter);
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
        const total = await prisma.chatLog.count({
            where: options.where
        });
        if(total === 0) {
            return res.status(200).json({
                success: false, 
                msg: "No review in database"
            });
        }

        options.include = {customer: {include: {user: {select:{user_name:true}}}}};
        console.log(options);
        const reviews = await prisma.chatLog.findMany(options);
        console.log(reviews);
        const formattedReviews = reviews.map(r => ({
            id: r.id,
            commenter_name: r.customer?.user.user_name || "Anonymous",
            commenter_detail: r.review,
            commenter_star: r.rating
        }));

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
        res.status(200).json({ success: true, pagination, data: formattedReviews, count: total });
    } catch (err) {
        res.status(400).json({ success: true, error: err.message});
    }
};

  const getChatLog= async(req, res)=> {
    try {
        const id = req.params.id;
        const chatlog = await prisma.chatLog.findUnique({
            where: { id: Number(id) }
        });

        if (!chatlog) return res.status(404).json({success: false, msg: 'Chatlog not found'});

        res.status(200).json({success: true, data: chatlog});
    } catch (err) {
        res.status(400).json({ success: true, error: err.message});
    }
  };

const createChatLog = async(req, res)=> {
    let data = {}
    if (req.body.rating){
        data.rating = Number(req.body.rating);
    }
    if (req.body.review){
        data.review = req.body.review;
    }

    if (req.body.serviceId){
        data.serviceId = Number(req.body.serviceId);
    }else{
        data.serviceId = Number(req.params.serviceId);
    }

    try {
        if (!data.serviceId) {
            return res.status(401).json({ error: 'Service ID are required'});
        }
        data.customerId = req.user.roleId;
        const existingReview = await prisma.chatLog.findFirst({
            where: {
                customerId: req.user.roleId,
                serviceId: data.serviceId
            }
        });

        if (existingReview){
            return res.status(200).json({success: false, error: 'Customer has already review'});
        }

        const chatlog = await prisma.chatLog.create({data});

        res.status(201).json({success: true, data: chatlog});
    } catch (err) {
        res.status(400).json({success: false, error: err.message});
    }
  };

const replyToChatLog = async (req, res)=> {
    try {
        const id = req.params.id;
        const staffId = req.user.roleId;
        const reply = req.body.reply;
        if (!reply || !staffId) {
            return res.status(200).json({ error: 'Reply text and staff ID are required' });
        }

        const chatlog = await prisma.chatLog.update({
            where: { id: Number(id) },
            data: {
                reply: reply,
                staffId: staffId,
                reply_date: new Date()
            }
        });

        res.status(201).json({success: true, data: chatlog});
    } catch (err) {
        res.status(400).json({success: false, error: err.message});
    }
};

const updateChatLog = async(req, res) => {
    let dataToUpdate = {};
    if (req.user.role === "CUSTOMER"){
        if (req.body.review !== undefined) dataToUpdate.review = req.body.review;
        if (req.body.rating !== undefined) dataToUpdate.rating = req.body.rating;
    }else if (req.user.role === "STAFF"){
        if (req.body.reply !== undefined) dataToUpdate.reply = req.body.reply;
        if (req.body.show !== undefined) dataToUpdate.show = req.body.show;
    }
    try {
        const id = req.params.id;
        
        if (Object.keys(dataToUpdate).length === 0){
            return res
                .status(400)
                .json({ success: false, msg: "No valid fields to update" });
        }

        const chatlog = await prisma.chatLog.update({
            where: { id: Number(id) },
            data: dataToUpdate,
        });

        res.status(200).json({success: true, data: chatlog});
    }catch (err) {
        res.status(400).json({success: false, error: err.message});
    }
};

const deleteChatLog = async(req, res)=>{
    try {
        const id = req.params.id;
        const chatlog = await prisma.chatLog.delete({
            where: { id: Number(id)}
        });

        res.status(200).json({success: true, data: chatlog});
    } catch (err) {
        res.status(400).json({success: false, error: err.message});
    }
};

module.exports = {
    getChatLogs,
    getChatLog,
    createChatLog,
    replyToChatLog,
    deleteChatLog,
    updateChatLog
};
