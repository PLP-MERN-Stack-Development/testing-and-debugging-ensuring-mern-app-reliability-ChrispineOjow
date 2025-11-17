import axios from 'axios';

const baseURL =
  (typeof import.meta !== 'undefined' && import.meta.env.VITE_API_URL) ||
  process.env.VITE_API_URL ||
  process.env.API_URL ||
  'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL,
  timeout: 10000
});

const extractData = (response) => response.data;

export const getPosts = (params = {}) =>
  apiClient.get('/posts', { params }).then(extractData);

export const createPost = (payload, token) =>
  apiClient
    .post('/posts', payload, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined
    })
    .then(extractData);

export const loginUser = (credentials) => apiClient.post('/auth/login', credentials).then(extractData);

export const registerUser = (payload) => apiClient.post('/auth/register', payload).then(extractData);

export default apiClient;

