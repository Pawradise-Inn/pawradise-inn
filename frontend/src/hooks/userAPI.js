import axios from "axios";

const API_URL = "http://localhost:5050/api/v1/customer";

export const fetchUserAPI = async (id, token = localStorage.getItem("token")) => {
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};

export const updateUserAPI = async (id, updatedUser, token = localStorage.getItem("token")) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedUser, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};
