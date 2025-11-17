// src/hooks/roomAPI.js
import axiosInstance from "../api/axiosInstance";

const API_URL = "/api/v1/rooms";

export const fetchAllRoomsAPI = async () => {
  const response = await axiosInstance.get(API_URL);
  return response.data; // envelope from sendSuccessResponse
};

export const fetchRoomAPI = async (id) => {
  const response = await axiosInstance.get(`${API_URL}/${id}`);
  return response.data;
};

export const addRoomAPI = async (room) => {
  // backend createRoom expects: { name, capacity, price, type, picture }
  const response = await axiosInstance.post(API_URL, room);
  return response.data;
};

export const updateRoomAPI = async (id, roomData) => {
  // backend updateRoom uses: price, name, petType, capacity, picture
  const response = await axiosInstance.patch(`${API_URL}/${id}`, roomData);
  return response.data;
};

export const deleteRoomAPI = async (id) => {
  const response = await axiosInstance.delete(`${API_URL}/${id}`);
  return response.data;
};

export const fetchAvailableRoomsAPI = async (checkIn, checkOut) => {
  const response = await axiosInstance.get(`${API_URL}/available`, {
    params: { checkIn, checkOut },
  });
  return response.data;
};

export const fetchRoomStatusAPI = async (id, entry_date, exit_date) => {
  const response = await axiosInstance.get(`${API_URL}/${id}/status`, {
    params: { entry_date, exit_date },
  });
  return response.data;
};

// ⬇️ This hits the "rooms with pagination" / formatted rooms endpoint
// In your controller this is very likely wired to getRoomsWithPagination
// which returns an array of formattedRooms in `data`.
export const fetchAllRoomsWithPaginationAPI = async () => {
  const response = await axiosInstance.get(`${API_URL}/reviews`);
  // sendSuccessResponse → { success, code, message, data, meta }
  return response.data; // this is the array of rooms
};

// For room reviews list
export const fetchRoomReviewsAPI = async (roomId, star, NSP) => {
  const response = await axiosInstance.get(`${API_URL}/${roomId}/reviews`, {
    params: { roomId, star, NSP },
  });
  return response.data;
};

export const addPicturesToRoomAPI = async (id, picture) => {
  const response = await axiosInstance.post(`${API_URL}/${id}/pictures`, {
    picture,
  });
  return response.data;
};

export const deletePicturesFromRoomAPI = async (id) => {
  const response = await axiosInstance.delete(`${API_URL}/${id}/pictures`);
  return response.data;
};
