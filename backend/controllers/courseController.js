import prisma from '../config/database.js'
import { asyncHandler } from '../middleware/errorHandler.js'

// Get All Courses
export const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: 'desc' }
  })

  res.status(200).json({
    success: true,
    data: courses
  })
})

// Get Course by ID
export const getCourseById = asyncHandler(async (req, res) => {
  const { id } = req.params

  const course = await prisma.course.findUnique({
    where: { id }
  })
  if (!course) {
    return res.status(404).json({
      success: false,
      message: 'Course not found'
    })
  }

  res.status(200).json({
    success: true,
    data: course
  })
})

// Enroll in Course
export const enrollCourse = asyncHandler(async (req, res) => {
  const { id } = req.params
  const userId = req.user.userId

  console.log('req.user:', req.user)
  console.log('userId:', userId)
  console.log('courseId:', id)

  // Check if course exists
  const course = await prisma.course.findUnique({
    where: { id }
  })

  if (!course) {
    return res.status(404).json({
      success: false,
      message: 'Course not found'
    })
  }

  // Check if user exists
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })

  console.log('User found:', user)

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found. Please login again.'
    })
  }

  // Check if already enrolled
  const existingEnrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: id
      }
    }
  })

  if (existingEnrollment) {
    return res.status(400).json({
      success: false,
      message: 'Already enrolled in this course'
    })
  }

  // Create enrollment
  const enrollment = await prisma.enrollment.create({
    data: {
      userId,
      courseId: id
    },
    include: {
      course: true
    }
  })

  res.status(201).json({
    success: true,
    message: 'Successfully enrolled in course',
    data: enrollment
  })
})
// Get Enrolled Courses
export const getEnrolledCourses = asyncHandler(async (req, res) => {
const userId = req.user.userId
  const enrollments = await prisma.enrollment.findMany({
    where: { userId },
    include: {
      course: true
    },
    orderBy: { enrolledAt: 'desc' }
  })

  // Add progress to each enrollment
  const coursesWithProgress = await Promise.all(
    enrollments.map(async (enrollment) => {
      const progressRecords = await prisma.progress.findMany({
        where: {
          userId,
          courseId: enrollment.courseId
        }
      })

      const totalLessons = enrollment.course.lessons
      const completedLessons = progressRecords.filter(p => p.completed).length
      const overallProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

     return {
  ...enrollment.course,
  progress:
    overallProgress > 0
      ? Math.round(overallProgress)
      : 10,
  hours: enrollment.course.duration
}
    })
  )

  res.status(200).json({
    success: true,
    data: coursesWithProgress
  })
})

// Update Progress
export const updateProgress = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { lessonId, progress } = req.body
  const userId = req.user.userId

  // Check if enrolled
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: id
      }
    }
  })

  if (!enrollment) {
    return res.status(400).json({
      success: false,
      message: 'Not enrolled in this course'
    })
  }

  // Update or create progress
  const progressRecord = await prisma.progress.upsert({
    where: {
      userId_courseId_lessonId: {
        userId,
        courseId: id,
        lessonId
      }
    },
    update: {
      percentage: progress,
      completed: progress === 100
    },
    create: {
      userId,
      courseId: id,
      lessonId,
      percentage: progress,
      completed: progress === 100
    }
  })

  // Update enrollment progress
  const allProgress = await prisma.progress.findMany({
    where: {
      userId,
      courseId: id
    }
  })

  const totalLessons = await prisma.course.findUnique({
    where: { id },
    select: { lessons: true }
  })

  const completedLessons = allProgress.filter(p => p.completed).length
  const overallProgress = totalLessons.lessons > 0 
    ? (completedLessons / totalLessons.lessons) * 100 
    : 0

  await prisma.enrollment.update({
    where: {
      userId_courseId: {
        userId,
        courseId: id
      }
    },
    data: {
      progress: Math.round(overallProgress)
    }
  })

  res.status(200).json({
    success: true,
    message: 'Progress updated successfully',
    data: progressRecord
  })
})

// Generate AI Video for Course
export const generateVideo = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { lecturerId } = req.body

  console.log('Video generation request - Course ID:', id, 'Lecturer ID:', lecturerId)

  // Check if course exists
  const course = await prisma.course.findUnique({
    where: { id }
  })

  if (!course) {
    console.error('Course not found:', id)
    return res.status(404).json({
      success: false,
      message: 'Course not found'
    })
  }

  console.log('Course found:', course.title)

  // Check if lecturer exists
  const lecturer = await prisma.lecturer.findUnique({
    where: { id: lecturerId }
  })

  if (!lecturer) {
    console.error('Lecturer not found:', lecturerId)
    return res.status(404).json({
      success: false,
      message: 'Lecturer not found'
    })
  }

  console.log('Lecturer found:', lecturer.name)

  // Update course with selected lecturer and set status to generating
  const updatedCourse = await prisma.course.update({
    where: { id },
    data: {
      selectedLecturerId: lecturerId,
      videoStatus: 'generating'
    }
  })

  console.log('Course updated with generating status')

  // Generate video script (this would be replaced with actual AI generation)
  const videoScript = generateVideoScript(course, lecturer)

  console.log('Video script generated, length:', videoScript.length)

  // Simulate video generation (in production, this would call an AI video generation API)
  // For now, we'll set a mock video URL after a delay
  setTimeout(async () => {
    try {
      console.log('Completing video generation for course:', id)
      await prisma.course.update({
        where: { id },
        data: {
          videoUrl: `https://example.com/videos/${id}.mp4`,
          videoScript: videoScript,
          videoStatus: 'completed'
        }
      })
      console.log('Video generation completed successfully')
    } catch (error) {
      console.error('Error updating video status:', error)
    }
  }, 5000) // Simulate 5 second generation time

  res.status(200).json({
    success: true,
    message: 'Video generation started',
    data: {
      courseId: id,
      lecturerId,
      status: 'generating'
    }
  })
})

// Get Video Status
export const getVideoStatus = asyncHandler(async (req, res) => {
  const { id } = req.params

  const course = await prisma.course.findUnique({
    where: { id },
    select: {
      videoStatus: true,
      videoUrl: true,
      videoScript: true,
      selectedLecturerId: true
    }
  })

  if (!course) {
    return res.status(404).json({
      success: false,
      message: 'Course not found'
    })
  }

  res.status(200).json({
    success: true,
    data: course
  })
})

// Update Selected Lecturer
export const updateLecturer = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { lecturerId } = req.body

  // Check if course exists
  const course = await prisma.course.findUnique({
    where: { id }
  })

  if (!course) {
    return res.status(404).json({
      success: false,
      message: 'Course not found'
    })
  }

  // Check if lecturer exists
  const lecturer = await prisma.lecturer.findUnique({
    where: { id: lecturerId }
  })

  if (!lecturer) {
    return res.status(404).json({
      success: false,
      message: 'Lecturer not found'
    })
  }

  // Update course with new lecturer and reset video status
  const updatedCourse = await prisma.course.update({
    where: { id },
    data: {
      selectedLecturerId: lecturerId,
      videoStatus: 'not_generated',
      videoUrl: null,
      videoScript: null
    }
  })

  res.status(200).json({
    success: true,
    message: 'Lecturer updated successfully',
    data: updatedCourse
  })
})

// Helper function to generate video script
function generateVideoScript(course, lecturer) {
  try {
    // Safely handle specialties array
    let specialties = lecturer.specialties || []
    if (typeof specialties === 'string') {
      specialties = [specialties]
    }
    
    const specialtyMatch = specialties.find(s => 
      course.category?.toLowerCase().includes(s?.toLowerCase()) ||
      course.title?.toLowerCase().includes(s?.toLowerCase())
    ) || specialties[0] || 'teaching'

    // Safely handle learningOutcomes array
    let learningOutcomes = course.learningOutcomes || []
    if (typeof learningOutcomes === 'string') {
      learningOutcomes = [learningOutcomes]
    }
    const outcomesText = Array.isArray(learningOutcomes) && learningOutcomes.length > 0
      ? learningOutcomes.map((outcome, index) => `${index + 1}. ${outcome}`).join('\n')
      : '1. Gain practical skills\n2. Build real-world projects\n3. Enhance your expertise'

    return `
# ${course.title} - Taught by ${lecturer.name}

## [00:00] Introduction
Hello everyone! I'm ${lecturer.name}, and I'm thrilled to be your instructor for this ${course.title} course.

As someone who specializes in ${specialtyMatch}, I'm excited to share my expertise with you.

${lecturer.bio}

## [00:30] Course Overview
${course.description}

## [01:00] What You'll Master
${outcomesText}

## [01:30] Course Structure
This comprehensive course consists of ${course.lessons || 20} carefully crafted lessons with a total duration of ${course.duration || '10 hours'}.

## [02:00] Why This Course Matters
In today's fast-paced world, mastering ${course.title} is essential for your career growth. This course will give you practical, hands-on experience that you can apply immediately.

## [02:30] Learning Approach
We'll use a combination of:
- Interactive demonstrations
- Real-world projects
- Practical exercises
- Expert insights from my experience in ${specialtyMatch}

## [03:00] Prerequisites
No prior experience required! Whether you're a complete beginner or looking to enhance your skills, this course is designed for you.

## [03:30] What Makes This Course Special
- Learn from industry expert ${lecturer.name}
- Practical, job-ready skills
- Comprehensive curriculum
- Supportive learning environment

## [04:00] Let's Begin Your Journey
Are you ready to transform your skills and master ${course.title}? Let's dive in and start this exciting learning adventure together!

## [04:30] Course Outline
${Array.from({length: Math.min(course.lessons || 20, 5)}, (_, i) => `
### Lesson ${i + 1}
${getLessonContent(course.category, i + 1)}
`).join('\n')}

${(course.lessons || 20) > 5 ? `\n... and ${(course.lessons || 20) - 5} more lessons!\n` : ''}

## [05:00] Final Thoughts
I'm ${lecturer.name}, and I can't wait to see what you'll achieve. Let's get started on this incredible learning journey!

---
Generated by AI Learning Platform
Instructor: ${lecturer.name}
Course: ${course.title}
Duration: ${course.duration || '10 hours'}
  `.trim()
  } catch (error) {
    console.error('Error generating video script:', error)
    // Return a basic script if generation fails
    return `# ${course.title} - Taught by ${lecturer.name}\n\nWelcome to ${course.title} course taught by ${lecturer.name}!\n\n${course.description}`
  }
}

// Helper function to generate lesson content based on course category
function getLessonContent(category, lessonNumber) {
  const categoryContents = {
    'Programming': [
      'Introduction to programming fundamentals and variables',
      'Control structures and logical thinking',
      'Functions and modular programming',
      'Object-oriented concepts and design',
      'Advanced topics and best practices'
    ],
    'Web Development': [
      'HTML5 structure and semantic elements',
      'CSS3 styling and responsive design',
      'JavaScript fundamentals and DOM manipulation',
      'Modern frameworks and component architecture',
      'Deployment and optimization techniques'
    ],
    'Data Science': [
      'Data collection and cleaning techniques',
      'Exploratory data analysis and visualization',
      'Statistical methods and hypothesis testing',
      'Machine learning algorithms and models',
      'Real-world project implementation'
    ],
    'Full Stack': [
      'Frontend development with modern frameworks',
      'Backend API design and implementation',
      'Database design and management',
      'Authentication and security best practices',
      'Full-stack project deployment'
    ]
  }

  const contents = categoryContents[category] || categoryContents['Programming']
  return contents[lessonNumber - 1] || `Advanced lesson ${lessonNumber} - Building practical skills`
}
