import prisma from '../config/database.js'
import { asyncHandler } from '../middleware/errorHandler.js'

// Get Analytics
export const getAnalytics = asyncHandler(async (req, res) => {
  const totalUsers = await prisma.user.count()
  const totalCourses = await prisma.course.count()
  const totalEnrollments = await prisma.enrollment.count()

  // Calculate completion rate
  const completedEnrollments = await prisma.enrollment.count({
    where: { progress: 100 }
  })
  const completionRate = totalEnrollments > 0 
    ? (completedEnrollments / totalEnrollments) * 100 
    : 0

  res.status(200).json({
    success: true,
    data: {
      totalUsers,
      totalCourses,
      totalEnrollments,
      completionRate: Math.round(completionRate)
    }
  })
})

// Get All Users
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      _count: {
        select: {
          enrollments: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  res.status(200).json({
    success: true,
    data: users
  })
})

// Delete User
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params

  await prisma.user.delete({
    where: { id }
  })

  res.status(200).json({
    success: true,
    message: 'User deleted successfully'
  })
})

// Update User Role
export const updateUserRole = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { role } = req.body

  const user = await prisma.user.update({
    where: { id },
    data: { role },
    select: {
      id: true,
      name: true,
      email: true,
      role: true
    }
  })

  res.status(200).json({
    success: true,
    message: 'User role updated successfully',
    data: user
  })
})

// Create Course
export const createCourse = asyncHandler(async (req, res) => {
  const courseData = req.body

  const course = await prisma.course.create({
    data: courseData
  })

  res.status(201).json({
    success: true,
    message: 'Course created successfully',
    data: course
  })
})

// Update Course
export const updateCourse = asyncHandler(async (req, res) => {
  const { id } = req.params
  const courseData = req.body

  const course = await prisma.course.update({
    where: { id },
    data: courseData
  })

  res.status(200).json({
    success: true,
    message: 'Course updated successfully',
    data: course
  })
})

// Delete Course
export const deleteCourse = asyncHandler(async (req, res) => {
  const { id } = req.params

  await prisma.course.delete({
    where: { id }
  })

  res.status(200).json({
    success: true,
    message: 'Course deleted successfully'
  })
})

// Create Lecturer
export const createLecturer = asyncHandler(async (req, res) => {
  const lecturerData = req.body

  const lecturer = await prisma.lecturer.create({
    data: lecturerData
  })

  res.status(201).json({
    success: true,
    message: 'Lecturer created successfully',
    data: lecturer
  })
})

// Update Lecturer
export const updateLecturer = asyncHandler(async (req, res) => {
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
})

// Delete Lecturer
export const deleteLecturer = asyncHandler(async (req, res) => {
  const { id } = req.params

  await prisma.lecturer.delete({
    where: { id }
  })

  res.status(200).json({
    success: true,
    message: 'Lecturer deleted successfully'
  })
})

// Get Progress Reports
export const getProgressReports = asyncHandler(async (req, res) => {
  const enrollments = await prisma.enrollment.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      course: {
        select: {
          id: true,
          title: true,
          category: true
        }
      }
    },
    orderBy: { progress: 'desc' }
  })

  res.status(200).json({
    success: true,
    data: enrollments
  })
})
