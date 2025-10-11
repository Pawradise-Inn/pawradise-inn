import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/image";

export const uploadImageAPI = async (file, token = localStorage.getItem("token")) => {
    const formData = new FormData();
    formData.append('image', file); 

    const headers = {
        'Content-Type': 'multipart/form-data'
    };
    
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await axios.post(
        `${API_URL}/upload`, 
        formData, 
        { headers }
    );
    
    return response.data;
}