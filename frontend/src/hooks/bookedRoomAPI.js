import axiosInstance from "../api/axiosInstance";

const API_URL = "/api/v1/bookedRooms";

export const getTodayRoom = async () => {
  const response = await axiosInstance.get(`${API_URL}/dashboard/checkins`);
  return response.data;
};

export const getTodayCheckOuts = async () => {
  const response = await axiosInstance.get(`${API_URL}/dashboard/checkouts`);
  return response.data;
}

export const createBookedRoom = async (bookedRoom) => {
  const response = await axiosInstance.post(API_URL, bookedRoom);
  return response.data;
};

export const deleteBookedRoom = async (id) => {
  const response = await axiosInstance.delete(`${API_URL}/${id}`);
  return response.data;
};

export const fetchAllBookedRoomsAPI = async () => {
  const response = await axiosInstance.get(API_URL);
  return response.data;
};

export const getBookedRoom = async (id) => {
  const response = await axiosInstance.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateBookedRoom = async (id, bookedRoom) => {
  const response = await axiosInstance.patch(`${API_URL}/${id}`, bookedRoom);
  return response.data;
};
