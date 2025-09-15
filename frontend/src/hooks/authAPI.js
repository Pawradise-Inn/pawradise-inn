import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/auth';

// Register user
export const addUserAPI = async (newUser) => {
    const response = await axios.post(`${API_URL}/register`, newUser);
    return response.data;
};

// Get user by ID
export const getUserAPI = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

// Update user by ID
export const updateUserAPI = async (id, updatedUser) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedUser);
    return response.data;
};

// Delete user by ID
export const deleteUserAPI = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};