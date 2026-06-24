import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../config/database.js'
import { asyncHandler } from '../middleware/errorHandler.js'

// Generate JWT Token
const generateToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  )
}

// Register
export const register = asyncHandler(async (req, res) => {
  
  const { name, email, password, role = 'student' } = req.body

  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'User already exists with this email'
    })
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role
    }
  })

  // Generate token
  const token = generateToken(user.id, user.role)

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    }
  })
})

// Login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    })
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    })
  }

  // Generate token
  const token = generateToken(user.id, user.role)

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    }
  })
})

// Get Profile
export const getProfile = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      enrollments: {
        include: {
          course: true
        }
      }
    }
  })

  res.status(200).json({
    success: true,
    data: user
  })
})

// Update Profile
export const updateProfile = asyncHandler(async (req, res) => {
  const { name } = req.body

  const user = await prisma.user.update({
    where: { id: req.user.userId },
    data: { name },
    select: {
      id: true,
      name: true,
      email: true,
      role: true
    }
  })

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: user
  })
})

// Logout
export const logout = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logout successful'
  })
})
