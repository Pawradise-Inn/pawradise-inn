const prisma = require('../prisma/prisma');

const register = async (req, res) => {
  try {
    const userId = req.user.id; // from protect middleware
    console.log(userId);
    // find the customer record that belongs to this user
    const customer = await prisma.customer.findUnique({
      where: { userId : userId } // requires Customer.userId to be unique
    });
    console.log(customer);
    if (!customer) {
      return res.status(400).json({ success: false, error: "Customer profile not found for this user" });
    }

    const {
      name, sex, age, type, status, breed,
      disease, allergic, picture
    } = req.body;

    const pet = await prisma.pet.create({
      data: {
        name,
        sex,
        age: Number(age),
        type,
        status,
        breed,
        disease,
        allergic,
        customerId: customer.id,
        ...(picture ? { picture: Buffer.from(picture, "base64") } : {}),
      },
      select: {
        id: true, name: true, sex: true, age: true, type: true, status: true,
        breed: true, disease: true, allergic: true, customerId: true,
      },
    });
    console.log(pet);
    res.status(201).json({ success: true, data: pet });
  } catch (err) {
    if (err.code === "P2003") {
      return res.status(400).json({ success: false, error: "Invalid customerId (foreign key)" });
    }
    console.error("pet.register:", err);
    res.status(400).json({ success: false, error: err.message });
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
            return res.status(404).json({ success: false, error: "No pets found" });
        }

        res.status(200).json({ success: true, data: pets });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
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
            return res.status(404).json({success: false, error: "Pet not found"});
        }
        res.status(200).json({success: true, data: pet});
    } catch(err) {
        res.status(400).json({success: false, error: err.message});
    }
};

const updatePet = async (req, res) => {
    try {
        const pet = await prisma.pet.update({
            where: {id: Number(req.params.id)},
            data: req.body
        });
        if (!pet) {
            return res.status(404).json({success: false, error: 'Pet not found'});
        }
        res.status(200).json({success: true, data: pet});
    } catch(err) {
        res.status(400).json({success: false, error: err.message});
        console.log(err.stack);
    }
};

const updatePetStatus = async (req, res) => {
  try {
    const petId = Number(req.params.id);
    console.log(petId);
    const { status } = req.body;
    if (Number.isNaN(petId)) {
      return res.status(400).json({ success: false, error: "Invalid petId" });
    }
    if (!status) {
      return res.status(400).json({ success: false, error: "status is required" });
    }

    const pet = await prisma.pet.update({
      where: { id: petId },
      data: { status },
    });

    res.status(200).json({ success: true, data: pet });
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ success: false, error: "Pet not found" });
    }
    res.status(500).json({ success: false, error: err.message });
  }
};

const deletePet = async (req, res) => {
    try {
        const pet = await prisma.pet.delete({
            where: {id: Number(req.params.id)}
        });
        if (!pet) {
            return res.status(404).json({success: false, error: 'Pet not found'});
        }
        res.status(200).json({success: true, data: {}});
    } catch(err) {
        res.status(400).json({success: false, error: err.message});
    }
};

const getCustomerPets = async (req, res) => {
  try {
    const userId = Number(req.query.userId);
    const fields = req.query.fields ? req.query.fields.split(',') : ['name', 'breed', 'sex', 'age', 'type', 'status','breed', 'disease', 'allergic', 'picture'];

    const select = {};
    fields.forEach(f => select[f] = true);

    const pets = await prisma.pet.findMany({
      where: { customerId: userId },
      select
    });

    if (!pets || pets.length === 0) {
      return res.status(404).json({ success: false, msg: "There is no pet for this customer" });
    }

    res.status(200).json({ success: true, data: pets });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};


const getCustomerPetNamesWithAvailable = async (req, res)=> { //requirement: 4
    try {
        const userId = Number(req.query.userId);
        const bookingDate = new Date();

        const pets = await prisma.pet.findMany({
            where: {
                customerId: {userId: userId},
                bookedRooms: {
                    none: {
                        checkIn: { lte: bookingDate },
                        checkOut: { gte: bookingDate } 
                    }
                }
            },
            select: {
                name: true
            }
        });

        if(!pets) return res.status(400).json({success: false, msg: "There is no pet available"});
        res.status(200).json({success: true, data: pets});
    }catch(err){
        res.status(400).json({success: false, error: err.message});
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