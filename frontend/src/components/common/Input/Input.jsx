import React from 'react'
import styles from './Input.module.css'

const Input = ({ 
  label, 
  type = 'text', 
  placeholder = '', 
  value = '', 
  onChange, 
  error = '', 
  disabled = false,
  required = false,
  name = '',
  className = '',
  ...props 
}) => {
  return (
    <div className={`${styles.inputGroup} ${className}`}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`${styles.input} ${error ? styles.error : ''}`}
        {...props}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  )
}

export default Input
