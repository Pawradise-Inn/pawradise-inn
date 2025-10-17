import axiosInstance from "../api/axiosInstance";

const API_URL = "/api/v1/booking";

export const fetchMyBookingAPI = async (id) => {
  const response = await axiosInstance.get(`${API_URL}/${id}`);
  return response.data;
};

// 1. Fetch all bookings for a specific customer ID
export const fetchMyBookings = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/mine`);
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};

// 2. Cancel a specific booking by ID
export const cancelBooking = async (id) => {
  try {
    const response = await axiosInstance.patch(`${API_URL}/cancel/${id}`, {});
    return response.data;
  } catch (error) {
    console.error("Error canceling booking:", error);
    throw error;
  }
};

// 3. Delete a booking by ID
export const deleteBooking = async (id) => {
  try {
    const response = await axiosInstance.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
};

export const updateBooking = async (id, book) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/${id}`, book);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateBookingStatus = async (id, status) => {
  try {
    const response = await axiosInstance.patch(`${API_URL}/${id}`, status);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all bookings (for staff)
export const getAllBookings = async () => {
  try {
    const response = await axiosInstance.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    throw error;
  }
};

// Create new booking
export const createBooking = async (booking) => {
  try {
    const response = await axiosInstance.post(API_URL, booking);
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};
