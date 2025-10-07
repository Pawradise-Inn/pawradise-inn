import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/staff";

export const fetchStaffAPI = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};
