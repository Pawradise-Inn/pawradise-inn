import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/users";

export const fetchUserAPI = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateUserAPI = async (id, updatedUser) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedUser);
  return response.data;
};
