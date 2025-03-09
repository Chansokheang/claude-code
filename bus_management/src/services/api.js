import axios from 'axios';

const API_URL = 'http://localhost:8000';

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // If the error is 401 and not already retrying
    if (error.response.status === 401 && !originalRequest._retry) {
      // Redirect to login page
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  login: async (email, password) => {
    const response = await axios.post(`${API_URL}/token`, 
      new URLSearchParams({
        'username': email,
        'password': password,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return response.data;
  },
  
  register: async (userData) => {
    const response = await api.post('/users/', userData);
    return response.data;
  },
  
  getCurrentUser: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },
};

// Bus API
export const busAPI = {
  getAllBuses: async () => {
    const response = await api.get('/buses/');
    return response.data;
  },
  
  getBusById: async (id) => {
    const response = await api.get(`/buses/${id}`);
    return response.data;
  },
  
  createBus: async (busData) => {
    const response = await api.post('/buses/', busData);
    return response.data;
  },
  
  updateBus: async (id, busData) => {
    const response = await api.put(`/buses/${id}`, busData);
    return response.data;
  },
  
  deleteBus: async (id) => {
    const response = await api.delete(`/buses/${id}`);
    return response.data;
  },
};

// Route API
export const routeAPI = {
  getAllRoutes: async () => {
    const response = await api.get('/routes/');
    return response.data;
  },
  
  getRouteById: async (id) => {
    const response = await api.get(`/routes/${id}`);
    return response.data;
  },
  
  createRoute: async (routeData) => {
    const response = await api.post('/routes/', routeData);
    return response.data;
  },
  
  updateRoute: async (id, routeData) => {
    const response = await api.put(`/routes/${id}`, routeData);
    return response.data;
  },
  
  deleteRoute: async (id) => {
    const response = await api.delete(`/routes/${id}`);
    return response.data;
  },
};

export default api;