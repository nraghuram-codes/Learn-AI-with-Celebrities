import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { exec } from 'child_process'
import { promisify } from 'util'

import authRoutes from './routes/authRoutes.js'
import courseRoutes from './routes/courseRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import lecturerRoutes from './routes/lecturerRoutes.js'

dotenv.config()

const execAsync = promisify(exec)

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(
  cors({
    origin:
      process.env.CORS_ORIGIN ||
      'http://localhost:3000',
    credentials: true
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/lecturers', lecturerRoutes)

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running'
  })
})

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack)

  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error:
      process.env.NODE_ENV === 'development'
        ? err.message
        : undefined
  })
})

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  })
})

// Run database migrations on startup
async function runMigrations() {
  try {
    console.log('Running Prisma migrations...')
    await execAsync('npx prisma generate')
    await execAsync('npx prisma migrate deploy')
    console.log('Migrations completed successfully')
  } catch (error) {
    console.error('Migration error:', error.message)
    // Don't fail the server if migrations fail
  }
}

// Start Server
const startServer = async () => {
  await runMigrations()
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    console.log(`Environment: ${process.env.NODE_ENV}`)
  })
}

startServer()