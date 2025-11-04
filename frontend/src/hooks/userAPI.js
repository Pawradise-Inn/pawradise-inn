import axiosInstance from "../api/axiosInstance";

const API_URL = "/api/v1/customers";

export const fetchUserAPI = async (id) => {
  const response = await axiosInstance.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateUserAPI = async (id, updatedUser) => {
  const response = await axiosInstance.put(`${API_URL}/${id}`, updatedUser);
  return response.data;
};
