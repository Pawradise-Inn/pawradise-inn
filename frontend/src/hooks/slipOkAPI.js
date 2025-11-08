import axios from "axios";

const API_URL =  "https://api.slipok.com/api/check-slip"

export const checkSlipAPI = async (pic_url) => {
    const response = await axios.post(`${API_URL}}`,
        {
            url: pic_url,
            log: true
        }
    )
    return response.data
}

