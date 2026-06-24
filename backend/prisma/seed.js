import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@learnwithcelebs.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@learnwithcelebs.com',
      password: hashedPassword,
      role: 'admin'
    }
  })
  console.log('Admin user created:', admin.email)

  // Create lecturers
  const lecturers = [
    {
      name: 'Prabhas',
      bio: 'Baahubali Star - Teaches Acting & Film Making',
      image: '/images/prabhas.jpg',
      specialties: ['Acting', 'Film Making', 'Direction']
    },
    {
      name: 'Allu Arjun',
      bio: 'Stylish Star - Teaches Dance & Performance',
      image: '/images/Allu-Arjun.jpg',
      specialties: ['Dance', 'Performance', 'Choreography']
    },
    {
      name: 'Mahesh Babu',
      bio: 'Superstar - Teaches Communication & Leadership',
      image: '/images/mahesh babu.jpg',
      specialties: ['Communication', 'Leadership', 'Public Speaking']
    },
    {
      name: 'Vijay Thalapathy',
      bio: 'Thalapathy - Teaches Motivation & Fitness',
      image: '/images/vijay.jpg',
      specialties: ['Motivation', 'Fitness', 'Discipline']
    },
    {
      name: 'Virat Kohli',
      bio: 'Cricket Legend - Teaches Sports & Discipline',
      image: '/images/virat kohli.jpg',
      specialties: ['Sports', 'Discipline', 'Mental Strength']
    },
    {
      name: 'Rohit Sharma',
      bio: 'Hitman - Teaches Strategy & Team Building',
      image: '/images/rohit sharma.jpg',
      specialties: ['Strategy', 'Team Building', 'Leadership']
    }
  ]

  for (const lecturer of lecturers) {
    try {
      await prisma.lecturer.create({
        data: lecturer
      })
      console.log(`✓ Lecturer created: ${lecturer.name}`)
    } catch (error) {
      console.log(`- Lecturer already exists: ${lecturer.name}`)
    }
  }
  console.log('Lecturers created')

  // Create courses
  const courses = [
    {
      title: 'Python Programming Masterclass',
      description: 'Learn Python from scratch and build real-world applications. This comprehensive course covers everything from basics to advanced concepts.',
      category: 'Programming',
      duration: '10 hours',
      lessons: 20,
      price: 999,
      rating: 4.5,
      image: null,
      learningOutcomes: [
        'Master Python fundamentals',
        'Build real-world applications',
        'Understand OOP concepts',
        'Work with databases'
      ]
    },
    {
      title: 'Java Development Complete Guide',
      description: 'Become a Java expert with this comprehensive course covering core Java, advanced concepts, and framework development.',
      category: 'Programming',
      duration: '15 hours',
      lessons: 30,
      price: 1499,
      rating: 4.7,
      image: null,
      learningOutcomes: [
        'Master Java fundamentals',
        'Build enterprise applications',
        'Understand Spring Framework',
        'Learn design patterns'
      ]
    },
    {
      title: 'HTML & CSS Web Development',
      description: 'Create beautiful, responsive websites with HTML5 and CSS3. Learn modern web development techniques.',
      category: 'Web Development',
      duration: '8 hours',
      lessons: 16,
      price: 799,
      rating: 4.6,
      image: null,
      learningOutcomes: [
        'Master HTML5 semantics',
        'Create responsive layouts with CSS3',
        'Build modern websites',
        'Understand web accessibility'
      ]
    },
    {
      title: 'JavaScript Fundamentals',
      description: 'Learn JavaScript from basics to advanced. Build interactive web applications and understand modern JS features.',
      category: 'Web Development',
      duration: '12 hours',
      lessons: 24,
      price: 1199,
      rating: 4.8,
      image: null,
      learningOutcomes: [
        'Master JavaScript fundamentals',
        'Understand ES6+ features',
        'Build interactive applications',
        'Learn async programming'
      ]
    },
    {
      title: 'MERN Stack Full-Stack Development',
      description: 'Build complete web applications using MongoDB, Express, React, and Node.js. From frontend to backend.',
      category: 'Full Stack',
      duration: '25 hours',
      lessons: 50,
      price: 2499,
      rating: 4.9,
      image: null,
      learningOutcomes: [
        'Master MongoDB',
        'Build REST APIs with Express',
        'Create React applications',
        'Deploy full-stack apps'
      ]
    },
    {
      title: 'Data Science with Python',
      description: 'Learn data science concepts including data analysis, visualization, machine learning with Python.',
      category: 'Data Science',
      duration: '20 hours',
      lessons: 40,
      price: 1999,
      rating: 4.7,
      image: null,
      learningOutcomes: [
        'Master data analysis',
        'Create data visualizations',
        'Build ML models',
        'Work with real datasets'
      ]
    }
  ]

  for (const course of courses) {
    try {
      await prisma.course.create({
        data: course
      })
      console.log(`✓ Course created: ${course.title}`)
    } catch (error) {
      console.log(`- Course already exists: ${course.title}`)
    }
  }
  console.log('All courses created')

  console.log('Database seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
