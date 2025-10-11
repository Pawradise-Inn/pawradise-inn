import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/bookedService";

export const getTodayService = async () => {
  const response = await axios.get(`${API_URL}/dashboard`);
  return response.data;
};

export const createBookedService = async (bookedServiceData, token = localStorage.getItem("token")) => {
  const response = await axios.post(API_URL, bookedServiceData, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};

export const deleteBookedService = async (id, token = localStorage.getItem("token")) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};

export const fetchAllBookedServiceAPI = async (token = localStorage.getItem("token")) => {
  const response = await axios.get(API_URL, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};

export const getBookedService = async (id, token = localStorage.getItem("token")) => {
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};

export const updateBookedService = async (id, bookedService, token = localStorage.getItem("token")) => {
  const response = await axios.patch(`${API_URL}/${id}`, bookedService, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};
