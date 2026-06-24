import React from 'react'
import styles from './LecturerCard.module.css'

const LecturerCard = ({ lecturer, onSelect }) => {
  return (
    <div className={styles.card}>
      {/* IMAGE */}
      <div className={styles.cardImage}>
        {lecturer.image ? (
          <>
            <img
              src={lecturer.image}
              alt={lecturer.name}
              className={styles.image}
              onError={(e) => {
                e.target.src = '/images/profile.png'
              }}
            />
            <div className={styles.overlay}></div>
          </>
        ) : (
          <div className={styles.imagePlaceholder}>
            <div className={styles.placeholderContent}>
              <div className={styles.placeholderIcon}>⭐</div>
              <div className={styles.placeholderText}>
                {lecturer.name}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className={styles.cardContent}>
        <h3 className={styles.name}>
          {lecturer.name}
        </h3>

        <p className={styles.bio}>
          {lecturer.bio}
        </p>

        {/* SPECIALTIES */}
        <div className={styles.specialties}>
          {lecturer.specialties?.map((specialty, index) => (
            <span
              key={index}
              className={styles.specialty}
            >
              {specialty}
            </span>
          ))}
        </div>

        {/* BUTTON */}
        <button
          className={styles.selectButton}
          onClick={() => onSelect(lecturer)}
        >
          Select Lecturer
        </button>
      </div>
    </div>
  )
}

export default LecturerCard