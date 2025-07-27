// src/api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Change to your deployed backend later
  headers: {
    'Content-Type': 'application/json'
  }
});

// Optional: Add token to headers automatically
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = token;
  return config;
});

export default api;
