import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/booking";
// const API_URL = 'http://localhost:5050/api/v1/booking';

export const fetchMyBookingAPI = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// 1. Fetch all bookings for a specific customer ID
export const fetchMyBookings = async (customerId) => {
  try {
    const response = await axios.get(`${API_URL}/mine`, {
      params: { customerId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};

// 2. Cancel a specific booking by ID
export const cancelBooking = async (id) => {
  try {
    const response = await axios.patch(`${API_URL}/cancel/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error canceling booking:", error);
    throw error;
  }
};

// 3. Delete a booking by ID
export const deleteBooking = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
};

export const updateBooking = async (id, book) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, book);
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
};

export const updateBookingStatus = async (id, status) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, status);
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
};
