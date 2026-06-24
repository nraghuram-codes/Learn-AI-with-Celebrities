import express from 'express'
import { body } from 'express-validator'
import { auth } from '../middleware/auth.js'
import * as authController from '../controllers/authController.js'

const router = express.Router()

// Validation middleware
const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
]

const loginValidation = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').notEmpty().withMessage('Password is required')
]

// Routes
router.post('/register', registerValidation, authController.register)
router.post('/login', loginValidation, authController.login)
router.post('/logout', auth, authController.logout)
router.get('/profile', auth, authController.getProfile)
router.put('/profile', auth, authController.updateProfile)

export default router
