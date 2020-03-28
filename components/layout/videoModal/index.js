import {useEffect, useState} from 'react'

import Vimeo from '@u-wave/react-vimeo';

import classNames from 'classnames'

import  styles from './styles.scss'

export function VideoModal(props) {
  const {
    openModal,
    closeModal
  } = props

  const [videoSrc, setVideoSrc] = useState()

  useEffect(() => {
    setVideoSrc(openModal.src)
  }, [openModal])

  return (
    <div className={classNames(styles['modal_wrapper'], styles[openModal.open == true ? 'active' : undefined])}>
      <div className={styles['modal_background']} onClick={closeModal} />
      <div className={styles['modal_content']}> 
        <button onClick={() => closeModal()}>close</button>
        <div className={styles['video_wrapper']}>
          {videoSrc && (
            <Vimeo video={videoSrc} />
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoModal