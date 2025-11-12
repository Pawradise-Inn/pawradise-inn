import axios from "axios";

let isInterceptorSetup = false;

const axiosInstance = axios.create({
  baseURL: "http://localhost:5001",
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
      const uncatchMethod = ["get"];
      const uncatchAPI = [
        new RegExp("^/api/v1/carts/services/[^/]+/selected$"),
      ]; // "RegExp type only"
      const { createNotification } = window.notificationprovider;
      const responseData = response.data;
      const method = response.config.method?.toLowerCase();
      const API = response.config.url?.toLowerCase();

      // Only show success notifications for actions that modify data
      const isUncatchAPI = uncatchAPI.some((pattern) => pattern.test(API));

      const shouldShowNotification =
        method && !uncatchMethod.includes(method) && API && !isUncatchAPI;

      console.log(shouldShowNotification);
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
      const errType = errorData?.error?.type || "";

      const display = [errorData.error.type, errorData.error.content];
      console.log(display.join("\n"), errorData);

      // Handle new standardized error format
      if (
        !errorData.success &&
        errorData.error &&
        errorData.error.header &&
        errorData.error.content
      ) {
        const { header, content } = errorData.error;
        createNotification("fail", header, content);

        const requestUrl = error.config?.url;
        const requestMethod = error.config?.method?.toLowerCase();

        const isDeleteMe =
          /\/api\/v1\/auth\/me\/?$/.test(requestUrl) &&
          requestMethod === "delete";
        const isLogin =
          /\/api\/v1\/auth\/login\/?$/.test(requestUrl) &&
          requestMethod === "post";

        // Special handling for 401 errors
        if (status === 401) {
          // Wrong password on delete-me → let caller handle; DO NOT logout.
          if (isDeleteMe && errType === "UNAUTHORIZED") {
            return Promise.reject(error);
          }
          // Bad credentials on login → let caller handle; DO NOT logout.
          if (isLogin) {
            return Promise.reject(error);
          }

          // All other 401s: token invalid/expired → global logout.
          if (typeof logout === "function") {
            logout();
          }
        }
      }

      return Promise.reject(error);
    }
  );

  isInterceptorSetup = true;
};

export default axiosInstance;
