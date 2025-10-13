import axios from 'axios';

let isInterceptorSetup = false;

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
});

export const setUpInterceptors = (logout) => {
    if (isInterceptorSetup) return ;
    
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config
        },
        (error) => Promise.reject(error)
    );

    axiosInstance.interceptors.response.use(
        (response) => response,

        async (error) => {
            const { createNotification } = window.notificationprovider;

            if (!error.response) {
                createNotification({
                    status: 'fail',
                    header: 'Network Error' ,
                    text: 'Cannot connect to server'});
                return Promise.reject(error);
            }

            const errorMessage = error.response.data.message || 'Unexpected error';

            if (error.response.status === 401) {
                logout();
                createNotification({ 
                    status: 'fail',
                    header: 'Unauthorized', 
                    text: 'Your session is expired'
                });
            } else {
                createNotification({
                    status: 'fail',
                    header: 'Request Failed',
                    text: errorMessage
                });
            }

            return Promise.reject(error);
        }
    );

    isInterceptorSetup = true;
};

export default axiosInstance;

