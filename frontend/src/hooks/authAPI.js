import axiosInstance from "../api/axiosInstance";

const API_URL = "/api/v1/auth";

// Register
export const registerAPI = async (user) => {
  const res = await axiosInstance.post(`${API_URL}/register`, user);
  return res.data;
};

// Login
export const loginAPI = async (userName, password) => {
  const res = await axiosInstance.post(`${API_URL}/login`, { userName, password });
  return res.data;
};

// Get current user (token required)
export const getMeAPI = async () => {
  const res = await axiosInstance.get(`${API_URL}/me`);
  return res.data;
};

// Update current user
export const updateMeAPI = async (user) => {
  const res = await axiosInstance.put(`${API_URL}/me`, user);
  return res.data;
};

// Logout
export const logoutAPI = async () => {
  const res = await axiosInstance.post(`${API_URL}/logout`,{});
  return res.data;
};
