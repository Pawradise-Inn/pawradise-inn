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
      return sendErrorResponse(res, 404, "NOT_FOUND", "Staff profile not found. Please contact an administrator");
    }
    if (err.code === 'P2002') {
      return sendErrorResponse(res, 409, "ALREADY_EXISTS", "This email or username is already in use");
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
            return sendErrorResponse(res, 404, "PROFILE_NOT_FOUND", "Staff profile not found");
        }
        return sendSuccessResponse(res, 200, "LOADED_SUCCESSFULLY", "Staff profile loaded", staffWithInformation);
    }catch(err){
        return sendErrorResponse(res, 500, "UNABLE_TO_LOAD", "Unable to load staff profile. Please refresh and try again");
    }
};