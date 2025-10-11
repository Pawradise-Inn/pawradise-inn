import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/bookedService";

export const getTodayService = async () => {
  const response = await axios.get(`${API_URL}dashboard`);
  return response.data;
};

export const createBookedService = async (bookedServiceData, token) => {
  const response = await axios.post(API_URL, bookedServiceData, {
        headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteBookedService = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const fetchAllBookedServiceAPI = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
