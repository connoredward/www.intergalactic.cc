import {useEffect, useState} from 'react'

import Vimeo from '@u-wave/react-vimeo'
import classNames from 'classnames'
import { MdClose } from 'react-icons/md'

import  styles from './styles.scss'

export function VideoModal(props) {
  const {
    openModal,
    closeModal
  } = props

  const [videoSrc, setVideoSrc] = useState()

  useEffect(() => {
    setVideoSrc(openModal.src)
  }, [openModal.src])

  return (
    <div className={classNames(styles['modal_wrapper'], styles[openModal.open == true ? 'active' : undefined])}>
      <div className={styles['modal_background']} onClick={closeModal} />
            
      <div className={styles['modal_content']}> 

        <button onClick={() => closeModal()}><MdClose /></button>
      
        <div className={styles['video_wrapper']}>
          {videoSrc && (<Vimeo video={videoSrc} />)}
          <div className={styles['text_wrapper']}>
            <p>DOZENS</p>
            <p style={{ fontWeight: '300' }}>"VERSIONS"</p>
            <p style={{ fontWeight: '300' }}>RHORY DANNIELLS</p>
          </div>
        </div> 
      
      </div>

    </div>
  )
}

export default VideoModal