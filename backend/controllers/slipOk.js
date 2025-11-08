const checkSlip = async (req, res) => {
  try {
    const response = await axios.post(
      `https://api.slipok.com/api/line/apikey/${process.env.BRANCH_ID}`,
      req.body,
      {
        headers: { "x-authorization": process.env.API_KEY },
      }
    );
    res.json(response.data);
  } catch (err) {
    console.log(err)
    return sendErrorResponse(
      res,
      500,
      "UNABLE_TO_CHECK_SLIP",
      "Unable to check the slip. Please try again"
    );
  }
};

module.exports = {
    checkSlip
}