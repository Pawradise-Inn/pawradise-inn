import axiosInstance from "../api/axiosInstance";

export const checkSlipAPI = async (pic_url, amount) => {
  try {
    const res = await axiosInstance.post("/api/v1/slip/check", {
      url: pic_url,
      log: true,
      amount: amount,
    });

    console.log("SlipOK API response:", res.data);
    return res.data;

  } catch (error) {
    // Get the error data from response
    const err = error.response?.data;
    console.error("Slip check failed - Full error:", error);
    console.error("Slip check failed - Error data:", err);

    // Return the error object with all available information
    return {
      success: false,
      code: err?.code || "SLIP_CHECK_ERROR",
      message: err?.message || "Failed to verify slip",
      data: err?.data || null,
      rawError: err, // Include the full error for debugging
    };
  }
};
