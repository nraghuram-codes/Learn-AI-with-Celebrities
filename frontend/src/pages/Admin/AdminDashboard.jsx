import React, { useEffect, useState } from 'react'
import MainLayout from '../../layouts/MainLayout'
import * as adminApi from '../../api/adminApi'
import styles from '../../styles/dashboard.module.css'

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalEnrollments: 0,
    completionRate: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const response = await adminApi.getAnalytics()
      setAnalytics(response.data)
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <MainLayout>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Admin Dashboard</h1>
        <p className={styles.pageSubtitle}>Manage your platform</p>
      </div>

      {isLoading ? (
        <div className={styles.emptyState}>
          <p>Loading analytics...</p>
        </div>
      ) : (
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>👥</div>
            <div className={styles.statLabel}>Total Users</div>
            <div className={styles.statValue}>{analytics.totalUsers}</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📚</div>
            <div className={styles.statLabel}>Total Courses</div>
            <div className={styles.statValue}>{analytics.totalCourses}</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📖</div>
            <div className={styles.statLabel}>Total Enrollments</div>
            <div className={styles.statValue}>{analytics.totalEnrollments}</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>✅</div>
            <div className={styles.statLabel}>Completion Rate</div>
            <div className={styles.statValue}>{analytics.completionRate}%</div>
          </div>
        </div>
      )}

      <div className={styles.contentSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Quick Actions</h2>
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button style={{ 
            padding: '1rem 2rem', 
            background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', 
            color: 'white', 
            border: 'none', 
            borderRadius: '0.5rem', 
            fontWeight: '600', 
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}>
            Manage Users
          </button>
          <button style={{ 
            padding: '1rem 2rem', 
            background: 'linear-gradient(135deg, var(--success-color), #059669)', 
            color: 'white', 
            border: 'none', 
            borderRadius: '0.5rem', 
            fontWeight: '600', 
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}>
            Manage Courses
          </button>
          <button style={{ 
            padding: '1rem 2rem', 
            background: 'linear-gradient(135deg, var(--warning-color), #d97706)', 
            color: 'white', 
            border: 'none', 
            borderRadius: '0.5rem', 
            fontWeight: '600', 
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}>
            View Reports
          </button>
        </div>
      </div>
    </MainLayout>
  )
}

export default AdminDashboard
