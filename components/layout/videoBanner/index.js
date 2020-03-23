import styles from './styles.scss'

export function VideoBanner (props) {
  const {
    src, 
    title = ''
  } = props
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <h1>{title}</h1>
      </div>
      {src && (
        <video
          src={src}
          autoPlay
          muted
          loop
        />
        // <video preload="none">
        //   <source src="http://player.vimeo.com/external/85569724.sd.mp4?s=43df5df0d733011263687d20a47557e4" />
        // </video>
        // <video loop autoPlay muted src="http://player.vimeo.com/external/85569724.sd.mp4?s=43df5df0d733011263687d20a47557e4"></video>

        // <iframe width="420" height="345"
        //   src="http://www.youtube.com/embed/XGSy3_Czz8k">
        // </iframe>
      )}
    </div>
  )
}

export default VideoBanner