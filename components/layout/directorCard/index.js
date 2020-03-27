import styles from './styles.scss'

import classNames from 'classnames'

export function DirectorCard(props) {
  const {
    videoSrc,
    imgSrc,
    children,
    className,
    onClick,
    gridStyle
  } = props

  console.log(gridStyle)
  return (
    <div 
      className={classNames(styles.main, className, styles[gridStyle])} 
      style={{ backgroundImage: `url(${imgSrc})` }}
      onClick={onClick}
      >
      <div className={styles['card_content']}>
        {children}
      </div>
      {videoSrc && (
        <video 
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