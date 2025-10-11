import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/booking";
// const API_URL = 'http://localhost:5050/api/v1/booking';

export const fetchMyBookingAPI = async (id, token = localStorage.getItem("token")) => {
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};

// 1. Fetch all bookings for a specific customer ID
export const fetchMyBookings = async (token = localStorage.getItem("token")) => {
  try {
    const response = await axios.get(`${API_URL}/mine`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};

// 2. Cancel a specific booking by ID
export const cancelBooking = async (id, token = localStorage.getItem("token")) => {
  try {
    const response = await axios.patch(`${API_URL}/cancel/${id}`, {}, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  } catch (error) {
    console.error("Error canceling booking:", error);
    throw error;
  }
};

// 3. Delete a booking by ID
export const deleteBooking = async (id, token = localStorage.getItem("token")) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
};

export const updateBooking = async (id, book, token = localStorage.getItem("token")) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, book, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
};

export const updateBookingStatus = async (id, status, token = localStorage.getItem("token")) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, status, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
};

// Get all bookings (for staff)
export const getAllBookings = async (token = localStorage.getItem("token")) => {
  try {
    const response = await axios.get(API_URL, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    throw error;
  }
};

// Create new booking
export const createBooking = async (booking, token = localStorage.getItem("token")) => {
  try {
    const response = await axios.post(API_URL, booking, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};
