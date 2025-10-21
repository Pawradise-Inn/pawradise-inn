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

      const status = error.response.status;
      const errorMessage = error.response.data.message || "Unexpected error";

      switch (status) {
        case 400:
          createNotification(
            "fail",
            "Bad Request",
            errorMessage || "Invalid request data"
          );
          break;
        case 401:
          logout();
          createNotification(
            "fail",
            "Unauthorized",
            errorMessage || "Your session has expired"
          );
          break;
        case 403:
          createNotification(
            "fail",
            "Forbidden",
            errorMessage || "You don't have permission to access this resource"
          );
          break;
        case 404:
          createNotification(
            "fail",
            "Not Found",
            errorMessage || "The requested resource was not found"
          );
          break;
        case 409:
          createNotification(
            "fail",
            "Conflict",
            errorMessage || "Resource conflict occurred"
          );
          break;
        case 500:
          createNotification(
            "fail",
            "Server Error",
            errorMessage || "Internal server error occurred"
          );
          break;
        default:
          createNotification("fail", "Request Failed", errorMessage);
      }

      return Promise.reject(error);
    }
  );

  isInterceptorSetup = true;
};

export default axiosInstance;
