import useProgressStore from '../store/progressStore'

const useProgress = () => {
  const { progress, isLoading, error, updateProgress, getCourseProgress, clearError } = useProgressStore()

  return {
    progress,
    isLoading,
    error,
    updateProgress,
    getCourseProgress,
    clearError
  }
}

export default useProgress
