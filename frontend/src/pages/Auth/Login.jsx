import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import styles from '../../styles/login.module.css'

const Login = () => {
  const navigate = useNavigate()

  const { login, isLoading, error } = useAuth()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const result = await login(formData)

    if (result.success) {
      navigate('/dashboard')
    }
  }

  return (
    <div className={styles.container}>
      {/* LEFT SECTION */}

      <div className={styles.leftSection}>
        <div className={styles.overlay}></div>

        <div className={styles.leftContent}>
          <div className={styles.logo}>
            🎬 StarLearn AI
          </div>

          <span className={styles.badge}>
            AI Powered Learning
          </span>

          <h1>
            Learn from <span>Celebrities</span>
            <br />
            & Industry Experts
          </h1>

          <p>
            Build your future with premium online
            courses, celebrity mentors, and
            AI-powered learning experiences.
          </p>

          <div className={styles.featureList}>
            <div className={styles.featureItem}>
              🚀 Career Focused Courses
            </div>

            <div className={styles.featureItem}>
              🎓 Expert Celebrity Mentors
            </div>

            <div className={styles.featureItem}>
              📚 Learn Anytime Anywhere
            </div>
          </div>

          {/* CELEBRITY IMAGES */}

          <div className={styles.actorGrid}>
            <img
              src='/images/prabhas.jpg'
              alt='Prabhas'
            />

            <img
              src='/images/vijay.jpg'
              alt='Vijay'
            />

            <img
              src='/images/mahesh babu.jpg'
              alt='Mahesh Babu'
            />

            <img
              src='/images/virat kohli.jpg'
              alt='Virat Kohli'
            />

            <img
              src='/images/rohit sharma.jpg'
              alt='Rohit Sharma'
            />
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}

      <div className={styles.rightSection}>
        <div className={styles.loginCard}>
          <h2>Welcome Back 👋</h2>

          <p>
            Sign in to continue your learning
            journey
          </p>

          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label>Email Address</label>

              <input
                type='email'
                name='email'
                placeholder='Enter your email'
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Password</label>

              <input
                type='password'
                name='password'
                placeholder='Enter your password'
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type='submit'
              className={styles.loginButton}
              disabled={isLoading}
            >
              {isLoading
                ? 'Signing In...'
                : 'Login'}
            </button>
          </form>

          <div className={styles.footer}>
            Don’t have an account?
            <Link to='/register'>
              {' '}
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login