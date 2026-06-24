import { create } from 'zustand'
import { courseApi } from '../api/courseApi'

const useCourseStore = create((set, get) => ({
  courses: [],
  currentCourse: null,
  enrolledCourses: [],
  isLoading: false,
  error: null,

  fetchAllCourses: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await courseApi.getAllCourses()
      set({ 
        courses: response.data.data, 
        isLoading: false 
      })
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch courses',
        isLoading: false 
      })
    }
  },

  fetchCourseById: async (courseId) => {
    set({ isLoading: true, error: null })
    try {
      const response = await courseApi.getCourseById(courseId)
      set({ 
        currentCourse: response.data.data, 
        isLoading: false 
      })
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch course',
        isLoading: false 
      })
    }
  },

  fetchEnrolledCourses: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await courseApi.getEnrolledCourses()
      set({ 
        enrolledCourses: response.data.data, 
        isLoading: false 
      })
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch enrolled courses',
        isLoading: false 
      })
    }
  },

  enrollCourse: async (courseId) => {
    set({ isLoading: true, error: null })
    try {
      await courseApi.enrollCourse(courseId)
      await get().fetchEnrolledCourses()
      set({ isLoading: false })
      return { success: true }
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to enroll',
        isLoading: false 
      })
      return { success: false, error: error.response?.data?.message }
    }
  },

  clearError: () => set({ error: null })
}))

export default useCourseStore
