import styles from './styles.scss'

export function DirectorCard(props) {
  const {
    videoSrc,
    imgSrc,
    children,
    className
  } = props
  return (
    <div className={styles.main} style={{ backgroundImage: `url(${imgSrc})` }}>
      {children}
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