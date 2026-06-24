import axiosInstance from './axios'

export const authApi = {
  register: (userData) =>
    axiosInstance.post('/auth/register', userData),

  login: (credentials) =>
    axiosInstance.post('/auth/login', credentials),

  logout: () =>
    axiosInstance.post('/auth/logout'),

  getProfile: () =>
    axiosInstance.get('/auth/profile'),

  updateProfile: (userData) =>
    axiosInstance.put('/auth/profile', userData)
}