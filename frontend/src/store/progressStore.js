import { create } from 'zustand'
import { courseApi } from '../api/courseApi'

const useProgressStore = create((set, get) => ({
  progress: {},
  isLoading: false,
  error: null,

  updateProgress: async (courseId, lessonId, progress) => {
    set({ isLoading: true, error: null })
    try {
      await courseApi.updateProgress(courseId, lessonId, progress)
      set((state) => ({
        progress: {
          ...state.progress,
          [courseId]: {
            ...state.progress[courseId],
            [lessonId]: progress
          }
        },
        isLoading: false
      }))
      return { success: true }
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to update progress',
        isLoading: false 
      })
      return { success: false }
    }
  },

  getCourseProgress: (courseId) => {
    const progress = get().progress[courseId] || {}
    const totalLessons = Object.keys(progress).length
    const completedLessons = Object.values(progress).filter(p => p === 100).length
    const overallProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0
    
    return {
      totalLessons,
      completedLessons,
      overallProgress
    }
  },

  clearError: () => set({ error: null })
}))

export default useProgressStore
