import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/image";

export const uploadImageAPI = async (file) => {
    const formData = new FormData();
    formData.append('image', file); 

    const response = await axios.post(
        `${API_URL}`, 
        formData, 
        {
            headers: {
                'Content-Type': 'multipart/form-data' 
            }
        }
    );
    
    return response.data;
}