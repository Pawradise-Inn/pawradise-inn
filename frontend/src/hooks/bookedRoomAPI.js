import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/bookedRoom";

export const getTodayRoom = async () => {
  const response = await axios.get(`${API_URL}/dashboard`);
  return response.data;
};

export const createBookedRoom = async (bookedRoom, token) => {
  console.log(token)
  const response = await axios.post(API_URL, bookedRoom,{
        headers: { Authorization: `Bearer ${token}` },
  });
  
  return response.data;
};

export const deleteBookedRoom = async (id, token = localStorage.getItem("token")) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};

export const fetchAllBookedRoomsAPI = async (token = localStorage.getItem("token")) => {
  const response = await axios.get(API_URL, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};

export const getBookedRoom = async (id, token = localStorage.getItem("token")) => {
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};

export const updateBookedRoom = async (id, bookedRoom, token = localStorage.getItem("token")) => {
  const response = await axios.patch(`${API_URL}/${id}`, bookedRoom, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};
