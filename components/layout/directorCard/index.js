import { useRef, useEffect, useState } from 'react'

import classNames from 'classnames'

import styles from './styles.scss'

export function DirectorCard(props) {
  const {
    videoSrc,
    imgSrc,
    children,
    className,
    onClick,
    gridRow, 
    gridColumn
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
    window.addEventListener('resize', function () {
      const {clientWidth, clientHeight} = containerRef.current
      if (clientHeight * 1.76 > clientWidth) setVideoSize('heightAdj')
      else setVideoSize('widthAdj')
    })
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
      <div className={styles['card_content']}>
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