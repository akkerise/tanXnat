import axios from 'axios';

// Set up global axios defaults/interceptors once
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
axios.defaults.baseURL = baseURL;

axios.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers ?? {};
      (config.headers as any)['Authorization'] = `Bearer ${token}`;
    }
  } catch (e) {
    // ignore storage errors
  }
  return config;
});

export {};

