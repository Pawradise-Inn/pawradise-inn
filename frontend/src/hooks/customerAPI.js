import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/customer";

export const fetchCustomerAPI = async (id, token = localStorage.getItem("token")) => {
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};

export const updateCustomerAPI = async (id, customer, token = localStorage.getItem("token")) => {
  const response = await axios.put(`${API_URL}/${id}`, customer, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};
