import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Sidebar.module.css'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/courses', label: 'Courses', icon: '📚' },
    { path: '/lecturers', label: 'Celebrity Lecturers', icon: '⭐' },
    { path: '/progress', label: 'My Progress', icon: '📈' },
    { path: '/settings', label: 'Settings', icon: '⚙️' }
  ]

  return (
    <>
      <button 
        className={styles.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '☰'}
      </button>

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>Menu</h2>
        </div>

        <nav className={styles.sidebarNav}>
          <ul className={styles.menuList}>
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`${styles.menuItem} ${location.pathname === item.path ? styles.active : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className={styles.menuIcon}>{item.icon}</span>
                  <span className={styles.menuLabel}>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.sidebarFooter}>
          <p className={styles.footerText}>Learn with Celebs</p>
          <p className={styles.footerSubtext}>© 2024 All rights reserved</p>
        </div>
      </aside>

      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)}></div>
      )}
    </>
  )
}

export default Sidebar
