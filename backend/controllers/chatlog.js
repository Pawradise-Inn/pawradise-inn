const prisma = require('../prisma/prisma')

const getChatLogs = async (req, res) => {
    let query;

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

    try {
        const { customerId, serviceId, staffId } = req.query;
        const filters = {};
        if (customerId) filters.customerId = Number(customerId);
        if (serviceId) filters.serviceId = Number(serviceId);
        if (staffId) filters.staffId = Number(staffId);

        const chatlogs = await prisma.chatLog.findMany({
            where: filters,
            include: { customer: true, staff: true, service: true },
            orderBy: { review_date: 'desc' },
        });


        res.status(200).json({ success: true, data: query });
    } catch (err) {
        res.status(400).json({ success: true, error: err.message});
    }
};

  const getChatLogById = async(req, res)=> {
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
    try {
        const { review, rating, customerId, serviceId } = req.body;

        if (!customerId || !serviceId) {
            return res.status(200).json({ error: 'Customer ID and Service ID are required'});
        }

        const existingReview = await prisma.chatLog.findFirst({
            where: {
                customerId: Number(customerId),
                serviceId: Number(serviceId)
            }
        });

        if (existingReview){
            return res.status(200).json({success: false, error: 'Customer has already review'});
        }

        const chatlog = await prisma.chatLog.create({
            data: {
                review: review,
                rating: rating,
                customerId: Number(customerId),
                serviceId: Number(serviceId)
            }
        });

        res.status(201).json({success: true, data: chatlog});
    } catch (err) {
        res.status(400).json({success: false, error: err.message});
    }
  };

const replyToChatLog = async (req, res)=> {
    try {
        const id = req.params.id;
        const { reply, staffId } = req.body;

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
    getChatLogById,
    createChatLog,
    replyToChatLog,
    deleteChatLog
};
