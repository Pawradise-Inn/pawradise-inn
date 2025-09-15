const prisma = require('../prisma/prisma');

const getCustomerProfile = async(req, res)=>{ //requirement: 2
    try{
        const customerId = req.params.id;
        const customerWithPets = await prisma.customer.findUnique({
            where: {
                userId: Number(customerId)
            },
            include:{
                user: {
                    select:{
                        firstname: true,
                        lastname: true,
                        email: true,
                        phone_number: true,
                        user_name: true,
                    }
                },
                pets: {
                    include: {
                        stayed: true,
                        scheduled: true
                    }
                }
            }
        });
        if(!customerWithPets) return res.status(404).json({success: false, error: "Customer is not found"});
        res.status(200).json({success: true, data: customerWithPets});
    }catch(err){
        res.status(400).json({success: false, error: err.message});
    }
};



module.exports = {
    getCustomerProfile
}