import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  //baseURL: "https://ai-scorify-backend.onrender.com/api",

  timeout: 30000,
});

// ✅ TOKEN INTERCEPTOR
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
