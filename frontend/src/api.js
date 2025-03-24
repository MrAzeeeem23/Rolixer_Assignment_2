import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (data) => API.post('/user/register', data);
export const loginUser = (data) => API.post('/user/login', data);
export const logoutUser = () => API.post('/user/logout');
export const getUserDetails = (id) => API.get(`/user/${id}`);
export const getAllStores = () => API.get('/store');
export const getStoreDetails = (id) => API.get(`/store/${id}`);
export const createStore = (data) => API.post('/store', data);
export const updateStore = (data) => API.put('/store', data);
export const deleteStore = (id) => API.delete(`/store/${id}`);
export const addRating = (data) => API.post('/rating', data);
export const getStoreRatings = (id) => API.get(`/rating/store/${id}`);