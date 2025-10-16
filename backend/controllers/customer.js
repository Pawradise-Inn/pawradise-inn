const prisma = require('../prisma/prisma');

const getCustomerProfile = async(req, res)=>{ //requirement: 2
    try{
        const customerId = req.params.id;
        const customerWithPets = await prisma.customer.findUnique({
            where: {
                id: Number(customerId)
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
        if(!customerWithPets) {
            return res.status(404).json({
                success: false, 
                message: "Customer profile not found"
            });
        }
        res.status(200).json({success: true, data: customerWithPets});
    }catch(err){
        res.status(500).json({
            success: false, 
            message: "Unable to fetch customer profile. Please try again later"
        });
    }
};

const updateCustomerProfile = async(req, res)=>{
    try{
        const customerId = Number(req.params.id);
        const {firstname,
                lastname,
                email,
                phone_number,
                user_name} = req.body;
        const customer = await prisma.customer.findUnique({
            where: {
                id: customerId
            }
        });
        console.log(customer);
        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer profile not found"
            });
        }
        const user = await prisma.user.update({
            where: {id: customer.userId},
            data: {
                firstname,
                lastname,
                email,
                phone_number,
                user_name,
            }
        });
        res.status(200).json({success: true, data: user});
    }catch(err){
        if (err.code === 'P2002') {
            return res.status(409).json({
                success: false,
                message: "This email or username is already in use"
            });
        }
        res.status(500).json({success: false, message: "Unable to update customer profile. Please try again later"});
    }
}

module.exports = {
    getCustomerProfile,
    updateCustomerProfile
}