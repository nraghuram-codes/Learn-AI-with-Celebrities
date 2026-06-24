import React, { useState, useEffect, useRef } from 'react'
import styles from './VideoPlayer.module.css'

const VideoPlayer = ({ videoUrl, videoScript, lecturer, isGenerating, onRegenerate }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showSubtitles, setShowSubtitles] = useState(true)
  const [volume, setVolume] = useState(1)
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume
    }
  }, [volume])

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleSeek = (e) => {
    const video = videoRef.current
    if (video) {
      const seekTime = (e.target.value / 100) * duration
      video.currentTime = seekTime
      setCurrentTime(seekTime)
    }
  }

  const handleVolumeChange = (e) => {
    setVolume(e.target.value)
  }

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  if (isGenerating) {
    return (
      <div className={styles.videoPlayer}>
        <div className={styles.generatingState}>
          <div className={styles.loadingAnimation}>
            <div className={styles.spinner}></div>
          </div>
          <h3 className={styles.generatingTitle}>Generating AI Video...</h3>
          <p className={styles.generatingText}>
            Your personalized video with {lecturer?.name} is being created
          </p>
          <div className={styles.progressSteps}>
            <div className={styles.step}>
              <span className={styles.stepIcon}>📝</span>
              <span className={styles.stepText}>Generating script</span>
            </div>
            <div className={styles.step}>
              <span className={styles.stepIcon}>🎭</span>
              <span className={styles.stepText}>Creating avatar</span>
            </div>
            <div className={styles.step}>
              <span className={styles.stepIcon}>🎬</span>
              <span className={styles.stepText}>Rendering video</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!videoUrl) {
    return (
      <div className={styles.videoPlayer}>
        <div className={styles.noVideoState}>
          <div className={styles.noVideoIcon}>🎥</div>
          <h3 className={styles.noVideoTitle}>No Video Generated Yet</h3>
          <p className={styles.noVideoText}>
            Select a lecturer and generate your personalized course video
          </p>
          {lecturer && (
            <button 
              className={styles.generateButton}
              onClick={onRegenerate}
            >
              Generate Video with {lecturer.name}
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.videoPlayer}>
      <div className={styles.videoContainer}>
        <video
          ref={videoRef}
          className={styles.video}
          src={videoUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
        
        {showSubtitles && videoScript && (
          <div className={styles.subtitles}>
            <p className={styles.subtitleText}>
              {videoScript.split('\n').find((line, index, arr) => {
                const timePerLine = duration / arr.length
                const lineTime = index * timePerLine
                return currentTime >= lineTime && currentTime < lineTime + timePerLine
              }) || ''}
            </p>
          </div>
        )}
      </div>

      <div className={styles.controls}>
        <div className={styles.progressContainer}>
          <input
            type="range"
            className={styles.progressBar}
            value={duration > 0 ? (currentTime / duration) * 100 : 0}
            onChange={handleSeek}
            max="100"
          />
          <div className={styles.timeDisplay}>
            <span>{formatTime(currentTime)}</span>
            <span>/</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className={styles.controlButtons}>
          <button 
            className={styles.controlButton}
            onClick={handlePlayPause}
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>

          <div className={styles.volumeControl}>
            <span className={styles.volumeIcon}>🔊</span>
            <input
              type="range"
              className={styles.volumeSlider}
              value={volume}
              onChange={handleVolumeChange}
              min="0"
              max="1"
              step="0.1"
            />
          </div>

          <button 
            className={styles.controlButton}
            onClick={() => setShowSubtitles(!showSubtitles)}
          >
            {showSubtitles ? '📝' : '📝❌'}
          </button>

          <button 
            className={styles.controlButton}
            onClick={onRegenerate}
          >
            🔄 Regenerate
          </button>
        </div>
      </div>

      {lecturer && (
        <div className={styles.lecturerBadge}>
          <img 
            src={lecturer.image} 
            alt={lecturer.name}
            className={styles.lecturerAvatar}
          />
          <div className={styles.lecturerInfo}>
            <span className={styles.lecturerName}>{lecturer.name}</span>
            <span className={styles.lecturerRole}>Instructor</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default VideoPlayer
