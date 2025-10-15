import axios from "axios";

let isInterceptorSetup = false;

const axiosInstance = axios.create({
  baseURL: "http://localhost:5050",
});

export const setUpInterceptors = (logout) => {
  if (isInterceptorSetup) return;

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,

    async (error) => {
      const { createNotification } = window.notificationprovider;

      if (!error.response) {
        createNotification("fail", "Network Error", "Cannot connect to server");
        return Promise.reject(error);
      }

      const errorMessage = error.response.data.message || "Unexpected error";

      if (error.response.status === 401) {
        logout();
        createNotification("fail", "Unauthorized", "Your session is expired");
      } else {
        createNotification("fail", "Request Failed", errorMessage);
      }

      return Promise.reject(error);
    }
  );

  isInterceptorSetup = true;
};

export default axiosInstance;
