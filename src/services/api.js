import axios from 'axios';

// ✅ PRODUCTION + LOCAL HANDLING
const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://awt-project-attendancemanagement.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000, // safer for Render cold start
});

// ✅ Attach JWT automatically
api.interceptors.request.use(
  (config) => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      if (user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;