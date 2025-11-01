import axios from "axios";

const API_URL =  "https://api.slipok.com/api/line/apikey/"
const branch_id = import.meta.env.VITE_BRANCH_ID
const api_key = import.meta.env.VITE_API_KEY

export const checkSlipAPI = async (pic_url) => {
    const response = await axios.post(`${API_URL}/${branch_id}`,
        {
            url: pic_url,
            log: true
        },
        {
            headers: {
                "x-authorization": api_key,
            }
        }
    )
    return response.data
}

