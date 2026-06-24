import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Navbar from '../../components/ui/Navbar/Navbar'
import CourseCard from '../../components/ui/CourseCard/CourseCard'
import LecturerCard from '../../components/ui/LecturerCard/LecturerCard'

import useFetchCourse from '../../hooks/useFetchCourse'

import styles from '../../styles/home.module.css'

const Home = () => {
  const {
    courses,
    isLoading,
    fetchAllCourses
  } = useFetchCourse()

  const [featuredCourses, setFeaturedCourses] =
    useState([])

  useEffect(() => {
    fetchAllCourses()
  }, [])

  useEffect(() => {
    if (courses.length > 0) {
      setFeaturedCourses(courses.slice(0, 6))
    }
  }, [courses])

  // Celebrity Lecturers

  const lecturers = [
  {
    id: 1,
    name: 'Prabhas',
    image: '/images/prabhas.jpg',
    bio:
      'Baahubali Star - Teaches Acting & Film Making',
    specialties: ['Acting', 'Film Making']
  },

  {
    id: 2,
    name: 'Allu Arjun',
    image: '/images/Allu-Arjun.jpg',
    bio:
      'Stylish Star - Teaches Dance & Performance',
    specialties: ['Dance', 'Performance']
  },

  {
    id: 3,
    name: 'Mahesh Babu',
    image: '/images/mahesh babu.jpg',
    bio:
      'Superstar - Teaches Communication & Leadership',
    specialties: ['Communication', 'Leadership']
  },

  {
    id: 4,
    name: 'Vijay Thalapathy',
    image: '/images/vijay.jpg',
    bio:
      'Thalapathy - Teaches Motivation & Fitness',
    specialties: ['Motivation', 'Fitness']
  },

  {
    id: 5,
    name: 'Virat Kohli',
    image: '/images/virat kohli.jpg',
    bio:
      'Cricket Legend - Teaches Sports & Discipline',
    specialties: ['Sports', 'Discipline']
  },

  {
    id: 6,
    name: 'Rohit Sharma',
    image: '/images/rohit sharma.jpg',
    bio:
      'Hitman - Teaches Strategy & Team Building',
    specialties: ['Strategy', 'Team Building']
  }
]

  return (
    <div className={styles.homePage}>
      <Navbar />

      {/* HERO SECTION */}

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>
            🎓 Learn with Celebrities
          </span>

          <h1 className={styles.heroTitle}>
            Master New Skills with{' '}
            <span>Your Favorite Stars</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Learn from the best celebrities and
            industry experts around the world.
          </p>

          <div className={styles.heroButtons}>
            <Link
              to="/register"
              className={styles.heroButtonPrimary}
            >
              Get Started
            </Link>

            <Link
              to="/courses"
              className={styles.heroButtonSecondary}
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED COURSES */}

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Featured Courses
          </h2>

          <p className={styles.sectionSubtitle}>
            Start learning with our most popular
            courses
          </p>
        </div>

        {isLoading ? (
          <div className={styles.emptyState}>
            <p>Loading courses...</p>
          </div>
        ) : (
          <div className={styles.courseGrid}>
            {featuredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
              />
            ))}
          </div>
        )}

        <div
          style={{
            textAlign: 'center',
            marginTop: '2rem'
          }}
        >
          <Link
            to="/courses"
            className={styles.heroButtonSecondary}
          >
            View All Courses
          </Link>
        </div>
      </section>

      {/* CELEBRITY SECTION */}

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Celebrity Lecturers
          </h2>

          <p className={styles.sectionSubtitle}>
            Learn from your favorite stars
          </p>
        </div>

        <div className={styles.lecturerGrid}>
          {lecturers.map((lecturer) => (
            <LecturerCard
              key={lecturer.id}
              lecturer={lecturer}
              onSelect={() =>
                alert(
                  `Selected ${lecturer.name}`
                )
              }
            />
          ))}
        </div>
      </section>

      {/* FEATURES */}

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Why Choose Us?
          </h2>

          <p className={styles.sectionSubtitle}>
            Experience premium learning
          </p>
        </div>

        <div className={styles.features}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              🎓
            </div>

            <h3 className={styles.featureTitle}>
              Celebrity Mentors
            </h3>

            <p className={styles.featureDescription}>
              Learn directly from famous
              celebrities and experts.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              🚀
            </div>

            <h3 className={styles.featureTitle}>
              Career Growth
            </h3>

            <p className={styles.featureDescription}>
              Build real-world skills for your
              future.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              📚
            </div>

            <h3 className={styles.featureTitle}>
              Premium Courses
            </h3>

            <p className={styles.featureDescription}>
              Access high-quality learning
              content anytime.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home