import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api', // Will use Vercel Env Var in Prod, Localhost in Dev
  timeout: 10000, // increased timeout for potentially slower initial Render cold starts
});

// Interceptor to attach the JWT Authorization token to every request automatically
api.interceptors.request.use((config) => {
  const userString = localStorage.getItem('user');
  if (userString) {
    const user = JSON.parse(userString);
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
