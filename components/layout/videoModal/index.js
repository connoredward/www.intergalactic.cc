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

  const { src, projectClient, filmAndDirector, extraInfo } = openModal.data

  const [videoSrc, setVideoSrc] = useState()

  useEffect(() => {
    setVideoSrc(src)
  }, [src])

  return (
    <div className={classNames(styles['modal_wrapper'], styles[openModal.open == true ? 'active' : undefined])}>
      <div className={styles['modal_background']} onClick={closeModal} />
            
      <div className={styles['modal_content']}> 

        <button onClick={() => closeModal()}><MdClose /></button>
      
        <div className={styles['video_wrapper']}>
          {videoSrc && (<Vimeo video={videoSrc} />)}
          <div className={styles['text_wrapper']}>
            <p>{projectClient}</p>
            <p style={{ fontWeight: '300' }}>{filmAndDirector}</p>
            <p style={{ fontWeight: '300' }}>{extraInfo}</p>
          </div>
        </div> 
      
      </div>

    </div>
  )
}

export default VideoModal