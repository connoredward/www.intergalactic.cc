import {useEffect, useState} from 'react'

import Vimeo from '@u-wave/react-vimeo'
import ReactPlayer from 'react-player'
import classNames from 'classnames'
import { MdClose } from 'react-icons/md'

import  styles from './styles.scss'

export function VideoModal(props) {
  const {
    openModal,
    closeModal
  } = props

  const { src, projectClient, filmAndDirector, extraInfo, type } = openModal.data

  console.log('type', type)

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
          {videoSrc && type === 'Vimeo' && (<Vimeo className={styles['vimeo_player']} video={videoSrc} />)}
          {videoSrc && type === 'Youtube' && (<ReactPlayer className={styles['youtube_player']} url={videoSrc}  />)}
          <div className={classNames(styles['text_wrapper'], styles[type])}>
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