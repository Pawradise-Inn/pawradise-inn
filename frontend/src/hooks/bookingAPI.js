import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/booking';

export const fetchCustomerBookingsAPI = async (customerId) => {
  const response = await axios.get(`${API_URL}/mine?customerId=${customerId}`);
  return response.data.data || []; // ensure it always returns an array
};

export const cancelBookingAPI = async (bookingId) => {
  const response = await axios.delete(`${API_URL}/${bookingId}/cancel`);
  return response.data;
};

export const deleteBookingAPI = async (bookingId) => {
  const response = await axios.delete(`${API_URL}/${bookingId}`);
  return response.data;
};
