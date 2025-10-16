import axiosInstance from "../api/axiosInstance";

// The base URL for all service-related API calls
const API_URL = "/api/v1/service";

// --- Basic CRUD Operations ---

/**
 * GET: Fetches all services.
 * Corresponds to: GET api/v1/service
 */
export const fetchAllServicesAPI = async () => {
  const response = await axiosInstance.get(API_URL);
  return response.data;
};

/**
 * GET: Fetches a single service by its ID.
 * Corresponds to: GET api/v1/service/:id
 */
export const fetchServiceAPI = async (id) => {
  const response = await axiosInstance.get(`${API_URL}/${id}`);
  return response.data;
};

/**
 * POST: Creates a new service.
 * Corresponds to: POST api/v1/service
 */
export const addServiceAPI = async (serviceData) => {
  const response = await axiosInstance.post(API_URL, serviceData);
  return response.data;
};

/**
 * DELETE: Deletes a service by its ID.
 * Corresponds to: DELETE api/v1/service/:id
 */
export const deleteServiceAPI = async (id) => {
  const response = await axiosInstance.delete(`${API_URL}/${id}`);
  return response.data;
};

/**
 * PUT: Updates an existing service by its ID.
 * (This is based on your example file and is a standard operation)
 */
export const updateServiceAPI = async (id, serviceData) => {
  const response = await axiosInstance.patch(`${API_URL}/${id}`, serviceData);
  return response.data;
};

//requiement 6
export const getServiceStatusAPI = async (name, entryDate) => {
  const response = await axiosInstance.get(`${API_URL}/status`, { params: { name: name, entryDate: entryDate } });
  return response.data;
};
// --- Custom Requirement Operations ---

/**
 * GET: Fetches comments, optionally filtered by name and page.
 * Corresponds to: GET api/v1/service/comments?name=${ชื่อ}&NSP=${page}
 */
export const fetchAllServiceWithPaginationAPI = async () => {
  const response = await axiosInstance.get(`${API_URL}/reviews`);
  return response.data;
};

export const fetchServiceReviewsAPI = async (name, star, page) => {
  const params = {};
  if (name) params.name = name;
  if (star !== null && star !== undefined) params.star = star;
  if (page) params.page = page;

  const response = await axiosInstance.get(`${API_URL}/${name}/reviews`, {
    params,
  });
  return response.data;
};

// Add picture management functions
export const addPicturesToServiceAPI = async (id, picture) => {
  const response = await axiosInstance.post(`${API_URL}/${id}/pictures`, { picture });
  return response.data;
};

export const deletePicturesFromServiceAPI = async (id, picture) => {
  const response = await axiosInstance.delete(`${API_URL}/${id}/pictures`, {
    data: { picture }});
  return response.data;
};

/**
 * GET: Fetches the status of a service for a given name and date.
 * Corresponds to: GET api/v1/service/status?name=${ชื่อ}&entry_date_with_time=${วันเวลา}
 */
export const fetchServiceStatusAPI = async ({ name, entryDate }) => {
  const params = {
    name: name,
    entry_date_with_time: entryDate,
  };

  const response = await axiosInstance.get(`${API_URL}/status`, { params });
  return response.data;
};

export const fetchPetTypesAPI = async () => {
  const response = await axiosInstance.get(`${API_URL}/pet-types`);
  return response.data;
}