import axiosInstance from "../api/axiosInstance";

const API_URL = "/api/v1/chatlog";

// Get all chat logs with optional filters (customerId, serviceId, staffId)
export const getChatLogsAPI = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.customerId) params.append("customerId", filters.customerId);
  if (filters.serviceId) params.append("serviceId", filters.serviceId);
  if (filters.staffId) params.append("staffId", filters.staffId);
  const res = await axiosInstance.get(`${API_URL}?${params.toString()}`);
  return res.data;
};

// Get chat log by ID
export const getChatLogByIdAPI = async (id) => {
  const res = await axiosInstance.get(`${API_URL}/${id}`);
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