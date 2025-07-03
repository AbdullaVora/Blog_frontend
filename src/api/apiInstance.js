import axios from 'axios';

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
})

apiInstance.interceptors.request.use(consfig => {
  const token = JSON.parse(localStorage.getItem('token'));
  if (token) {
    consfig.headers.Authorization = `Bearer ${token}`;
  }
  return consfig;
}, error => {
  return Promise.reject(error);
})

export default apiInstance;