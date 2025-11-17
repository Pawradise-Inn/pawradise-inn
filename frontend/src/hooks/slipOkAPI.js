import axiosInstance from "../api/axiosInstance";

export const checkSlipAPI = async (pic_url, amount) => {
  try {
    const res = await axiosInstance.post("/api/v1/slip/check", {
      url: pic_url,
      log: true,
      amount: amount,
    });

    // We check the 'success' flag from our backend's response
    if (res.data.success === false) {
      // This is a "business logic" error (e.g., slip not found)
      // We log it and return the error data.
      console.error("Slip check failed (API reported error):", res.data);
      return res.data;
    }
    
    // If we're here, res.data.success === true
    console.log("Slip check successful:", res.data);
    return res.data;

  } catch (error) {
    // This 'catch' block will now only run for *network* errors 
    // or if your own backend server is down (e.g., 500 crash).
    const err = error.response?.data;
    console.error("Slip check failed (Network/Server error):", error);

    // Return a consistent error structure
    return {
      success: false,
      code: err?.code || "NETWORK_ERROR",
      message: err?.message || "Failed to connect to verification server",
      data: err?.data || null,
      rawError: err,
    };
  }
};