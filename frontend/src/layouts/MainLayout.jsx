import React from 'react'
import Navbar from '../components/ui/Navbar/Navbar'
import Sidebar from '../components/ui/Sidebar/Sidebar'
import styles from '../styles/dashboard.module.css'

const MainLayout = ({ children }) => {
  return (
    <div className={styles.mainLayout}>
      <Navbar />
      <div className={styles.layoutContent}>
        <Sidebar />
        <main className={styles.mainContent}>
          {children}
        </main>
      </div>
    </div>
  )
}

export default MainLayout
