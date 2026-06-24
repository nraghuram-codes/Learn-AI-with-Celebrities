import React, { useState } from 'react'
import MainLayout from '../../layouts/MainLayout'
import LecturerCard from '../../components/ui/LecturerCard/LecturerCard'
import styles from '../../styles/dashboard.module.css'

const LecturerSelection = () => {
  const [selectedLecturer, setSelectedLecturer] = useState(null)

  const celebrities = [
    {
      id: 1,
      name: 'Prabhas',
      image: '/images/prabhas.jpg',
      bio: 'Baahubali Star - Learn acting techniques and film making from the Pan-India star',
      specialties: ['Acting', 'Film Making', 'Direction']
    },
    {
      id: 2,
      name: 'Allu Arjun',
      image: '/images/Allu-Arjun.jpg',
      bio: 'Stylish Star - Master dance and performance arts with the icon of style',
      specialties: ['Dance', 'Performance', 'Choreography']
    },
    {
      id: 3,
      name: 'Mahesh Babu',
      image: '/images/mahesh babu.jpg',
      bio: 'Superstar - Develop leadership and communication skills from the Prince of Tollywood',
      specialties: ['Communication', 'Leadership', 'Public Speaking']
    },
    {
      id: 4,
      name: 'Vijay Thalapathy',
      image: '/images/vijay.jpg',
      bio: 'Thalapathy - Get motivated and learn fitness secrets from the Tamil superstar',
      specialties: ['Motivation', 'Fitness', 'Discipline']
    },
    {
      id: 5,
      name: 'Virat Kohli',
      image: '/images/virat kohli.jpg',
      bio: 'Cricket Legend - Master sports psychology and discipline from the run machine',
      specialties: ['Sports', 'Discipline', 'Mental Strength']
    },
    {
      id: 6,
      name: 'Rohit Sharma',
      image: '/images/rohit sharma.jpg',
      bio: 'Hitman - Learn strategic thinking and team building from the cricket captain',
      specialties: ['Strategy', 'Team Building', 'Leadership']
    }
  ]

  const handleSelectLecturer = (lecturer) => {
    setSelectedLecturer(lecturer)
    alert(`You selected ${lecturer.name} as your lecturer!`)
  }

  return (
    <MainLayout>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>
          Choose Your Celebrity Lecturer
        </h1>

        <p className={styles.pageSubtitle}>
          Learn from the best in the industry
        </p>
      </div>

      {selectedLecturer && (
        <div
          style={{
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid var(--success-color)',
            borderRadius: '0.5rem',
            padding: '1rem',
            marginBottom: '2rem',
            color: 'var(--success-color)',
            textAlign: 'center'
          }}
        >
          Selected Lecturer:{' '}
          <strong>{selectedLecturer.name}</strong>
        </div>
      )}

      <div className={styles.lecturerGrid}>
        {celebrities.map((celebrity) => (
          <LecturerCard
            key={celebrity.id}
            lecturer={celebrity}
            onSelect={handleSelectLecturer}
          />
        ))}
      </div>
    </MainLayout>
  )
}

export default LecturerSelection