import React from 'react'
import Progress from '../pages/Student/Progress'
import Settings from '../pages/Student/Settings'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import CourseList from '../pages/Courses/CourseList'
import CourseDetails from '../pages/Courses/CourseDetails'
import StudentDashboard from '../pages/Dashboard/StudentDashboard'
import InstructorDashboard from '../pages/Dashboard/InstructorDashboard'
import LecturerSelection from '../pages/Lecturers/LecturerSelection'
import AdminDashboard from '../pages/Admin/AdminDashboard'
import UserManagement from '../pages/Admin/UserManagement'
import CourseManagement from '../pages/Admin/CourseManagement'
import PrivateRoute from './PrivateRoute'

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/courses" element={<CourseList />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        
        <Route path="/lecturers" element={
          <PrivateRoute>
            <LecturerSelection />
          </PrivateRoute>
        } />
        
        <Route path="/dashboard" element={
          <PrivateRoute>
            <StudentDashboard />
          </PrivateRoute>
        } />
        
        <Route path="/instructor-dashboard" element={
          <PrivateRoute requiredRole="instructor">
            <InstructorDashboard />
          </PrivateRoute>
        } />
        
        <Route path="/admin" element={
          <PrivateRoute requiredRole="admin">
            <AdminDashboard />
          </PrivateRoute>
        } />
        
        <Route path="/admin/users" element={
          <PrivateRoute requiredRole="admin">
            <UserManagement />
          </PrivateRoute>
        } />
        
        <Route path="/admin/courses" element={
          <PrivateRoute requiredRole="admin">
            <CourseManagement />
          </PrivateRoute>
        } />
        
                <Route
          path="/progress"
          element={
            <PrivateRoute>
              <Progress />
            </PrivateRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default AppRouter
