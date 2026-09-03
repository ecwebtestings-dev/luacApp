import axios from 'axios';
import toast from 'react-hot-toast';
import { emitSessionExpired } from './sessionEvents';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// REQUEST INTERCEPTOR

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
apiClient.interceptors.response.use(
  (response) => response.data,

  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || 'Something went wrong';

    if (status === 401) {
      const hadToken = Boolean(localStorage.getItem('token'));

      if (hadToken) {
        
        localStorage.removeItem('token');
        emitSessionExpired(); // no navigation
      }
     
    } else {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;