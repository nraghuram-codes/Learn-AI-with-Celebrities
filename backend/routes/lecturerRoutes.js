import express from 'express'
import prisma from '../config/database.js'
import { asyncHandler } from '../middleware/errorHandler.js'
import { auth, adminAuth } from '../middleware/auth.js'

const router = express.Router()

// Get all lecturers (public)
router.get('/', asyncHandler(async (req, res) => {
  const lecturers = await prisma.lecturer.findMany({
    orderBy: { createdAt: 'desc' }
  })

  res.status(200).json({
    success: true,
    data: lecturers
  })
}))

// Get lecturer by ID (public)
router.get('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params

  const lecturer = await prisma.lecturer.findUnique({
    where: { id }
  })

  if (!lecturer) {
    return res.status(404).json({
      success: false,
      message: 'Lecturer not found'
    })
  }

  res.status(200).json({
    success: true,
    data: lecturer
  })
}))

// Create lecturer (admin only)
router.post('/', auth, adminAuth, asyncHandler(async (req, res) => {
  const lecturerData = req.body

  const lecturer = await prisma.lecturer.create({
    data: lecturerData
  })

  res.status(201).json({
    success: true,
    message: 'Lecturer created successfully',
    data: lecturer
  })
}))

// Update lecturer (admin only)
router.put('/:id', auth, adminAuth, asyncHandler(async (req, res) => {
  const { id } = req.params
  const lecturerData = req.body

  const lecturer = await prisma.lecturer.update({
    where: { id },
    data: lecturerData
  })

  res.status(200).json({
    success: true,
    message: 'Lecturer updated successfully',
    data: lecturer
  })
}))

// Delete lecturer (admin only)
router.delete('/:id', auth, adminAuth, asyncHandler(async (req, res) => {
  const { id } = req.params

  await prisma.lecturer.delete({
    where: { id }
  })

  res.status(200).json({
    success: true,
    message: 'Lecturer deleted successfully'
  })
}))

export default router