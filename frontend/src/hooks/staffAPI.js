import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/staff";

export const fetchStaffAPI = async (id, token = localStorage.getItem("token")) => {
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};

export const updateStaffProfileAPI = async (id, profileData, token = localStorage.getItem("token")) => {
  const response = await axios.put(`${API_URL}/${id}`, profileData, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};
