# AI Learning Platform - Learn with Celebs

A complete full-stack AI Learning Platform built with React, Express.js, PostgreSQL, and Prisma ORM. Features celebrity lecturers, secure authentication, progress tracking, student dashboard, and admin panel.

## 🚀 Features

### Authentication System
- User registration and login
- JWT-based authentication
- Role-based access control (student/admin)
- Secure password hashing with bcryptjs
- Protected routes

### Home Page
- Hero section with modern animations
- Featured courses display
- Celebrity lecturers showcase
- Responsive design

### Celebrity Lecturers
- Prabhas - Acting & Film Making
- Allu Arjun - Dance & Performance
- Mahesh Babu - Communication & Leadership
- Vijay Thalapathy - Motivation & Fitness
- Virat Kohli - Sports & Discipline
- Rohit Sharma - Strategy & Team Building

### Student Dashboard
- Enrolled courses view
- Progress tracking with visual progress bars
- Learning statistics
- Continue learning section

### Admin Panel
- User management (view, delete, update roles)
- Course management (create, update, delete)
- Analytics dashboard
- Progress reports

### Courses
- Python Programming
- Java Development
- HTML & CSS Web Development
- JavaScript Fundamentals
- MERN Stack Full-Stack Development
- Data Science with Python

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- React Router DOM
- Axios
- Zustand (state management)
- CSS Modules
- Pure CSS3 (no Tailwind/Bootstrap)

### Backend
- Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcryptjs
- express-validator

## 📁 Project Structure

```
Learn with celebs/
├── frontend/
│   ├── src/
│   │   ├── api/              # API service layer
│   │   ├── assets/           # Images, icons, videos
│   │   ├── components/
│   │   │   ├── common/       # Button, Input, Spinner, Modal
│   │   │   └── ui/           # Navbar, Sidebar, CourseCard, etc.
│   │   ├── constants/        # API_URL, REGEX, ACTION_TYPES
│   │   ├── hooks/            # Custom React hooks
│   │   ├── layouts/          # MainLayout, AuthLayout
│   │   ├── pages/
│   │   │   ├── Auth/         # Login, Register
│   │   │   ├── Courses/      # CourseList, CourseDetails
│   │   │   ├── Dashboard/    # StudentDashboard, InstructorDashboard
│   │   │   ├── Admin/        # AdminDashboard, UserManagement, CourseManagement
│   │   │   ├── Home/         # Home page
│   │   │   └── Lecturers/    # LecturerSelection
│   │   ├── routes/           # AppRouter, PrivateRoute
│   │   ├── store/            # Zustand stores
│   │   ├── styles/           # CSS Modules
│   │   ├── utils/            # Utility functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/
│   ├── config/
│   │   └── database.js       # Prisma client
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── auth.js           # JWT authentication middleware
│   │   └── errorHandler.js
│   ├── prisma/
│   │   ├── schema.prisma     # Database schema
│   │   └── seed.js           # Database seed file
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── courseRoutes.js
│   │   └── adminRoutes.js
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "Learn with celebs"
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 3. Database Setup

#### Install PostgreSQL

Make sure PostgreSQL is installed and running on your system.

#### Create Database

```bash
# Open PostgreSQL shell or use pgAdmin
CREATE DATABASE ai_learning_platform;
```

#### Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cd backend
cp .env.example .env
```

Edit the `.env` file with your database credentials:

```env
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/ai_learning_platform"

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# CORS
CORS_ORIGIN=http://localhost:3000
```

#### Run Prisma Migrations

```bash
cd backend

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed the database with initial data
npx prisma db seed
```

### 4. Start the Backend

```bash
cd backend

# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The backend will run on `http://localhost:5000`

### 5. Start the Frontend

```bash
cd frontend

# Development mode
npm run dev

# Production build
npm run build
npm run preview
```

The frontend will run on `http://localhost:3000`

### 6. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Prisma Studio (optional): `npx prisma studio` (from backend directory)

## 👤 Default Admin Account

After seeding the database, you can login with:

- Email: `admin@learnwithcelebs.com`
- Password: `admin123`

## 🎯 Available Routes

### Frontend Routes

- `/` - Home page
- `/login` - Login page
- `/register` - Registration page
- `/courses` - All courses
- `/courses/:id` - Course details
- `/lecturers` - Celebrity lecturers selection (protected)
- `/dashboard` - Student dashboard (protected)
- `/admin` - Admin dashboard (admin only)
- `/admin/users` - User management (admin only)
- `/admin/courses` - Course management (admin only)

### Backend API Routes

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

#### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses/:id/enroll` - Enroll in course (protected)
- `GET /api/courses/enrolled/list` - Get enrolled courses (protected)
- `PUT /api/courses/:id/progress` - Update progress (protected)

#### Admin
- `GET /api/admin/analytics` - Get analytics (admin only)
- `GET /api/admin/reports/progress` - Get progress reports (admin only)
- `GET /api/admin/users` - Get all users (admin only)
- `DELETE /api/admin/users/:id` - Delete user (admin only)
- `PUT /api/admin/users/:id/role` - Update user role (admin only)
- `POST /api/admin/courses` - Create course (admin only)
- `PUT /api/admin/courses/:id` - Update course (admin only)
- `DELETE /api/admin/courses/:id` - Delete course (admin only)
- `POST /api/admin/lecturers` - Create lecturer (admin only)
- `PUT /api/admin/lecturers/:id` - Update lecturer (admin only)
- `DELETE /api/admin/lecturers/:id` - Delete lecturer (admin only)

## 🎨 UI/UX Features

- Dark modern theme
- Glassmorphism effects
- Smooth animations
- Responsive design (mobile-friendly)
- CSS Grid and Flexbox layouts
- CSS Variables for theming
- Custom scrollbars
- Loading spinners
- Toast notifications
- Modal dialogs
- Progress bars
- Card-based layouts

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcryptjs
- Protected routes
- Role-based access control
- CORS configuration
- Input validation
- Error handling

## 📊 Database Schema

### Models

- **User** - User accounts with roles
- **Course** - Course information
- **Lecturer** - Celebrity lecturer profiles
- **Enrollment** - User course enrollments
- **Progress** - Lesson progress tracking

## 🧪 Testing

To test the application:

1. Register a new user account
2. Login with the credentials
3. Browse courses and enroll
4. Track progress in the dashboard
5. Access admin panel with admin credentials

## 🐛 Troubleshooting

### Database Connection Issues

- Ensure PostgreSQL is running
- Check DATABASE_URL in backend/.env
- Verify database exists: `ai_learning_platform`

### Port Already in Use

- Change PORT in backend/.env
- Change port in frontend/vite.config.js

### CORS Errors

- Verify CORS_ORIGIN matches frontend URL
- Check backend CORS configuration

### Prisma Issues

- Run `npx prisma generate` after installing dependencies
- Run `npx prisma migrate dev` to sync schema
- Run `npx prisma db seed` to populate data

## 📝 Development Notes

- Frontend uses Vite for fast development
- Backend uses nodemon for auto-reload
- Prisma Studio for database management
- CSS Modules for component styling
- Zustand for state management
- React Router for navigation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ for learning with celebrities

## 🙏 Acknowledgments

- Celebrity images are placeholders
- Course content is for demonstration
- Built following modern web development best practices
