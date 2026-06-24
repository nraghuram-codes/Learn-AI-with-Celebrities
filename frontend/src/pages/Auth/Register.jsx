import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../layouts/AuthLayout'
import Input from '../../components/common/Input/Input'
import Button from '../../components/common/Button/Button'
import useAuth from '../../hooks/useAuth'
import { validators } from '../../utils/validators'
import styles from '../../styles/auth.module.css'

const Register = () => {
  const navigate = useNavigate()
  const { register, isLoading, error, clearError } = useAuth()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  
  const [formErrors, setFormErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear field error when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }))
    }
    
    // Clear API error when user types
    if (error) {
      clearError()
    }
  }

  const validateForm = () => {
    const errors = {}
    
    const nameError = validators.name(formData.name)
    if (nameError) errors.name = nameError
    
    const emailError = validators.email(formData.email)
    if (emailError) errors.email = emailError
    
    const passwordError = validators.password(formData.password)
    if (passwordError) errors.password = passwordError
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    const { confirmPassword, ...registerData } = formData
    
    const result = await register(registerData)
    
    if (result.success) {
      navigate('/dashboard')
    }
  }

  return (
    <AuthLayout>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <h1 className={styles.authTitle}>Create Account</h1>
          <p className={styles.authSubtitle}>Start your learning journey today</p>
        </div>

        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        <form className={styles.authForm} onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            error={formErrors.name}
            required
          />

          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            error={formErrors.email}
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            error={formErrors.password}
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={formErrors.confirmPassword}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="large"
            loading={isLoading}
            disabled={isLoading}
          >
            Create Account
          </Button>
        </form>

        <div className={styles.authFooter}>
          <p className={styles.authFooterText}>
            Already have an account?{' '}
            <Link to="/login" className={styles.authFooterLink}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Register
