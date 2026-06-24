import { REGEX } from '../constants/REGEX'

export const validators = {
  email: (value) => {
    if (!value) return 'Email is required'
    if (!REGEX.EMAIL.test(value)) return 'Invalid email format'
    return ''
  },
  
  password: (value) => {
    if (!value) return 'Password is required'
    if (!REGEX.PASSWORD.test(value)) {
      return 'Password must be at least 8 characters with uppercase, lowercase, number, and special character'
    }
    return ''
  },
  
  name: (value) => {
    if (!value) return 'Name is required'
    if (!REGEX.NAME.test(value)) return 'Name must be 2-50 letters only'
    return ''
  },
  
  phone: (value) => {
    if (value && !REGEX.PHONE.test(value)) return 'Invalid phone number'
    return ''
  },
  
  required: (value, fieldName = 'This field') => {
    if (!value) return `${fieldName} is required`
    return ''
  },
  
  minLength: (value, min) => {
    if (value && value.length < min) return `Must be at least ${min} characters`
    return ''
  },
  
  maxLength: (value, max) => {
    if (value && value.length > max) return `Must be at most ${max} characters`
    return ''
  }
}
