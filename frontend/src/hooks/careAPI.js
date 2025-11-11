import axiosInstance from "../api/axiosInstance";

const API_URL = "/api/v1/cares";

export const getCaresAPI = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const response = await axiosInstance.get(`${API_URL}?${query}`);
  return response.data;
};

export const getCareAPI = async (id) => {
  const response = await axiosInstance.get(`${API_URL}/${id}`);
  return response.data;
};

export const createCareAPI = async (careData) => {
  const response = await axiosInstance.post(API_URL, careData);
  return response.data;
};

export const deleteCareAPI = async (id) => {
  const response = await axiosInstance.delete(`${API_URL}/${id}`);
  return response.data;
};
