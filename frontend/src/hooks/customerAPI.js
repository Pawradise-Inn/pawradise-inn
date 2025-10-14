import axiosInstance from "../api/axiosInstance";

const API_URL = "/api/v1/customer";

export const fetchCustomerAPI = async (id) => {
  const response = await axiosInstance.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateCustomerAPI = async (id, customer) => {
  const response = await axiosInstance.put(`${API_URL}/${id}`, customer);
  return response.data;
};
