import React, { useEffect, useState } from 'react'
import MainLayout from '../../layouts/MainLayout'
import CourseCard from '../../components/ui/CourseCard/CourseCard'
import useFetchCourse from '../../hooks/useFetchCourse'
import styles from '../../styles/dashboard.module.css'

const CourseList = () => {
  const { courses, isLoading, error, fetchAllCourses } = useFetchCourse()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchAllCourses()
  }, [])

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <MainLayout>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>All Courses</h1>
        <p className={styles.pageSubtitle}>Explore our comprehensive course library</p>
      </div>

      <div className={styles.searchBar}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className={styles.emptyState}>
          <p>Loading courses...</p>
        </div>
      ) : error ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyStateText}>Error loading courses</p>
          <p className={styles.emptyStateSubtext}>{error}</p>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyStateIcon}>📚</p>
          <p className={styles.emptyStateText}>No courses found</p>
          <p className={styles.emptyStateSubtext}>Try adjusting your search terms</p>
        </div>
      ) : (
        <div className={styles.courseGrid}>
          {filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </MainLayout>
  )
}

export default CourseList
