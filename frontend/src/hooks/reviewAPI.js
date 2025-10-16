import axiosInstance from "../api/axiosInstance";

const API_URL = "/api/v1/review";

export const fetchAllReviewAPI = async () => {
  const response = await axiosInstance.get(API_URL);
  return response.data;
}

export const fetchReviewAPI = async (id) => {
  const response = await axiosInstance.get(`${API_URL}/${id}`);
  return response.data;
};

//staff post reply
export const postReviewAPI = async (review) => {
  const response = await axiosInstance.post(API_URL, review);
  return response.data;
};

//staff patch review status & patch reply
export const patchReviewAPI = async (id, review) => {
  const response = await axiosInstance.patch(`${API_URL}/${id}`, review);
  return response.data;
};

//staff delete thier own reply
export const deleteReviewAPI = async (id) => {
  const response = await axiosInstance.delete(`${API_URL}/${id}`);
  return response.data;
}

