import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import styles from '../../styles/dashboard.module.css'

const InstructorDashboard = () => {
  return (
    <MainLayout>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Instructor Dashboard</h1>
        <p className={styles.pageSubtitle}>Manage your courses and students</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📚</div>
          <div className={styles.statLabel}>My Courses</div>
          <div className={styles.statValue}>0</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>👥</div>
          <div className={styles.statLabel}>Total Students</div>
          <div className={styles.statValue}>0</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>⭐</div>
          <div className={styles.statLabel}>Average Rating</div>
          <div className={styles.statValue}>0.0</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>💰</div>
          <div className={styles.statLabel}>Total Earnings</div>
          <div className={styles.statValue}>₹0</div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>My Courses</h2>
        </div>
        <div className={styles.emptyState}>
          <p className={styles.emptyStateIcon}>📚</p>
          <p className={styles.emptyStateText}>No courses created yet</p>
          <p className={styles.emptyStateSubtext}>Start creating your first course</p>
        </div>
      </div>
    </MainLayout>
  )
}

export default InstructorDashboard
