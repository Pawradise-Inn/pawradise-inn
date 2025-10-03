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
  //requirement: 10
  try {
    // Accept either camelCase or snake_case keys from frontend
    const firstname = req.body.firstname ?? req.body.firstname;
    const lastname = req.body.lastname ?? req.body.lastname;
    const email = (req.body.email || "").trim();
    const phone = req.body.phoneNumber ?? req.body.phoneNumber;
    const username = req.body.userName ?? req.body.userName;
    const password = req.body.password;
    const role = (req.body.role ?? "CUSTOMER").toUpperCase(); // if Role is enum

    const hashed = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone_number: phone,
        user_name: username,
        password: hashed,
        role: role,
      },
    });

    if (user.role === "CUSTOMER") {
      await prisma.customer.create({ data: { userId: user.id } });
    }

    if (user.role === "STAFF") {
      await prisma.staff.create({
        data: { userId: user.id, wages: 0, bank_account: "TBD" },
      });
    }

    // Create token
    //const token = user.getSignedJwtToken();
    //res.status(200).json({success: true, token});
    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false});
  }
};

exports.getMe = async (req, res) => {
  //requirement: 11
  try {
    const idParam = req.params.id;
    if (!idParam)
      return res
        .status(400)
        .json({ success: false, error: "Missing id param" });

    const user = await prisma.user.findUnique({
      where: { id: Number(idParam) },
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

    if (!user)
      return res.status(404).json({ success: false, error: "User not found" });
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateMe = async (req, res) => {
  try {
    const idParam = req.params.id;
    if (!idParam)
      return res
        .status(400)
        .json({ success: false, error: "Missing id param" });
    const { firstname, lastname, email, phone_number, user_name, password } =
      req.body;

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await prisma.user.update({
      where: { id: Number(idParam) },
      data: {
        firstname,
        lastname,
        email,
        phone_number,
        user_name,
        password: hashed,
      },
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
    if (!user)
      return res.status(404).json({ success: false, error: "User not found" });
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteMe = async (req, res) => {
  try {
    const idParam = req.params.id;
    if (!idParam)
      return res
        .status(400)
        .json({ success: false, error: "Missing id param" });
    const user = await prisma.user.delete({
      where: { id: Number(idParam) },
    });
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0),
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
    });
    res.status(200).json({ success: true, message: 'Logged out' });
    if (!user)
      return res.status(404).json({ success: false, error: "User not found" });
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.login = async (req, res, next) => {
    const { userName, password } = req.body;

    if (!userName || !password) {
        return res.status(400).json({ success: false, message: 'Please provide an email and password' });
    }

    const user = await findUserByUsername(userName);
    if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Match password
    const isMatch = await matchPassword(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
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
