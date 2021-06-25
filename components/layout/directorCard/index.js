import { useRef, useEffect, useState } from 'react'

import classNames from 'classnames'

import styles from './styles.module.scss'

export function DirectorCard(props) {
  const {
    videoSrc,
    imgSrc,
    children,
    className,
    onClick,
    gridRow, 
    gridColumn,
    showContent
  } = props

  const videoRef = useRef()
  const containerRef = useRef()

  const [videoSize, setVideoSize] = useState()

  useEffect(() => {
    if (containerRef && containerRef.current) {
      const {clientWidth = 0, clientHeight = 0} = containerRef.current
      if (clientHeight * 1.76 > clientWidth) setVideoSize('heightAdj')
      else setVideoSize('widthAdj')
    }
    if (window) {
      window.addEventListener('resize', function () {
        const {clientWidth = 0, clientHeight = 0} = containerRef.current
        if (clientHeight * 1.76 > clientWidth) setVideoSize('heightAdj')
        else setVideoSize('widthAdj')
      })
    }
  }, [])


  function resetVideo() {
    if (videoRef && videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
      videoRef.current.load()
    }
  }

  return (
    <div 
      onMouseLeave={() => resetVideo()}
      className={classNames(styles.main, className)} 
      style={{ backgroundImage: `url(${imgSrc})`, gridColumn: `span ${gridColumn}`, gridRow: `span ${gridRow}` }}
      onClick={onClick}
      ref={containerRef}
      >
      <div className={classNames(styles['card_content'], styles[showContent ? 'show_content' : undefined])}>
        {children}
      </div>
      {videoSrc && (
        <video
          className={styles[videoSize]} 
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted
          loop
        />
      )}
    </div>
  )
}

export default DirectorCard