import styles from './styles.scss'

export function VideoBanner (props) {
  const {
    src, 
    title = '',
    width = ''
  } = props
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <h1>{title}</h1>
      </div>
      {src && (
        <video 
          width={width}
          src={src}
          autoPlay
          muted
          loop
        />
      )}
    </div>
  )
}

export default VideoBanner