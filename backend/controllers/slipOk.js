const axios = require("axios");

const checkSlip = async (req, res) => {
  try {
    const response = await axios.post(
      `https://api.slipok.com/api/line/apikey/${process.env.BRANCH_ID}`,
      req.body,
      {
        headers: { "x-authorization": process.env.API_KEY },
      }
    );

    // Ensure we always return a consistent response structure
    return res.status(200).json({
      success: true,
      data: response.data,
    });

  } catch (err) {
    const slipError = err.response?.data;

    console.error("SlipOK error:", slipError || err.message);

    // Always return 200 status to avoid axios interceptor issues
    // The success: false flag indicates the error
    return res.status(200).json({
      success: false,
      code: slipError?.code || "SLIPOK_ERROR",
      message: slipError?.message || "Unknown error while verifying slip",
      data: slipError?.data || null,
      fullError: slipError, // Include full error for debugging
    });
  }
};

module.exports = { checkSlip };
