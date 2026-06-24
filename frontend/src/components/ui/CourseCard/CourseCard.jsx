import React from 'react'
import { Link } from 'react-router-dom'
import styles from './CourseCard.module.css'

const CourseCard = ({ course }) => {
  // Category colors for placeholder
  const categoryColors = {
    'Programming': '#FF6B6B',
    'Web Development': '#4ECDC4',
    'Data Science': '#45B7D1',
    'Full Stack': '#96CEB4',
    'Acting': '#FFEAA7',
    'Dance': '#DFE6E9'
  }

  const bgColor = categoryColors[course.category] || '#95E1D3'

  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        {course.image ? (
          <img 
            src={course.image} 
            alt={course.title}
            className={styles.image}
          />
        ) : (
          <div 
            className={styles.imagePlaceholder}
            style={{ backgroundColor: bgColor }}
          >
            <div className={styles.placeholderContent}>
              <span className={styles.placeholderIcon}>
                {course.category === 'Programming' && '💻'}
                {course.category === 'Web Development' && '🌐'}
                {course.category === 'Data Science' && '📊'}
                {course.category === 'Full Stack' && '🚀'}
                {!['Programming', 'Web Development', 'Data Science', 'Full Stack'].includes(course.category) && '📚'}
              </span>
              <p className={styles.placeholderText}>{course.title}</p>
            </div>
          </div>
        )}
        <div className={styles.category}>{course.category}</div>
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.title}>{course.title}</h3>
        <p className={styles.description}>{course.description}</p>

        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <span className={styles.metaIcon}>⏱️</span>
            {course.duration}
          </span>
          <span className={styles.metaItem}>
            <span className={styles.metaIcon}>📚</span>
            {course.lessons} lessons
          </span>
          <span className={styles.metaItem}>
            <span className={styles.metaIcon}>⭐</span>
            {course.rating}
          </span>
        </div>

        <div className={styles.footer}>
          <div className={styles.price}>
            {course.price === 0 ? (
              <span className={styles.free}>Free</span>
            ) : (
              <span className={styles.paid}>₹{course.price}</span>
            )}
          </div>
          <Link to={`/courses/${course.id}`} className={styles.button}>
            View Course
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CourseCard
