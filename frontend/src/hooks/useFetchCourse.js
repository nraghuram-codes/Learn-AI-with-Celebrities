import { useEffect } from 'react'
import useCourseStore from '../store/courseStore'

const useFetchCourse = (courseId = null) => {
  const { 
    courses, 
    currentCourse, 
    enrolledCourses, 
    isLoading, 
    error, 
    fetchAllCourses, 
    fetchCourseById, 
    fetchEnrolledCourses,
    enrollCourse,
    clearError 
  } = useCourseStore()

  useEffect(() => {
    if (courseId) {
      fetchCourseById(courseId)
    } else {
      fetchAllCourses()
    }
  }, [courseId])

  return {
    courses,
    currentCourse,
    enrolledCourses,
    isLoading,
    error,
    fetchAllCourses,
    fetchCourseById,
    fetchEnrolledCourses,
    enrollCourse,
    clearError
  }
}

export default useFetchCourse
