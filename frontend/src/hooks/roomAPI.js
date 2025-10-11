import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/room";

export const fetchAllRoomsAPI = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const fetchRoomAPI = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const addRoomAPI = async (room, token = localStorage.getItem("token")) => {
  const response = await axios.post(API_URL, room, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};

export const updateRoomAPI = async (id, roomData, token = localStorage.getItem("token")) => {
  const response = await axios.patch(`${API_URL}/${id}`, roomData, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};

export const deleteRoomAPI = async (id, token = localStorage.getItem("token")) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};

export const fetchAvailableRoomsAPI = async (
  checkIn,
  checkOut,
) => {
  const response = await axios.get(`${API_URL}/available`, {
    params: { checkIn, checkOut },
  });
  return response.data;
};

export const fetchRoomStatusAPI = async (id, entry_date, exit_date) => {
  const response = await axios.get(`${API_URL}/${id}/status`, {
    params: { entry_date, exit_date }
  });
  return response.data;
};

export const fetchAllRoomsWithPaginationAPI = async () => {
  const response = await axios.get(`${API_URL}/reviews`);
  return response.data;
};

export const fetchRoomReviewsAPI = async (roomId, star, NSP) => {
  const response = await axios.get(`${API_URL}/${roomId}/reviews`, {
    params: { roomId, star, NSP }
  });
  return response.data;
};

export const addPicturesToRoomAPI = async (id, picture, token = localStorage.getItem("token")) => {
  const response = await axios.post(`${API_URL}/${id}/pictures`, { picture }, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};

export const deletePicturesFromRoomAPI = async (id, picture, token = localStorage.getItem("token")) => {
  const response = await axios.delete(`${API_URL}/${id}/pictures`, {
    data: { picture },
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};
