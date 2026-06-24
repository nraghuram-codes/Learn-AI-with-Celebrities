import React, { useEffect, useState } from 'react'
import MainLayout from '../../layouts/MainLayout'
import adminApi from '../../api/adminApi'
import Button from '../../components/common/Button/Button'
import Modal from '../../components/common/Modal/Modal'
import styles from '../../styles/dashboard.module.css'

const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await adminApi.getAllUsers()
      setUsers(response.data)
    } catch (error) {
      console.error('Failed to fetch users:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await adminApi.deleteUser(userId)
        setUsers(users.filter(user => user.id !== userId))
      } catch (error) {
        console.error('Failed to delete user:', error)
        alert('Failed to delete user')
      }
    }
  }

  const handleUpdateRole = async (userId, newRole) => {
    try {
      await adminApi.updateUserRole(userId, newRole)
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ))
      setIsModalOpen(false)
    } catch (error) {
      console.error('Failed to update role:', error)
      alert('Failed to update role')
    }
  }

  return (
    <MainLayout>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>User Management</h1>
        <p className={styles.pageSubtitle}>Manage all platform users</p>
      </div>

      {isLoading ? (
        <div className={styles.emptyState}>
          <p>Loading users...</p>
        </div>
      ) : users.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyStateIcon}>👥</p>
          <p className={styles.emptyStateText}>No users found</p>
        </div>
      ) : (
        <div className={styles.contentSection}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--dark-border)' }}>
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)' }}>Name</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)' }}>Email</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)' }}>Role</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} style={{ borderBottom: '1px solid var(--dark-border)' }}>
                  <td style={{ padding: '1rem', color: 'var(--text-primary)' }}>{user.name}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{user.email}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '2rem', 
                      fontSize: '0.75rem',
                      background: user.role === 'admin' ? 'var(--primary-color)' : 'var(--dark-border)',
                      color: 'white'
                    }}>
                      {user.role}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <Button 
                      variant="secondary" 
                      size="small"
                      onClick={() => {
                        setSelectedUser(user)
                        setIsModalOpen(true)
                      }}
                    >
                      Change Role
                    </Button>
                    <Button 
                      variant="danger" 
                      size="small"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Change User Role"
      >
        <div style={{ padding: '1rem' }}>
          <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
            Select new role for <strong>{selectedUser?.name}</strong>
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button 
              variant="primary"
              onClick={() => handleUpdateRole(selectedUser.id, 'admin')}
            >
              Make Admin
            </Button>
            <Button 
              variant="secondary"
              onClick={() => handleUpdateRole(selectedUser.id, 'student')}
            >
              Make Student
            </Button>
          </div>
        </div>
      </Modal>
    </MainLayout>
  )
}

export default UserManagement
