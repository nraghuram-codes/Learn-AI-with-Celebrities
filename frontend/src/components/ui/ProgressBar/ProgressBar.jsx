import React from 'react'
import styles from './ProgressBar.module.css'

const ProgressBar = ({ progress, label, showPercentage = true, color = 'primary' }) => {
  const getColorClass = () => {
    switch (color) {
      case 'success':
        return styles.success
      case 'warning':
        return styles.warning
      case 'danger':
        return styles.danger
      default:
        return styles.primary
    }
  }

  return (
    <div className={styles.container}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.progressBar}>
        <div 
          className={`${styles.progressFill} ${getColorClass()}`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        >
          {showPercentage && (
            <span className={styles.percentage}>{Math.round(progress)}%</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
