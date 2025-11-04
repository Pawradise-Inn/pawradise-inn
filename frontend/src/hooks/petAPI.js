import axiosInstance from "../api/axiosInstance";

const API_URL = "/api/v1/pets";

export const fetchAllPetAPI = async () => {
  const response = await axiosInstance.get(API_URL);
  return response.data;
};

export const fetchPetAPI = async (id) => {
  const response = await axiosInstance.get(`${API_URL}/${id}`);
  return response.data;
};

export const updatePetAPI = async (id, pet) => {
  const response = await axiosInstance.put(`${API_URL}/${id}`, pet);
  return response.data;
};

export const deletePetAPI = async (id) => {
  const response = await axiosInstance.delete(`${API_URL}/${id}`);
  return response.data;
};

export const updatePetStatusAPI = async (id, status) => {
  const response = await axiosInstance.patch(`${API_URL}/${id}`, {status});
  return response.data;
};

export const registerPetAPI = async (customerId, pet) => {
  const response = await axiosInstance.post(`${API_URL}/register`, {...pet, customerId});
  return response.data;
};

export const fetchAvailablePetAPI = async (
  customerId) => {
  const response = await axiosInstance.get(`${API_URL}/${customerId}/available`);
  return response.data;
};

export const fetchCustomerPets = async (customerId, fields) => {
  const params = {};
  fields.forEach((field) => {
    params[field] = true;
  });

  const response = await axiosInstance.get(`${API_URL}/${customerId}/available`, { params });
  return response.data;
};

export const fetchPetTypesAPI = async () => {
  const response = await axiosInstance.get(`${API_URL}/pet-types`);
  return response.data;
};