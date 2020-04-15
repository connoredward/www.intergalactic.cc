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
    gridStyle
  } = props

  const {row = 1, column = 1} = gridStyle

  const videoRef = useRef()

  function resetVideo() {
    videoRef.current.pause()
    videoRef.current.currentTime = 0
    videoRef.current.load()
  }

  return (
    <div 
      onMouseLeave={() => resetVideo()}
      className={classNames(styles.main, className)} 
      style={{ backgroundImage: `url(${imgSrc})`, gridColumn: `span ${column}`, gridRow: `span ${row}` }}
      onClick={onClick}
      >
      <div className={styles['card_content']}>
        {children}
      </div>
      {videoSrc && (
        <video 
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