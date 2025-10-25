const { getSignedJwtToken } = require("../controllers/logics/auth");
const { sendSuccessResponse } = require("./responseHandler");

exports.sendTokenResponse = (user, statusCode, res, successType) => {
  const token = getSignedJwtToken(user.id);

  const days = Number(process.env.JWT_COOKIE_EXPIRE || 7);
  const options = {
    expires: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "lax",
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
  
  if (statusCode === 200) {
    return sendSuccessResponse(res, 200, successType, null, { user, token }, null)
  }
  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      user
    })
};