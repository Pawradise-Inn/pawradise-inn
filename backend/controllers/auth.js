const prisma = require("../prisma/prisma");
const bcrypt = require("../node_modules/bcryptjs/umd/index.js");
const jwt = require("jsonwebtoken");
const { sendTokenResponse } = require("../utils/sendTokenResponse.js");
const {
  hashPassword,
  matchPassword,
  getSignedJwtToken,
  findUserByUsername
} = require("./logics/auth.js");

exports.register = async (req, res, next) => {
  try {
    const firstname = req.body.firstname ?? req.body.first_name;
    const lastname = req.body.lastname ?? req.body.last_name;
    const email = (req.body.email || "").trim();
    const phone = req.body.phoneNumber ?? req.body.phone_number;
    const username = req.body.userName ?? req.body.user_name;
    const password = req.body.password;
    const role = (req.body.role ?? "CUSTOMER").toUpperCase();
    let bankAccount;
    if (role == "STAFF"){
      bankAccount = req.body.account;
    }

    if (!firstname || !lastname || !email || !phone || !username || !password) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const hashed = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        firstname,
        lastname,
        email,
        phone_number: phone,
        user_name: username,
        password: hashed,
        role,
      },
    });

    if (user.role === "CUSTOMER") {
      await prisma.customer.create({ data: { userId: user.id } });
      }
    if (user.role === "STAFF") {
      await prisma.staff.create({ data: { userId: user.id, wages: 0, bank_account: bankAccount } });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    console.error(error);
    
    // Handle unique constraint violations
    if (error.code === 'P2002') {
      const field = error.meta?.target[0];
      return res.status(409).json({ 
        success: false, 
        message: `This ${field} is already taken` 
      });
    }
    
    // Handle other errors
    return res.status(500).json({ 
      success: false, 
      message: 'Unable to create account. Please try again later.', 
      error: error.message
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role

    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        phone_number: true,
        user_name: true,
        role: true,
        customer: {
          select: {
            id: true,
            pets: {
              include: {
                stayed: true,
                scheduled: true,
              },
            },
          },
        },
      },
    });

    if (!user)
      return res.status(404).json({ success: false, message: "Profile not found. Please try again" });

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message, message: "Unable to fetch profile. Please try again later" });
  }
};

exports.updateMe = async (req, res) => {
  try {
    const idParam = req.user.id;

    const dataUpdate = {};
    if (req.body.firstname) dataUpdate.firstname = req.body.firstname;
    if (req.body.lastname) dataUpdate.lastname = req.body.lastname;
    if (req.body.email) dataUpdate.email = req.body.email;
    if (req.body.phone_number) dataUpdate.phone_number = req.body.phone_number;
    if (req.body.user_name) dataUpdate.user_name = req.body.user_name;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      dataUpdate.password = hashed;
    }

    const user = await prisma.user.update({
      where: { id: Number(idParam) },
      data: dataUpdate,
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        phone_number: true,
        user_name: true,
        role: true,
      },
    });
    if (!user) return res.status(404).json({ success: false, message: "Profile not found. Please try again" });
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message, message: "Unable to update profile. Please try again later" });
  }
};

exports.deleteMe = async (req, res) => {
  try {
    const idParam = req.user.id;
    
    const user = await prisma.user.delete({
      where: { id: Number(idParam) },
    });
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0),
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
    });
    res.status(200).json({ success: true, message: 'Deleted and Logged out' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message, message: "Unable to delete profile. Please try again later" });
  }
};

exports.login = async (req, res, next) => {
    const { userName, password } = req.body;

    if (!userName || !password) {
        return res.status(400).json({ success: false, message: 'Please enter both username and password' });
    }

    const user = await findUserByUsername(userName);
    if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    // Match password
    const isMatch = await matchPassword(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ success: false, message: 'username or password are wrong' });
    }
    // Create token
    sendTokenResponse(user, 200, res);
};

exports.logout = async (req, res, next) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0),
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
    });
    res.status(200).json({ success: true, message: 'Logged out' });
};
