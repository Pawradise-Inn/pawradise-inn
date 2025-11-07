import axiosInstance from "../api/axiosInstance"

const API_URL = "/api/v1/payments"

export const fetchMyPayments = async() =>{
    try{
        const response = await axiosInstance.get(`${API_URL}/mine`)
        return response.data
    }
    catch(error){
        console.error( "Error fetching payments", error)
        throw error
    }
};

