import React, { useEffect } from 'react'
import MainLayout from '../../layouts/MainLayout'
import useFetchCourse from '../../hooks/useFetchCourse'

const Progress = () => {
  const {
    enrolledCourses,
    fetchEnrolledCourses,
    isLoading
  } = useFetchCourse()

  useEffect(() => {
    fetchEnrolledCourses()
  }, [])

  return (
    <MainLayout>
      <div
        style={{
          padding: '2rem',
          color: 'white'
        }}
      >
        <h1
          style={{
            marginBottom: '2rem',
            fontSize: '2rem'
          }}
        >
          📈 My Progress
        </h1>

        {isLoading ? (
          <p>Loading progress...</p>
        ) : enrolledCourses.length === 0 ? (
          <p>No enrolled courses found.</p>
        ) : (
          <div
            style={{
              display: 'grid',
              gap: '1.5rem'
            }}
          >
            {enrolledCourses.map((course) => (
              <div
                key={course.id}
                style={{
                  background: '#111827',
                  padding: '1.5rem',
                  borderRadius: '1rem',
                  border:
                    '1px solid rgba(255,255,255,0.1)'
                }}
              >
                {/* COURSE INFO */}

                <div
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center'
                  }}
                >
                  <img
                    src={
                      course.image ||
                      '/placeholder-course.jpg'
                    }
                    alt={course.title}
                    style={{
                      width: '120px',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '12px'
                    }}
                  />

                  <div>
                    <h2
                      style={{
                        marginBottom: '0.5rem'
                      }}
                    >
                      {course.title}
                    </h2>

                    <p
                      style={{
                        color: '#9ca3af'
                      }}
                    >
                      {course.category}
                    </p>
                  </div>
                </div>

                {/* PROGRESS BAR */}

                <div
                  style={{
                    marginTop: '1.5rem'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent:
                        'space-between',
                      marginBottom: '0.5rem'
                    }}
                  >
                    <span>Progress</span>

                    <span>
                      {course.progress || 10}%
                    </span>
                  </div>

                  <div
                    style={{
                      width: '100%',
                      height: '14px',
                      background: '#1f2937',
                      borderRadius: '999px',
                      overflow: 'hidden'
                    }}
                  >
                    <div
                      style={{
                        width: `${
                          course.progress || 10
                        }%`,
                        height: '100%',
                        background:
                          'linear-gradient(90deg,#7c3aed,#4f46e5)',
                        borderRadius: '999px',
                        transition:
                          'width 0.5s ease'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  )
}

export default Progress