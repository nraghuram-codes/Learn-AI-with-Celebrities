import React, { useState } from 'react'
import MainLayout from '../../layouts/MainLayout'
import useAuth from '../../hooks/useAuth'

const Settings = () => {
  const { user } = useAuth()

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <MainLayout>
      <div
        style={{
          padding: '2rem',
          color: 'white'
        }}
      >
        {/* HEADER */}

        <div
          style={{
            marginBottom: '2rem'
          }}
        >
          <h1
            style={{
              fontSize: '2.5rem',
              marginBottom: '0.5rem'
            }}
          >
            ⚙️ Settings
          </h1>

          <p
            style={{
              color: '#9ca3af'
            }}
          >
            Manage your profile and preferences
          </p>
        </div>

        {/* PROFILE CARD */}

        <div
          style={{
            background: '#111827',
            borderRadius: '1.5rem',
            padding: '2rem',
            border:
              '1px solid rgba(255,255,255,0.08)',
            marginBottom: '2rem'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}
          >
            <img
              src='/images/profile.png'
              alt='Profile'
              style={{
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid #7c3aed'
              }}
            />

            <div>
              <h2>{user?.name}</h2>

              <p
                style={{
                  color: '#9ca3af'
                }}
              >
                {user?.email}
              </p>
            </div>
          </div>

          {/* FORM */}

          <div
            style={{
              display: 'grid',
              gap: '1.5rem'
            }}
          >
            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: '0.5rem'
                }}
              >
                Full Name
              </label>

              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '1rem',
                  border:
                    '1px solid rgba(255,255,255,0.1)',
                  background: '#1f2937',
                  color: 'white'
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: '0.5rem'
                }}
              >
                Email Address
              </label>

              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '1rem',
                  border:
                    '1px solid rgba(255,255,255,0.1)',
                  background: '#1f2937',
                  color: 'white'
                }}
              />
            </div>

            <button
              style={{
                padding: '1rem',
                border: 'none',
                borderRadius: '1rem',
                background:
                  'linear-gradient(135deg,#7c3aed,#4f46e5)',
                color: 'white',
                fontWeight: '700',
                cursor: 'pointer',
                marginTop: '1rem'
              }}
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* EXTRA SETTINGS */}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit,minmax(250px,1fr))',
            gap: '1.5rem'
          }}
        >
          <div
            style={{
              background: '#111827',
              padding: '1.5rem',
              borderRadius: '1rem'
            }}
          >
            <h3>🔔 Notifications</h3>

            <p
              style={{
                color: '#9ca3af',
                marginTop: '0.5rem'
              }}
            >
              Manage email and course alerts.
            </p>
          </div>

          <div
            style={{
              background: '#111827',
              padding: '1.5rem',
              borderRadius: '1rem'
            }}
          >
            <h3>🌙 Dark Mode</h3>

            <p
              style={{
                color: '#9ca3af',
                marginTop: '0.5rem'
              }}
            >
              Customize your app appearance.
            </p>
          </div>

          <div
            style={{
              background: '#111827',
              padding: '1.5rem',
              borderRadius: '1rem'
            }}
          >
            <h3>🔐 Security</h3>

            <p
              style={{
                color: '#9ca3af',
                marginTop: '0.5rem'
              }}
            >
              Update password and account safety.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Settings