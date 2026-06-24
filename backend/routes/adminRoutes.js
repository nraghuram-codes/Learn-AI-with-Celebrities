import express from 'express'
import { auth, adminAuth } from '../middleware/auth.js'
import * as adminController from '../controllers/adminController.js'

const router = express.Router()

// All admin routes require authentication and admin role
router.use(auth, adminAuth)

// Analytics
router.get('/analytics', adminController.getAnalytics)
router.get('/reports/progress', adminController.getProgressReports)

// User Management
router.get('/users', adminController.getAllUsers)
router.delete('/users/:id', adminController.deleteUser)
router.put('/users/:id/role', adminController.updateUserRole)

// Course Management
router.post('/courses', adminController.createCourse)
router.put('/courses/:id', adminController.updateCourse)
router.delete('/courses/:id', adminController.deleteCourse)

// Lecturer Management
router.post('/lecturers', adminController.createLecturer)
router.put('/lecturers/:id', adminController.updateLecturer)
router.delete('/lecturers/:id', adminController.deleteLecturer)

export default router
