import axios from 'axios';

<<<<<<< HEAD
const API_URL = 'http://localhost:5000/api/v1/pet';
=======
const API_URL = 'http://localhost:5000/api/v1/pets'
>>>>>>> 7f8244c1629a7d76a0c8a0b4bb42150bb54831b4

// 1. Fetch all pets (optional userId + fields)
export const fetchAllPetAPI = async (userId, fields) => {
  const params = {};
  if (userId) params.userId = userId;
  if (fields) params.fields = fields;

  const response = await axios.get(API_URL, { params });
  return response.data;
};

// 2. Fetch single pet by petId
export const fetchPetAPI = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// 3. Fetch only available pets for a user
export const fetchAvailablePetAPI = async (userId) => {
  const response = await axios.get(`${API_URL}/available`, {
    params: { userId },
  });
  return response.data;
};

// 4. Add new pet
export const addPetAPI = async (pet) => {
  const response = await axios.post(API_URL, pet);
  return response.data;
};

// 5. Delete pet
export const deletePetAPI = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

// 6. Update pet
export const updatePetAPI = async (id, pet) => {
  const response = await axios.put(`${API_URL}/${id}`, pet);
  return response.data;
};
