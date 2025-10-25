const prisma = require('../prisma/prisma');
const { sendErrorResponse } = require("../utils/responseHandler");

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
            return sendErrorResponse(res, 404, "NOT_FOUND", "Customer profile not found");
        }
        return sendSuccessResponse(res, 200, "LOADED_SUCCESSFULLY", "Customer profile loaded", customerWithPets);
    }catch(err){
        return sendErrorResponse(res, 500, "UNABLE_TO_LOAD", "Unable to load customer profile. Please refresh and try again");
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
        
        if (!customer) {
            return sendErrorResponse(res, 404, "NOT_FOUND", "Customer profile not found");
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
        return sendSuccessResponse(res, 200, "PROFILE_UPDATED", "Customer profile updated successfully", user);
    }catch(err){
        if (err.code === 'P2002') {
            return sendErrorResponse(res, 409, "ALREADY_EXISTS", "This email or username is already in use");
        }
        return sendErrorResponse(res, 500, "SERVER_ERROR", "Unable to update customer profile. Please try again");
    }
}

module.exports = {
    getCustomerProfile,
    updateCustomerProfile
}