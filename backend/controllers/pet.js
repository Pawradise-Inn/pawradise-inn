const prisma = require('../prisma/prisma');

exports.register = async (req, res) => {
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


exports.getPet = async (req, res) => {  //Both
    try {
        const pet = await prisma.pet.findUnique({
            where: {
                id: Number(req.params.id)
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

exports.updatePet = async (req, res) => {
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

exports.updatePetStatus = async (req, res) => {
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

exports.deletePet = async (req, res) => {
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

const getCustomerPetNames = async (req, res) =>{ //requirement: 3
    try {
        const userId = Number(req.query.userId);
        const bookingDate = new Date(req.query.date);

        const pets = await prisma.pet.findMany({
            where: {
                customerId: {
                  userId: userId
                },
            },
            select: {
                name: true
            }
        });

        if(!pets) return res.status(400).json({success: false, msg: "There is no pet for this customer"});
        res.status(200).json({success: true, data: pets});
    }catch(err){
        res.status(400).json({success: false, error: err.message});
    }
};

const getCustomerPetNamesWithAvailable = async (req, res)=> { //requirement: 4
    try {
        const userId = Number(req.query.userId);
        const bookingDate = new Date(req.query.date);

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
