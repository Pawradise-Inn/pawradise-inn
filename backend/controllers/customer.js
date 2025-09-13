const prisma = require('../prisma/prisma');

const getCustomerProfile = async(req, res)=>{ //requirement: 2
    try{
        const customerId = req.query.id;
        const customerWithPets = await prisma.customer.findUnique({
            where: {
                userId: Number(customerId)
            },
            include:{
                pets: {
                    include: {
                        bookedRooms: {
                            include: {
                                roomId: true,
                                bookingId: true
                            }
                        },
                        bookedServices: {
                            include: {
                                service:{
                                    select:{
                                        name: true
                                    }
                                },
                                bookingId: true
                            }
                        }
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