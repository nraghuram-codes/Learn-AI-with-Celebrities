import React, { useState, useEffect } from 'react'
import styles from './LecturerSelector.module.css'

const LecturerSelector = ({ lecturers, selectedLecturerId, onSelectLecturer }) => {
  const [selectedId, setSelectedId] = useState(selectedLecturerId)
   const imageMap = {
  'Prabhas': '/images/prabhas.jpg',
  'Allu Arjun': '/images/Allu-Arjun.jpg',
  'Mahesh Babu': '/images/mahesh babu.jpg',
  'Vijay Thalapathy': '/images/vijay.jpg',
  'Virat Kohli': '/images/virat kohli.jpg',
  'Rohit Sharma': '/images/rohit sharma.jpg'
}
  useEffect(() => {
    setSelectedId(selectedLecturerId)
  }, [selectedLecturerId])

  const handleSelect = (lecturer) => {
    setSelectedId(lecturer.id)
    onSelectLecturer(lecturer)
  }

  return (
    <div className={styles.lecturerSelector}>
      <h3 className={styles.title}>Choose Your Instructor</h3>
      <p className={styles.subtitle}>Select a celebrity lecturer to teach this course</p>
      
      <div className={styles.lecturerGrid}>
        {lecturers.map((lecturer) => (
          <div
            key={lecturer.id}
            className={`${styles.lecturerCard} ${selectedId === lecturer.id ? styles.selected : ''}`}
            onClick={() => handleSelect(lecturer)}
          >
            <div className={styles.lecturerImage}>
               <img
                  src={imageMap[lecturer.name] || '/images/profile.png'}
                  alt={lecturer.name}
                  className={styles.image}
                  onError={(e) => {
                    e.target.src = '/images/profile.png'
                  }}
                />
                  
              {selectedId === lecturer.id && (
                <div className={styles.checkmark}>✓</div>
              )}
            </div>
            
            <div className={styles.lecturerInfo}>
              <h4 className={styles.lecturerName}>{lecturer.name}</h4>
              <p className={styles.lecturerBio}>{lecturer.bio}</p>
              <div className={styles.specialties}>
                {lecturer.specialties?.map((specialty, index) => (
                  <span key={index} className={styles.specialtyTag}>
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LecturerSelector
