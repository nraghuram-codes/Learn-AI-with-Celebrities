import express from 'express'
import { auth } from '../middleware/auth.js'
import * as courseController from '../controllers/courseController.js'

const router = express.Router()

// Get all courses
router.get('/', courseController.getAllCourses)

// Get enrolled courses
router.get(
  '/user/enrolled',
  auth,
  courseController.getEnrolledCourses
)

// Get single course
router.get('/:id', courseController.getCourseById)

// Enroll in course
router.post('/:id/enroll', auth, courseController.enrollCourse)

// Update progress
router.put(
  '/:id/progress',
  auth,
  courseController.updateProgress
)

// Generate AI video
router.post(
  '/:id/generate-video',
  auth,
  courseController.generateVideo
)

// Get video status
router.get(
  '/:id/video-status',
  auth,
  courseController.getVideoStatus
)

// Update lecturer
router.put(
  '/:id/lecturer',
  auth,
  courseController.updateLecturer
)

export default router