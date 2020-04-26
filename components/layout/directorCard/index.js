import { useRef } from 'react'

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
      >
      <div className={styles['card_content']}>
        {children}
      </div>
      {videoSrc && (
        <video
          className={styles[gridColumn > gridRow ? 'widthAdj' : 'heightAdj' ]} 
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