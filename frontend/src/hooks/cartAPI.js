import axiosInstance from "../api/axiosInstance";

const API_URL = "/api/v1/carts";

export const getCart = async () => {
    const response = await axiosInstance.get(`${API_URL}`);
    return response.data;
};

export const toggleCartRoomSelection = async (id, selected) => {
    const response = await axiosInstance.patch(`${API_URL}/rooms/${id}/selected`, { selected });
    return response.data;
};

export const toggleCartServiceSelection = async (id, selected) => {
    const response = await axiosInstance.patch(`${API_URL}/services/${id}/selected`, { selected });
    return response.data;
};

export const addRoomToCart = async (cartItem) => {
    const response = await axiosInstance.post(`${API_URL}/rooms`, cartItem);
    return response.data;
};

export const addServiceToCart = async (cartItem) => {
    const response = await axiosInstance.post(`${API_URL}/services`, cartItem);
    return response.data
};

export const deleteCartRoom = async (id) => {
    const response = await axiosInstance.delete(`${API_URL}/rooms/${id}`);
    return response.data
};

export const deleteCartService = async (id) => {
    const response = await axiosInstance.delete(`${API_URL}/services/${id}`);
    return response.data
};