import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import styles from './Navbar.module.css'

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>🎓</span>
          <span className={styles.logoText}>Learn with Celebs</span>
        </Link>

        <div className={styles.navLinks}>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className={styles.navLink}>
                Dashboard
              </Link>
              {user?.role === 'admin' && (
                <Link to="/admin" className={styles.navLink}>
                  Admin
                </Link>
              )}
              <div className={styles.userMenu}>
                <span className={styles.userName}>{user?.name}</span>
                <button onClick={logout} className={styles.logoutButton}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.navLink}>
                Login
              </Link>
              <Link to="/register" className={styles.navLink}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
