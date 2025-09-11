import axios from 'axios';

const API_URL = 'http://......'

export const fetchAllPetAPI = async() => {
    const response = await axios.get(API_URL);
    return response;
}

export const fetchPetAPI = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data
}

export const addPetAPI = async (pet) => {
    const response = await axios.post(API_URL, pet)
    return response.data
}

export const deletePetAPI = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`)
    return response.data
}

export const updatePetAPI = async (id, pet) => {
    const response = await axios.put(`${API_URL}/${id}`, pet)
    return response.data
}