import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/pet";

export const fetchAllPetAPI = async (token = localStorage.getItem("token")) => {
  const response = await axios.get(API_URL, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};

export const fetchPetAPI = async (
  id,
  token = localStorage.getItem("token")
) => {
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};

export const updatePetAPI = async (
  id,
  pet,
  token = localStorage.getItem("token")
) => {
  const response = await axios.put(`${API_URL}/${id}`, pet, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};

export const deletePetAPI = async (
  id,
  token = localStorage.getItem("token")
) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};

export const updatePetStatusAPI = async (
  pet,
  token = localStorage.getItem("token")
) => {
  const response = await axios.patch(API_URL, pet, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};

export const registerPetAPI = async (
  customerId,
  pet,
  token = localStorage.getItem("token")
) => {
  const response = await axios.post(`${API_URL}/register`,  {...pet, customerId}, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};

export const fetchAvailablePetAPI = async (
  customerId,
  token = localStorage.getItem("token")
) => {

  const response = await axios.get(`${API_URL}/${customerId}/available`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};

export const fetchCustomerPets = async (customerId, fields, token) => {
  const params = {};
  fields.forEach((field) => {
    params[field] = true;
  });

  const response = await axios.get(`${API_URL}/${customerId}/available`, {
    params,
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
