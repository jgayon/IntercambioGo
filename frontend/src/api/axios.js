// src/api/axios.js
import axios from "axios";

const API = axios.create({
  // En desarrollo usa la variable Vite, si no existe, cae a localhost
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});

// Interceptor: añade el token JWT a todas las peticiones si existe
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");  // 👈 AQUÍ EL CAMBIO CLAVE
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;