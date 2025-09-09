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
// should be in customer.js
/*exports.getCustomerPets = async (req, res) => { 
    try {
        console.log(req.body);
        const customer = await prisma.customer.findUnique({
            where: {id: Number(req.params.id)},
            include: {
                pet: true
            }
        });
        if (!customer) {
            return res.status(404).json({success: false, error: "Customer not found"});
        }
        res.status(200).json({success: true, data: customer.pet});
    } catch(err) {
        res.status(400).json({success: false, error: err.message});
    }
};*/
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
