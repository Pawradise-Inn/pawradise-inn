const prisma = require('../prisma/prisma');
const { sendErrorResponse, sendSuccessResponse } = require("../utils/responseHandler");
//const { findUserByUsername, matchPassword, getSignedJwtToken } = require("./logics/auth");

exports.updateMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return sendErrorResponse(res, 401, "UNAUTHORIZED", "Please log in to update your profile");
    }

    const { firstname, lastname, email, phone_number, user_name, password, wages, bank_company, bank_account} = req.body;

    const result = await prisma.$transaction(async (tx) => {
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: {
          firstname,
          lastname,
          email,
          phone_number,
          user_name,
          password,
        },
      });

      const updatedStaff = await tx.staff.update({
        where: { userId },
        data: {
            wages,
            bank_company,
            bank_account
         },
      });

      return { updatedUser, updatedStaff };
    });

    return sendSuccessResponse(res, 200, "PROFILE_UPDATED", "Your profile has been updated successfully", result);
  } catch (err) {
    if (err.code === 'P2025') {
      return sendErrorResponse(res, 404, "NOT_FOUND", "Your profile could not be found");
    }
    if (err.code === 'P2002') {
      const field = err.meta?.target[0];
      
      // Handle specific field messages
      if (field === "phone_number") {
        return sendErrorResponse(
          res,
          409,
          "ALREADY_EXISTS",
          "This phone number is already taken. Please choose a different one"
        );
      }
      
      if (field === "email") {
        return sendErrorResponse(
          res,
          409,
          "ALREADY_EXISTS",
          "This email is already taken. Please choose a different one"
        );
      }
      
      if (field === "user_name") {
        return sendErrorResponse(
          res,
          409,
          "ALREADY_EXISTS",
          "This username is already taken. Please choose a different one"
        );
      }
      
      // Default message for other fields
      return sendErrorResponse(
        res,
        409,
        "ALREADY_EXISTS",
        `This ${field} is already taken. Please choose a different one`
      );
    }
    return sendErrorResponse(res, 500, "SERVER_ERROR", "Unable to update your profile. Please try again");
  }
};

exports.getStaffProfile = async(req, res)=>{ //requirement: 17
    try{
        const staffId = req.params.id;
        const staffWithInformation = await prisma.staff.findUnique({
            where: {
                userId: Number(staffId)
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
                }
            }
        });
        if(!staffWithInformation) {
            return sendErrorResponse(res, 404, "NOT_FOUND", "Your profile could not be found");
        }
        return sendSuccessResponse(res, 200, "LOADED_SUCCESSFULLY", "Profile loaded", staffWithInformation);
    }catch(err){
        return sendErrorResponse(res, 500, "UNABLE_TO_LOAD", "Unable to load your profile. Please refresh and try again");
    }
};