const { getSignedJwtToken } = require("../controllers/logics/auth");

exports.sendTokenResponse = (user, statusCode, res) => {
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
  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      user
    })
};