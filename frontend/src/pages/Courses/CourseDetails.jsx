import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import useFetchCourse from '../../hooks/useFetchCourse'
import Button from '../../components/common/Button/Button'
import ProgressBar from '../../components/ui/ProgressBar/ProgressBar'
import LecturerSelector from '../../components/ui/LecturerSelector/LecturerSelector'
import VideoPlayer from '../../components/ui/VideoPlayer/VideoPlayer'
import { courseApi } from '../../api/courseApi'
import lecturerApi from '../../api/lecturerApi'
import styles from '../../styles/dashboard.module.css'

const CourseDetails = () => {
  const { id } = useParams()
  const { currentCourse, isLoading, error, fetchCourseById, enrollCourse } = useFetchCourse()
  
  const [selectedLecturer, setSelectedLecturer] = useState(null)
  const [videoStatus, setVideoStatus] = useState('not_generated')
  const [isGenerating, setIsGenerating] = useState(false)
  const [videoUrl, setVideoUrl] = useState(null)
  const [videoScript, setVideoScript] = useState(null)
  const [lecturers, setLecturers] = useState([])
  const [loadingLecturers, setLoadingLecturers] = useState(false)

  // Fetch lecturers from API
  useEffect(() => {
    const fetchLecturers = async () => {
      setLoadingLecturers(true)
      try {
        const response = await lecturerApi.getAllLecturers()
        if (response.data.success) {
          setLecturers(response.data.data)
        }
      } catch (error) {
        console.error('Error fetching lecturers:', error)
      } finally {
        setLoadingLecturers(false)
      }
    }
    fetchLecturers()
  }, [])

  useEffect(() => {
    if (id) {
      fetchCourseById(id)
    }
  }, [id])

  useEffect(() => {
    if (currentCourse) {
      setVideoStatus(currentCourse.videoStatus || 'not_generated')
      setVideoUrl(currentCourse.videoUrl)
      setVideoScript(currentCourse.videoScript)
      if (currentCourse.selectedLecturerId) {
        const lecturer = lecturers.find(l => l.id === currentCourse.selectedLecturerId)
        setSelectedLecturer(lecturer)
      }
    }
  }, [currentCourse, lecturers])

  const handleEnroll = async () => {
    if (currentCourse) {
      const result = await enrollCourse(currentCourse.id)
      if (result.success) {
        alert('Successfully enrolled in course!')
      } else {
        alert(result.error || 'Failed to enroll')
      }
    }
  }

  const handleSelectLecturer = (lecturer) => {
    // Update UI immediately for better UX
    setSelectedLecturer(lecturer)
    setVideoStatus('not_generated')
    setVideoUrl(null)
    setVideoScript(null)

    // Update backend in background
    if (currentCourse) {
      courseApi.updateLecturer(currentCourse.id, lecturer.id)
        .then((response) => {
          if (!response.data.success) {
            console.error('Failed to update lecturer on backend:', response.data)
          } else {
            console.log('Lecturer updated successfully on backend')
          }
        })
        .catch((error) => {
          console.error('Error updating lecturer on backend:', error)
          console.error('Error details:', error.response?.data || error.message)
        })
    }
  }

  const handleGenerateVideo = async () => {
    if (!selectedLecturer || !currentCourse) {
      alert('Please select a lecturer first')
      return
    }

    console.log('Starting video generation for course:', currentCourse.id, 'with lecturer:', selectedLecturer.id)
    setIsGenerating(true)
    setVideoStatus('generating')

    try {
      console.log('Calling generateVideo API...')
      const response = await courseApi.generateVideo(currentCourse.id, selectedLecturer.id)
      console.log('Generate video response:', response.data)
      
      if (response.data.success) {
        console.log('Video generation request successful, starting polling...')
        let pollCount = 0
        const maxPolls = 60 // Max 2 minutes of polling
        
        // Poll for video status
        const pollInterval = setInterval(async () => {
          pollCount++
          try {
            console.log(`Polling video status (attempt ${pollCount})...`)
            const statusResponse = await courseApi.getVideoStatus(currentCourse.id)
            console.log('Video status response:', statusResponse.data.data)
            
            if (statusResponse.data.data.videoStatus === 'completed') {
              console.log('Video generation completed!')
              clearInterval(pollInterval)
              setVideoStatus('completed')
              setVideoUrl(statusResponse.data.data.videoUrl)
              setVideoScript(statusResponse.data.data.videoScript)
              setIsGenerating(false)
              // Refresh course data
              fetchCourseById(currentCourse.id)
            } else if (pollCount >= maxPolls) {
              console.error('Video generation polling timeout')
              clearInterval(pollInterval)
              alert('Video generation timed out. Please try again.')
              setIsGenerating(false)
              setVideoStatus('not_generated')
            }
          } catch (error) {
            console.error('Error polling video status:', error)
          }
        }, 2000) // Poll every 2 seconds
      } else {
        console.error('Generate video request failed:', response.data)
        alert(response.data.message || 'Failed to generate video')
        setIsGenerating(false)
        setVideoStatus('not_generated')
      }
    } catch (error) {
      console.error('Error generating video:', error)
      console.error('Error response:', error.response?.data)
      const errorMessage = error.response?.data?.message || error.message || 'Failed to generate video'
      alert(errorMessage)
      setIsGenerating(false)
      setVideoStatus('not_generated')
    }
  }

  const handleRegenerateVideo = () => {
    if (selectedLecturer) {
      handleGenerateVideo()
    }
  }

  const handleChangeLecturer = async (newLecturer) => {
    if (!currentCourse) return

    try {
      const response = await courseApi.updateLecturer(currentCourse.id, newLecturer.id)

      if (response.data.success) {
        setSelectedLecturer(newLecturer)
        setVideoStatus('not_generated')
        setVideoUrl(null)
        setVideoScript(null)
        alert('Lecturer changed successfully. Generate a new video with the new lecturer.')
      } else {
        alert(response.data.message || 'Failed to change lecturer')
      }
    } catch (error) {
      console.error('Error changing lecturer:', error)
      const errorMessage = error.response?.data?.message || error.message || 'Failed to change lecturer'
      alert(errorMessage)
    }
  }

  if (isLoading) {
    return (
      <MainLayout>
        <div className={styles.emptyState}>
          <p>Loading course details...</p>
        </div>
      </MainLayout>
    )
  }

  if (error) {
    return (
      <MainLayout>
        <div className={styles.emptyState}>
          <p className={styles.emptyStateText}>Error loading course</p>
          <p className={styles.emptyStateSubtext}>{error}</p>
        </div>
      </MainLayout>
    )
  }

  if (!currentCourse) {
    return (
      <MainLayout>
        <div className={styles.emptyState}>
          <p className={styles.emptyStateText}>Course not found</p>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className={styles.contentSection}>
        <div className={styles.sectionHeader}>
          <h1 className={styles.pageTitle}>{currentCourse.title}</h1>
          <Button onClick={() => window.history.back()} variant="secondary">
            ← Back
          </Button>
        </div>

        {/* AI Video Section */}
        <VideoPlayer
          videoUrl={videoUrl}
          videoScript={videoScript}
          lecturer={selectedLecturer}
          isGenerating={isGenerating}
          onRegenerate={handleRegenerateVideo}
        />

        {/* Lecturer Selection */}
        {loadingLecturers ? (
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <p>Loading lecturers...</p>
          </div>
        ) : (
          <LecturerSelector
            lecturers={lecturers}
            selectedLecturerId={selectedLecturer?.id}
            onSelectLecturer={handleSelectLecturer}
          />
        )}

        {/* Generate Video Button */}
        {selectedLecturer && videoStatus !== 'generating' && (
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Button
              variant="primary"
              size="large"
              onClick={handleGenerateVideo}
              style={{ padding: '1rem 3rem' }}
            >
              🎬 Generate AI Video with {selectedLecturer.name}
            </Button>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginTop: '2rem' }}>
          <div>
            <img
                  src={
                    currentCourse.image
                      ? `/images/${currentCourse.image}`
                      : '/images/placeholder-course.jpg'
                  }
                  alt={currentCourse.title}
                  style={{
                    width: '100%',
                    maxHeight: '400px',
                    objectFit: 'cover',
                    borderRadius: '1rem',
                    marginBottom: '1.5rem'
                            }}
                            onError={(e) => {
                              e.target.src = '/images/placeholder-course.jpg'
                            }}
                          />
            
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '1rem' }}>
              Description
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '2rem' }}>
              {currentCourse.description}
            </p>

            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '1rem' }}>
              What You'll Learn
            </h2>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
              {currentCourse.learningOutcomes?.map((outcome, index) => (
                <li key={index}>{outcome}</li>
              ))}
            </ul>
          </div>

          <div>
            <div style={{ background: 'var(--dark-card)', border: '1px solid var(--dark-border)', borderRadius: '1rem', padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                Course Info
              </h3>
              
              <div style={{ marginBottom: '1rem' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Duration</p>
                <p style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{currentCourse.duration}</p>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Lessons</p>
                <p style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{currentCourse.lessons} lessons</p>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Rating</p>
                <p style={{ color: 'var(--text-primary)', fontWeight: '600' }}>⭐ {currentCourse.rating}</p>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Price</p>
                <p style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary-color)' }}>
                  {currentCourse.price === 0 ? 'Free' : `₹${currentCourse.price}`}
                </p>
              </div>

              <Button
                variant="primary"
                size="large"
                onClick={handleEnroll}
                style={{ width: '100%' }}
              >
                Enroll Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default CourseDetails
