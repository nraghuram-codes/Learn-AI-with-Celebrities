import React, { useEffect, useState } from 'react'
import MainLayout from '../../layouts/MainLayout'
import CourseCard from '../../components/ui/CourseCard/CourseCard'
import ProgressBar from '../../components/ui/ProgressBar/ProgressBar'
import useFetchCourse from '../../hooks/useFetchCourse'
import useAuth from '../../hooks/useAuth'
import styles from '../../styles/dashboard.module.css'

const StudentDashboard = () => {
  const { user } = useAuth()
  const { enrolledCourses, isLoading, fetchEnrolledCourses } = useFetchCourse()
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    inProgress: 0,
    totalHours: 0
  })

  useEffect(() => {
    fetchEnrolledCourses()
  }, [])

  useEffect(() => {
    if (enrolledCourses.length > 0) {
      const completed = enrolledCourses.filter(c => c.progress === 100).length
      const inProgress = enrolledCourses.filter(c => c.progress > 0 && c.progress < 100).length
      const totalHours = enrolledCourses.reduce((acc, c) => acc + (c.hours || 0), 0)
      
      setStats({
        totalCourses: enrolledCourses.length,
        completedCourses: completed,
        inProgress: inProgress,
        totalHours: totalHours
      })
    }
  }, [enrolledCourses])

  return (
    <MainLayout>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Welcome back, {user?.name}!</h1>
        <p className={styles.pageSubtitle}>Continue your learning journey</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📚</div>
          <div className={styles.statLabel}>Enrolled Courses</div>
          <div className={styles.statValue}>{stats.totalCourses}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>✅</div>
          <div className={styles.statLabel}>Completed</div>
          <div className={styles.statValue}>{stats.completedCourses}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📖</div>
          <div className={styles.statLabel}>In Progress</div>
          <div className={styles.statValue}>{stats.inProgress}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>⏱️</div>
          <div className={styles.statLabel}>Learning Hours</div>
          <div className={styles.statValue}>{stats.totalHours}h</div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Continue Learning</h2>
        </div>

        {isLoading ? (
          <div className={styles.emptyState}>
            <p>Loading your courses...</p>
          </div>
        ) : enrolledCourses.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyStateIcon}>📚</p>
            <p className={styles.emptyStateText}>No courses enrolled yet</p>
            <p className={styles.emptyStateSubtext}>Browse our course catalog to get started</p>
          </div>
        ) : (
          <div className={styles.courseGrid}>
            {enrolledCourses.map(course => (
              <div key={course.id} style={{ background: 'var(--dark-card)', border: '1px solid var(--dark-border)', borderRadius: '1rem', padding: '1.5rem' }}>
                <CourseCard course={course} />
                <div style={{ marginTop: '1rem' }}>
                  <ProgressBar 
                    progress={course.progress || 0} 
                    label="Course Progress"
                    showPercentage={true}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  )
}

export default StudentDashboard
