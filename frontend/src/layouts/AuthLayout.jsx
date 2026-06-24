import React from 'react'
import styles from '../styles/auth.module.css'

const AuthLayout = ({ children }) => {
  return (
    <div className={styles.authLayout}>
      <div className={styles.authContainer}>
        {children}
      </div>
    </div>
  )
}

export default AuthLayout
