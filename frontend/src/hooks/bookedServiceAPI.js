import axiosInstance from "../api/axiosInstance";

const API_URL = "/api/v1/bookedServices";

export const getTodayService = async () => {
  const response = await axiosInstance.get(`${API_URL}/dashboard`);
  return response.data;
};


export const createBookedService = async (bookedServiceData) => {
  const response = await axiosInstance.post(API_URL, bookedServiceData);
  return response.data;
};

export const deleteBookedService = async (id) => {
  const response = await axiosInstance.delete(`${API_URL}/${id}`);
  return response.data;
};

export const fetchAllBookedServiceAPI = async () => {
  const response = await axiosInstance.get(API_URL);
  return response.data;
};

export const getBookedService = async (id) => {
  const response = await axiosInstance.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateBookedService = async (id, bookedService) => {
  const response = await axiosInstance.patch(`${API_URL}/${id}`, bookedService);
  return response.data;
};
