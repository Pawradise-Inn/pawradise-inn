const prisma = require("../prisma/prisma");
const bcrypt = require("../node_modules/bcryptjs/umd/index.js");
const jwt = require("jsonwebtoken");
const { sendTokenResponse } = require("../utils/sendTokenResponse.js");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../utils/responseHandler");
const {
  hashPassword,
  matchPassword,
  getSignedJwtToken,
  findUserByUsername,
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
    if (role == "STAFF") {
      bankAccount = req.body.account;
    }

    if (!firstname || !lastname || !email || !phone || !username || !password) {
      return sendErrorResponse(
        res,
        400,
        "MISSING_FIELDS",
        "Please fill in all required fields to create your account"
      );
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
      await prisma.staff.create({
        data: { userId: user.id, wages: 0, bank_account: bankAccount },
      });
    }

    sendTokenResponse(user, 200, res, "REGISTERED_SUCCESSFULLY");
  } catch (error) {
    console.error(error);

    // Handle unique constraint violations
    if (error.code === "P2002") {
      const field = error.meta?.target[0];
      return sendErrorResponse(
        res,
        409,
        "ALREADY_EXISTS",
        `This ${field} is already taken. Please choose a different one`
      );
    }

    // Handle other errors
    return sendErrorResponse(
      res,
      500,
      "SERVER_ERROR",
      "Unable to create your account. Please try again"
    );
  }
};

exports.getMe = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

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

    if (!user) {
      return sendErrorResponse(
        res,
        404,
        "NOT_FOUND",
        "Your profile could not be found"
      );
    }

    return sendSuccessResponse(
      res,
      200,
      "LOADED_SUCCESSFULLY",
      "Profile loaded",
      user
    );
  } catch (err) {
    console.error(err);
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_LOAD",
      "Unable to load your profile. Please refresh and try again"
    );
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
    if (!user) {
      return sendErrorResponse(
        res,
        404,
        "NOT_FOUND",
        "Your profile could not be found"
      );
    }
    return sendSuccessResponse(
      res,
      200,
      "PROFILE_UPDATED",
      "Your profile has been updated successfully",
      user
    );
  } catch (err) {
    return sendErrorResponse(
      res,
      500,
      "SERVER_ERROR",
      "Unable to update your profile. Please try again"
    );
  }
};

exports.deleteMe = async (req, res) => {
  try {
    const idParam = req.user.id;

    const user = await prisma.user.delete({
      where: { id: Number(idParam) },
    });
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    return sendSuccessResponse(
      res,
      200,
      "DELETED_SUCCESSFULLY",
      "Account deleted and logged out successfully"
    );
  } catch (err) {
    return sendErrorResponse(
      res,
      500,
      "SERVER_ERROR",
      "Unable to delete your account. Please try again"
    );
  }
};

exports.login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;

  if (!userName || !password) {
    return sendErrorResponse(
      res,
      400,
      "MISSING_FIELDS",
      "Please enter both username and password"
    );
  }

  const user = await findUserByUsername(userName);
  if (!user) {
    return sendErrorResponse(
      res,
      401,
      "UNAUTHORIZED",
      "Invalid username or password"
    );
  }

  // Match password
  const isMatch = await matchPassword(password, user.password);
  if (!isMatch) {
    return sendErrorResponse(
      res,
      401,
      "UNAUTHORIZED",
      "Invalid username or password"
    );
  }
  // Create token
  sendTokenResponse(user, 200, res, "LOGIN_SUCCESSFUL");
  } catch (error) {
    console.error(error)
    return sendErrorResponse(
      res,
      500,
      "SERVER_ERROR",
      "Unable to login your account. Please try again"
    );
  }
};

exports.logout = async (req, res, next) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return sendSuccessResponse(
    res,
    200,
    "LOGOUT_SUCCESSFUL",
    "You have been logged out successfully"
  );
};
