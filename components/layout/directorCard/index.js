import styles from './styles.scss'

export function DirectorCard(props) {
  const {
    videoSrc,
    imgSrc,
    children,
    className,
    onClick
  } = props
  return (
    <div 
      className={styles.main} 
      style={{ backgroundImage: `url(${imgSrc})` }}
      onClick={onClick}
    >
      <div className={styles['card_content']}>
        {children}
      </div>
      {videoSrc && (
        <video 
          className={className}
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