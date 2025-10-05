import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/auth';

// Register
export const registerAPI = async (user) => {
  const res = await axios.post(`${API_URL}/register`, user);
  return res.data;
};

// Login
export const loginAPI = async (userName, password) => {
  const res = await axios.post(`${API_URL}/login`, { userName, password });
  return res.data;
};

// Get current user (token required)
export const getMeAPI = async (token) => {
  const res = await axios.get(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Update current user
export const updateMeAPI = async (user, token) => {
  const res = await axios.put(`${API_URL}/me`, user, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Logout
export const logoutAPI = async (token) => {
  const res = await axios.post(`${API_URL}/logout`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
