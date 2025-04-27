// src/api/index.js

import axios from 'axios';

// Your backend base URL
const API_BASE_URL = 'https://alphawulf-backend.onrender.com/';

// Fetch Telegram initData (token) from Telegram WebApp
function getTelegramInitData() {
  if (window?.Telegram?.WebApp?.initData) {
    return window.Telegram.WebApp.initData;
  }
  return null;
}

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach Authorization token automatically
api.interceptors.request.use((config) => {
  const initData = getTelegramInitData();
  if (initData) {
    config.headers.Authorization = `Bearer ${initData}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
