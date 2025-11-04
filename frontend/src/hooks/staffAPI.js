import axiosInstance from "../api/axiosInstance";

const API_URL = "/api/v1/staffs";

export const fetchStaffAPI = async (id) => {
  const response = await axiosInstance.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateStaffProfileAPI = async (id, profileData) => {
  const response = await axiosInstance.put(`${API_URL}/${id}`, profileData);
  return response.data;
};
