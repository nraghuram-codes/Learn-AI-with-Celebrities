import React from 'react'
import styles from './Spinner.module.css'

const Spinner = ({ size = 'medium', color = 'primary' }) => {
  return (
    <div className={`${styles.spinner} ${styles[size]} ${styles[color]}`}></div>
  )
}

export default Spinner
