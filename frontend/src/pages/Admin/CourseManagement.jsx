import React, { useEffect, useState } from 'react'
import MainLayout from '../../layouts/MainLayout'
import adminApi from '../../api/adminApi'
import Button from '../../components/common/Button/Button'
import Input from '../../components/common/Input/Input'
import Modal from '../../components/common/Modal/Modal'
import styles from '../../styles/dashboard.module.css'

const CourseManagement = () => {
  const [courses, setCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    duration: '',
    lessons: 0,
    price: 0,
    rating: 0
  })

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await adminApi.getAnalytics()
      // Mock data for now
      setCourses([
        { id: 1, title: 'Python Programming', category: 'Programming', duration: '10 hours', lessons: 20, price: 999, rating: 4.5 },
        { id: 2, title: 'Java Development', category: 'Programming', duration: '15 hours', lessons: 30, price: 1499, rating: 4.7 },
        { id: 3, title: 'Web Development', category: 'Web', duration: '20 hours', lessons: 40, price: 1999, rating: 4.8 }
      ])
    } catch (error) {
      console.error('Failed to fetch courses:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateCourse = async () => {
    try {
      await adminApi.createCourse(formData)
      setCourses([...courses, { ...formData, id: courses.length + 1 }])
      setIsModalOpen(false)
      setFormData({
        title: '',
        description: '',
        category: '',
        duration: '',
        lessons: 0,
        price: 0,
        rating: 0
      })
    } catch (error) {
      console.error('Failed to create course:', error)
      alert('Failed to create course')
    }
  }

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await adminApi.deleteCourse(courseId)
        setCourses(courses.filter(course => course.id !== courseId))
      } catch (error) {
        console.error('Failed to delete course:', error)
        alert('Failed to delete course')
      }
    }
  }

  const openCreateModal = () => {
    setEditingCourse(null)
    setFormData({
      title: '',
      description: '',
      category: '',
      duration: '',
      lessons: 0,
      price: 0,
      rating: 0
    })
    setIsModalOpen(true)
  }

  return (
    <MainLayout>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Course Management</h1>
        <p className={styles.pageSubtitle}>Manage all platform courses</p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <Button variant="primary" onClick={openCreateModal}>
          + Add New Course
        </Button>
      </div>

      {isLoading ? (
        <div className={styles.emptyState}>
          <p>Loading courses...</p>
        </div>
      ) : courses.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyStateIcon}>📚</p>
          <p className={styles.emptyStateText}>No courses found</p>
        </div>
      ) : (
        <div className={styles.contentSection}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--dark-border)' }}>
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)' }}>Title</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)' }}>Category</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)' }}>Duration</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)' }}>Price</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)' }}>Rating</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course.id} style={{ borderBottom: '1px solid var(--dark-border)' }}>
                  <td style={{ padding: '1rem', color: 'var(--text-primary)' }}>{course.title}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{course.category}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{course.duration}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-primary)' }}>₹{course.price}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-primary)' }}>⭐ {course.rating}</td>
                  <td style={{ padding: '1rem' }}>
                    <Button 
                      variant="danger" 
                      size="small"
                      onClick={() => handleDeleteCourse(course.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={editingCourse ? 'Edit Course' : 'Create New Course'}
      >
        <div style={{ padding: '1rem' }}>
          <Input
            label="Course Title"
            name="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <Input
            label="Description"
            name="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
          <Input
            label="Category"
            name="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          />
          <Input
            label="Duration"
            name="duration"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            required
          />
          <Input
            label="Number of Lessons"
            type="number"
            name="lessons"
            value={formData.lessons}
            onChange={(e) => setFormData({ ...formData, lessons: parseInt(e.target.value) })}
            required
          />
          <Input
            label="Price (₹)"
            type="number"
            name="price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
            required
          />
          <Button 
            variant="primary" 
            onClick={handleCreateCourse}
            style={{ marginTop: '1rem', width: '100%' }}
          >
            {editingCourse ? 'Update Course' : 'Create Course'}
          </Button>
        </div>
      </Modal>
    </MainLayout>
  )
}

export default CourseManagement
