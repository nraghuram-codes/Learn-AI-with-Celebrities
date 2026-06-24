import axiosInstance from './axios'

const lecturerApi = {
  // Get all lecturers (public)
  getAllLecturers: () => {
    return axiosInstance.get('/lecturers')
  },

  // Get lecturer by ID (public)
  getLecturerById: (id) => {
    return axiosInstance.get(`/lecturers/${id}`)
  },

  // Create lecturer (Admin - through admin routes)
  createLecturer: (lecturerData) => {
    return axiosInstance.post('/admin/lecturers', lecturerData)
  },

  // Update lecturer (Admin - through admin routes)
  updateLecturer: (id, lecturerData) => {
    return axiosInstance.put(`/admin/lecturers/${id}`, lecturerData)
  },

  // Delete lecturer (Admin - through admin routes)
  deleteLecturer: (id) => {
    return axiosInstance.delete(`/admin/lecturers/${id}`)
  }
}

export default lecturerApi