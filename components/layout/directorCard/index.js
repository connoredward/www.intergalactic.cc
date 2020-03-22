import styles from './styles.scss'

export function DirectorCard(props) {
  const {
    videoSrc,
    imgSrc,
    children
  } = props
  return (
    <div className={styles.main} style={{ backgroundImage: `url(${imgSrc})` }}>
      {children}
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