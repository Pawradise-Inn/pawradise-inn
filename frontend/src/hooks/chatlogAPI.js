import axiosInstance from "../api/axiosInstance";

const API_URL = "/api/v1/chatlogs";

// Get all chat logs with optional filters (customerId, serviceId, staffId)
export const getChatLogsAPI = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await axiosInstance.get(`${API_URL}?${query}`);
  return res.data;
};

// Get chat log by ID
export const getChatLogByIdAPI = async (id) => {
  const res = await axiosInstance.get(`${API_URL}/${id}`);
  return res.data;
};

export const getChatLogAndReplyAPI = async () => {
  const res = await axiosInstance.get(`${API_URL}/mine`);
  return res.data;
};

// Create a new chat log (review)
// Required: { review, rating, customerId, serviceId }
export const createChatLogAPI = async (chatlogData) => {
  const res = await axiosInstance.post(`${API_URL}`, chatlogData);
  return res.data;
};

// Reply to a chat log (staff response)
// Required: { reply, staffId }
export const replyToChatLogAPI = async (id, replyData) => {
  const res = await axiosInstance.post(`${API_URL}/${id}`, replyData);
  return res.data;
};

// Update a chat log
export const updateChatLogAPI = async (id, updateData) => {
  const res = await axiosInstance.patch(`${API_URL}/${id}`, updateData);
  return res.data;
};

// Delete a chat log
export const deleteChatLogAPI = async (id) => {
  const res = await axiosInstance.delete(`${API_URL}/${id}`);
  return res.data;
};

//get all room and service that need to be review
export const getToBeReviewAPI = async () => {
  const res = await axiosInstance.get(`${API_URL}/mine/waiting`);
  return res.data;
};