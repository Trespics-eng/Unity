import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://localhost:5000/api', // Adjust base URL for prod
      baseURL: 'https://unity-server-5mpf.onrender.com/api',
});

// Interceptor to add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getHero = () => api.get('/public/hero');
export const getPosts = (featured = false) => api.get(`/public/posts${featured ? '?featured=true' : ''}`);
export const getBlogs = (featured = false) => api.get(`/public/blogs${featured ? '?featured=true' : ''}`);
export const getStories = (featured = false) => api.get(`/public/stories${featured ? '?featured=true' : ''}`);
export const getCategories = () => api.get('/public/categories');

export const postMessage = (data: any) => api.post('/public/messages', data);
export const recordView = (type: string, id: string) => api.post('/public/record-view', { type, id });

// Dynamic CRUD and Image support for public submissions
export const createItem = (type: string, data: any) => api.post(`/public/${type}`, data);
export const uploadImage = (formData: FormData) => api.post('/public/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});

// Auth Routes
export const login = (credentials: any) => api.post('/auth/login', credentials);
export const register = (userData: any) => api.post('/auth/register', userData);
export const forgotPassword = (email: string) => api.post('/auth/forgot-password', { email });
export const resetPassword = (data: any) => api.post('/auth/reset-password', data);

// User Routes
export const getMyBlogs = () => api.get('/user/my-blogs');
export const getMyStats = () => api.get('/user/my-stats');
export const createUserBlog = (data: any) => api.post('/user/blogs', data);

export default api;
