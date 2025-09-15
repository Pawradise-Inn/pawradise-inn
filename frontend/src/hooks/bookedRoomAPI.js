import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/bookedRoom';

export const fetchTodaysBookedRoomsAPI = async () => {
  const response = await axios.get(`${API_URL}/dashboard`);
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