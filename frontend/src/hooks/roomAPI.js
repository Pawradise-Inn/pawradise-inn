import axiosInstance from "../api/axiosInstance";

const API_URL = "/api/v1/rooms";

export const fetchAllRoomsAPI = async () => {
  const response = await axiosInstance.get(API_URL);
  return response.data;
};

export const fetchRoomAPI = async (id) => {
  const response = await axiosInstance.get(`${API_URL}/${id}`);
  return response.data;
};

export const addRoomAPI = async (room) => {
  const response = await axiosInstance.post(API_URL, room);
  return response.data;
};

export const updateRoomAPI = async (id, roomData) => {
  const response = await axiosInstance.patch(`${API_URL}/${id}`, roomData);
  return response.data;
};

export const deleteRoomAPI = async (id) => {
  const response = await axiosInstance.delete(`${API_URL}/${id}`);
  return response.data;
};

export const fetchAvailableRoomsAPI = async (
  checkIn,
  checkOut,
) => {
  const response = await axiosInstance.get(`${API_URL}/available`, {
    params: { checkIn, checkOut },
  });
  return response.data;
};

export const fetchRoomStatusAPI = async (id, entry_date, exit_date) => {
  const response = await axiosInstance.get(`${API_URL}/${id}/status`, {
    params: { entry_date, exit_date }
  });
  return response.data;
};

export const fetchAllRoomsWithPaginationAPI = async () => {
  const response = await axiosInstance.get(`${API_URL}/reviews`);
  return response.data;
};

export const fetchRoomReviewsAPI = async (roomId, star, NSP) => {
  const response = await axiosInstance.get(`${API_URL}/${roomId}/reviews`, {
    params: { roomId, star, NSP }
  });
  return response.data;
};

export const addPicturesToRoomAPI = async (id, picture) => {
  const response = await axiosInstance.post(`${API_URL}/${id}/pictures`, { picture });
  return response.data;
};

export const deletePicturesFromRoomAPI = async (id, picture) => {
  const response = await axiosInstance.delete(`${API_URL}/${id}/pictures`, { picture });
  return response.data;
};
