import axiosInstance from './axios'

export const adminApi = {
  // User Management
  getAllUsers: () => axiosInstance.get('/admin/users'),

  deleteUser: (userId) => axiosInstance.delete(`/admin/users/${userId}`),

  updateUserRole: (userId, role) =>
    axiosInstance.put(`/admin/users/${userId}/role`, { role }),

  // Course Management
  createCourse: (courseData) =>
    axiosInstance.post('/admin/courses', courseData),

  updateCourse: (courseId, courseData) =>
    axiosInstance.put(`/admin/courses/${courseId}`, courseData),

  deleteCourse: (courseId) =>
    axiosInstance.delete(`/admin/courses/${courseId}`),

  // Lecturer Management
  createLecturer: (lecturerData) =>
    axiosInstance.post('/admin/lecturers', lecturerData),

  updateLecturer: (lecturerId, lecturerData) =>
    axiosInstance.put(`/admin/lecturers/${lecturerId}`, lecturerData),

  deleteLecturer: (lecturerId) =>
    axiosInstance.delete(`/admin/lecturers/${lecturerId}`),

  // Analytics
  getAnalytics: () => axiosInstance.get('/admin/analytics'),

  getProgressReports: () =>
    axiosInstance.get('/admin/reports/progress')
}

export default adminApi;