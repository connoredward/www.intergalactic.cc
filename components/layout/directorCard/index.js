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

  const {row = 1, column = 1} = gridStyle

  return (
    <div 
      className={classNames(styles.main, className)} 
      style={{ backgroundImage: `url(${imgSrc})`, gridColumn: `span ${column}`, gridRow: `span ${row}` }}
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