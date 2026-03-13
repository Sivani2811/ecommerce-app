import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 1000,
});

// Interceptor to add JWT token to request headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor to handle responses
api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  // Handle token expiration or other errors
  if (error.response.status === 401) {
    console.error('Unauthorized! Redirecting to login...');
    // Redirect or handle logout
  }
  return Promise.reject(error);
});

export default api;