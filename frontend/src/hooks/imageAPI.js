import axiosInstance from "../api/axiosInstance";

const API_URL = "/api/v1/image";

export const uploadImageAPI = async (file) => {
    const formData = new FormData();
    formData.append('image', file); 

    const response = await axiosInstance.post(
        `${API_URL}/upload`, 
        formData
    );
    
    return response.data;
}