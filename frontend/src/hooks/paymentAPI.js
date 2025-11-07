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