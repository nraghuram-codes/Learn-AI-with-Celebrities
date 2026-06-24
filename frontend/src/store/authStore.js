import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authApi } from '../api/authApi'

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Login
      login: async (credentials) => {
        set({ isLoading: true, error: null })

        try {
          const response = await authApi.login(credentials)

          const user = response.data.data.user
          const token = response.data.data.token

          // Store token
          localStorage.setItem('token', token)

          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false
          })

          return { success: true }
        } catch (error) {
          set({
            error:
              error.response?.data?.message || 'Login failed',
            isLoading: false
          })

          return {
            success: false,
            error: error.response?.data?.message
          }
        }
      },

      // Register
      register: async (userData) => {
        set({ isLoading: true, error: null })

        try {
          const response = await authApi.register(userData)

          const user = response.data.data.user
          const token = response.data.data.token

          // Store token
          localStorage.setItem('token', token)

          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false
          })

          return { success: true }
        } catch (error) {
          set({
            error:
              error.response?.data?.message ||
              'Registration failed',
            isLoading: false
          })

          return {
            success: false,
            error: error.response?.data?.message
          }
        }
      },

      // Logout
      logout: async () => {
        try {
          await authApi.logout()
        } catch (error) {
          console.error('Logout error:', error)
        }

        localStorage.removeItem('token')

        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null
        })
      },

      // Update Profile
      updateProfile: async (userData) => {
        set({ isLoading: true, error: null })

        try {
          const response = await authApi.updateProfile(userData)

          set({
            user: response.data.data,
            isLoading: false
          })

          return { success: true }
        } catch (error) {
          set({
            error:
              error.response?.data?.message ||
              'Update failed',
            isLoading: false
          })

          return { success: false }
        }
      },

      clearError: () => set({ error: null })
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
)

export default useAuthStore