import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/bookedRoom';

export const fetchAllBookedRoomsAPI = async () => {
  const response = await axios.get(API_URL);
  return response.data;
}

export const fetchTodaysBookedRoomsAPI = async () => {
  const response = await axios.get(`${API_URL}/dashboard`);
  return response.data;
};

// You need this function for editing and status changes.
export const updateBookedRoomAPI = async (id, bookingData) => {
  const response = await axios.patch(`${API_URL}/${id}`, bookingData);
  return response.data;
};

export const addBookedRoomAPI = async (bookedRoom) => {
  const response = await axios.post(API_URL, bookedRoom);
  return response.data;
};

export const deleteBookedRoomAPI = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};