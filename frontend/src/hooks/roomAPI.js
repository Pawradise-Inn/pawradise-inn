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

export const addRoomAPI = async (room) => {
  const response = await axios.post(API_URL, room);
  return response.data;
};

export const updateRoomAPI = async (id, roomData) => {
  const response = await axios.patch(`${API_URL}/${id}`, roomData);
  return response.data;
};

export const deleteRoomAPI = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const fetchAvailableRoomsAPI = async (
  entry_date_with_time,
  exit_date_with_time
) => {
  const response = await axios.get(`${API_URL}/available`, {
    params: { entry_date_with_time, exit_date_with_time },
  });
  return response.data;
};

export const fetchRoomStatusAPI = async (id, entry_date, exit_date) => {
  const response = await axios.get(`${API_URL}/${id}/status`, {
    params: { entry_date, exit_date },
  });
  return response.data;
};

export const fetchAllRoomsWithReviewsAPI = async () => {
  const response = await axios.get(`${API_URL}/reviews`);
  return response.data;
};

export const fetchRoomWithCommentAPI = async (roomId, star, NSP) => {
  const response = await axios.get(`${API_URL}/comments`, {
    params: { roomId, star, NSP },
  });
  return response.data;
};

export const addPicturesToRoomAPI = async (id, picture) => {
  const response = await axios.post(`${API_URL}/${id}/pictures`, { picture });
  return response.data;
};

export const deletePicturesFromRoomAPI = async (id, picture) => {
  const response = await axios.delete(`${API_URL}/${id}/pictures`, {
    data: { picture },
  });
  return response.data;
};
