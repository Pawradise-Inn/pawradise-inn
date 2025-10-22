import axios from "axios";

let isInterceptorSetup = false;

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
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
    (response) => {
      // Handle success notifications only for meaningful user actions
      const { createNotification } = window.notificationprovider;
      const responseData = response.data;
      const method = response.config.method?.toLowerCase();
      
      const display = [responseData.message.type, responseData.message.content];
      console.log(display.join('\n'), responseData);

      // Only show success notifications for actions that modify data
      const shouldShowNotification =
        method && ["post", "put", "patch", "delete"].includes(method);

      // Check if response has success message format and should show notification
      if (
        shouldShowNotification &&
        responseData.success &&
        responseData.message &&
        responseData.message.header &&
        responseData.message.content
      ) {
        const { header, content } = responseData.message;
        createNotification("success", header, content);
      }

      return response;
    },

    async (error) => {
      const { createNotification } = window.notificationprovider;

      if (!error.response) {
        createNotification("fail", "Network Error", "Cannot connect to server");
        return Promise.reject(error);
      }

      const status = error.response.status;
      const errorData = error.response.data;

      const display = [errorData.error.type, errorData.error.content];
      console.log(display.join('\n'), errorData);

      // Handle new standardized error format
      if (
        !errorData.success &&
        errorData.error &&
        errorData.error.header &&
        errorData.error.content
      ) {
        const { header, content } = errorData.error;
        createNotification("fail", header, content);

        // Special handling for 401 errors
        if (status === 401) {
          logout();
        }
      }

      return Promise.reject(error);
    }
  );

  isInterceptorSetup = true;
};

export default axiosInstance;
