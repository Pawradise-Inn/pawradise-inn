const prisma = require('../prisma/prisma');

const register = async (req, res) => {
  try {
    const customerId = Number(req.user.roleId); // from protect middleware
    // find the customer record that belongs to this user
    const customer = await prisma.customer.findUnique({
      where: { id : customerId } // requires Customer.userId to be unique
    });
    if (!customer) {
      res.status(400).json({ 
        success: false, 
        message: "Customer profile not found." 
      });
    }

    const {
      name, sex, age, type, status, breed,
      disease, allergic, picture
    } = req.body;
    const lastPet = await prisma.pet.findFirst({
      orderBy: { id: 'desc' }, // descending order, highest id first
    });

    const newId = lastPet ? lastPet.id + 1 : 1; // if no pets exist, start from 1

    const pet = await prisma.pet.create({
      data: {
        id: newId,
        name,
        sex,
        age: Number(age),
        type,
        status: "IDLE",
        breed,
        disease,
        allergic,
        customerId: customer.id,
        picture,
      },
    });
    res.status(201).json({ success: true, data: pet });
  } catch (err) {
    if (err.code === "P2003") {
      return res.status(400).json({ 
        success: false, 
        message: "Unable to register pet. Please check your customer information" 
      });
    }
    console.error("pet.register:", err);
    res.status(500).json({ success: false, message: "Unable to register pet. Please try again later" });
  }
};

const getAllPets = async (req, res) => {
    try {
        const pets = await prisma.pet.findMany({
            include: {
                scheduled: {
                    include: {
                        service: true
                    }
                },
                stayed: {
                    include: {
                        room: true,
                    }
                }
            }
        });
        
        // Check if any pets were found
        if (pets.length === 0) {
            return res.status(404).json({ 
              success: false, 
              message: "No pets found in our system" 
            });
        }
        res.status(200).json({ success: true, data: pets });
    } catch (err) {
        res.status(500).json({ success: false, message: "Unable to fetch pets. Please try again later" });
    }
};

const getPet = async (req, res) => {  //Both
    try {
        const pet = await prisma.pet.findUnique({
            where: {
                id: Number(req.params.id)
            },
            include: {
              scheduled:{
                include:{
                  service: true
                }
              },
              stayed: {
                include:{
                  room: true,
                }
              }
            }
        });
        if (!pet) {
            return res.status(404).json({
              success: false, 
              message: "Pet not found"
            });
        }
        res.status(200).json({success: true, data: pet});
    } catch(err) {
        res.status(500).json({success: false, message: "Unable to fetch pet details. Please try again later" });
    }
};

const updatePet = async (req, res) => {
    try {
        const pet = await prisma.pet.update({
            where: {id: Number(req.params.id)},
            data: req.body
          });
        if (!pet) {
            return res.status(404).json({
              success: false, 
              message: "Pet not found"
            });
        }
        res.status(200).json({success: true, data: pet});
    } catch(err) {
        res.status(500).json({
          success: false, 
          message: "Unable to update pet information. Please try again later"
        });
    }
};

const updatePetStatus = async (req, res) => {
  try {
    const petId = Number(req.params.id);
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ 
        success: false, 
        message: "Please provide a status for the pet" 
      });
    }

    const pet = await prisma.pet.update({
      where: { id: petId },
      data: { status },
    });

    res.status(200).json({ success: true, data: pet });
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ 
        success: false, 
        message: "Pet not found" 
      });
    }
    res.status(500).json({ success: false, message: "Unable to update pet status. Please try again later" });
  }
};

const deletePet = async (req, res) => {
    try {
        const pet = await prisma.pet.delete({
            where: {id: Number(req.params.id)}
        });
        if (!pet) {
            return res.status(404).json({
              success: false, 
              message: "Pet not found"
            });
        }
        res.status(200).json({success: true, data: {}});
    } catch(err) {
        res.status(500).json({success: false, message: "Unable to delete pet. Please try again later" });
    }
};

const getCustomerPets = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const fields = req.query.fields ? req.query.fields.split(',') : ['name', 'breed', 'sex', 'age', 'type', 'status','breed', 'disease', 'allergic', 'picture'];

    const select = {};
    fields.forEach(f => select[f] = true);

    const pets = await prisma.pet.findMany({
      where: { customerId: userId },
      select
    });

    if (!pets || pets.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "No pets found for this customer" 
      });
    }

    res.status(200).json({ success: true, data: pets });
  } catch (err) {
    res.status(500).json({ success: false, message: "Unable to fetch pets. Please try again later" });
  }
};


const getCustomerPetNamesWithAvailable = async (req, res)=> { //requirement: 4
    try {
        const customerId = Number(req.query.customerId);
        const bookingDate = new Date();

        const pets = await prisma.pet.findMany({
            where: {
                customerId: customerId,
                stayed: {
                    none: {
                        checkIn: { lte: bookingDate },
                        checkOut: { gte: bookingDate } 
                    }
                }
            },
            select: {
                name: true,
                type: true
            }
        });
        if(!pets || pets.length === 0) {
            return res.status(404).json({
              success: false, 
              message: "No available pets found for booking"
            });
        }
        res.status(200).json({success: true, data: pets});
    }catch(err){
        res.status(500).json({success: false, message: "Unable to check pet availability. Please try again later"});
    }
}

module.exports = {
  register,
  getPet,
  updatePet,
  updatePetStatus,
  deletePet,
  getCustomerPets,
  getCustomerPetNamesWithAvailable,
  getAllPets
}