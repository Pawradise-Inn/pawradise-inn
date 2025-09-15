import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/customer';

export const fetchCustomerAPI = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};
