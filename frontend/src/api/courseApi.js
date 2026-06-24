import axiosInstance from './axios'

export const courseApi = {
  getAllCourses: () => axiosInstance.get('/courses'),
  
  getCourseById: (id) => axiosInstance.get(`/courses/${id}`),
  
  enrollCourse: (courseId) => axiosInstance.post(`/courses/${courseId}/enroll`),
  
  getEnrolledCourses: () => axiosInstance.get('/courses/user/enrolled'),
  
  updateProgress: (courseId, lessonId, progress) => 
    axiosInstance.put(`/courses/${courseId}/progress`, { lessonId, progress }),

  // Video generation endpoints
  generateVideo: (courseId, lecturerId) => 
    axiosInstance.post(`/courses/${courseId}/generate-video`, { lecturerId }),

  getVideoStatus: (courseId) => 
    axiosInstance.get(`/courses/${courseId}/video-status`),

  updateLecturer: (courseId, lecturerId) => 
    axiosInstance.put(`/courses/${courseId}/lecturer`, { lecturerId })
}
