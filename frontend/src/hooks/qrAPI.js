import axiosInstance from "../api/axiosInstance";

const API_URL = "/api/v1/qr"

export const genqrAPI = async (amount) => {
    const response = await axiosInstance.post(`${API_URL}/generateQr`, amount)
    return response.data
}