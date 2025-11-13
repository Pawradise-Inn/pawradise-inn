import axiosInstance from "../api/axiosInstance"

const API_URL = "/api/v1/payments"

export const fetchMyPayments = async() =>{
    try{
        const response = await axiosInstance.get(`${API_URL}/mine`)
        return response.data
    }
    catch(error){
        console.error( "Error fetching payments", error)
        throw error
    }
};

export const fetchAllPaymentAPI = async () => {
  const response = await axiosInstance.get(API_URL);
  return response.data;
};

export const createPaymentAPI = async ({ status, amount, slip }) => {
  try {
    const response = await axiosInstance.post("/api/v1/payments", {
      status,
      amount, // required by backend
      slip,   // can be undefined if no slip uploaded yet
    });
    return response.data;
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
};

export const updatePaymentAPI = async (paymentId, { status, slip, date }) => {
  try {
    // Only include defined fields (avoid sending undefined)
    const dataToSend = {};
    if (status) dataToSend.status = status;
    if (slip) dataToSend.slip = slip;
    if (date) dataToSend.date = date;

    if (Object.keys(dataToSend).length === 0) {
      throw new Error("No data provided to update payment");
    }

    const response = await axiosInstance.put(`${API_URL}/${paymentId}`, dataToSend);
    return response.data;
  } catch (error) {
    console.error(`Error updating payment ID ${paymentId}:`, error.response?.data || error);
    throw error;
  }
};

export const updatePaymentStatusAPI = async (paymentId, newStatus) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/${paymentId}`, {
      status: newStatus,
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating payment status for ID ${paymentId}`, error);
    throw error;
  }
};

export const generateQrAPI = async () => {
  try {
    const response = await axiosInstance.post("/api/v1/qr/generateQr");
    return response.data;
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw error;
  }
};
