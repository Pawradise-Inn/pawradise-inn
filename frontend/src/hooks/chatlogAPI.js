import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/chatlog";

// Get all chat logs with optional filters (customerId, serviceId, staffId)
export const getChatLogsAPI = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.customerId) params.append("customerId", filters.customerId);
  if (filters.serviceId) params.append("serviceId", filters.serviceId);
  if (filters.staffId) params.append("staffId", filters.staffId);
  const res = await axios.get(`${API_URL}?${params.toString()}`);
  return res.data;
};

// Get chat log by ID
export const getChatLogByIdAPI = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

// Create a new chat log (review)
// Required: { review, rating, customerId, serviceId }
export const createChatLogAPI = async (chatlogData, token = localStorage.getItem("token")) => {
  const res = await axios.post(`${API_URL}`, chatlogData, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data;
};

// Reply to a chat log (staff response)
// Required: { reply, staffId }
export const replyToChatLogAPI = async (id, replyData, token = localStorage.getItem("token")) => {
  const res = await axios.post(`${API_URL}/${id}`, replyData, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data;
};

// Update a chat log
export const updateChatLogAPI = async (id, updateData, token = localStorage.getItem("token")) => {
  const res = await axios.patch(`${API_URL}/${id}`, updateData, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data;
};

// Delete a chat log
export const deleteChatLogAPI = async (id, token = localStorage.getItem("token")) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data;
};