import {useEffect, useState, useContext} from 'react'

import Router from 'next/router'
import Vimeo from '@u-wave/react-vimeo'
import ReactPlayer from 'react-player'
import classNames from 'classnames'
import {MdClose} from 'react-icons/md'

import {Context as ModalContext} from '~/store/modal'

import  styles from './styles.module.scss'

export function VideoModal({slug}) {
  const {modalState, modalContent, closeModal} = useContext(ModalContext)
  const [modalData, setModalData] = useState()

  useEffect(() => {
    if (modalContent) setModalData(modalContent)
  }, [modalContent])

  function close() {
    closeModal({pageSlug: slug ? `/directors/${slug}` : Router.router.pathname})
    setModalData()
  }

  return (
    <div className={classNames(styles['modal_wrapper'], styles[modalState ? 'active' : undefined])}>
      <div className={styles['modal_background']} onClick={close} />
      <div className={styles['modal_content']}> 
        <button onClick={close}><MdClose /></button>
        <div className={styles['video_wrapper']}>
          {modalData?.src && modalData?.type === 'Vimeo' && (<Vimeo className={styles['vimeo_player']} video={modalData.src} />)}
          {modalData?.src && modalData?.type === 'Youtube' && (<ReactPlayer className={styles['youtube_player']} url={modalData.src} controls width={`100%`} />)}
          <div className={classNames(styles['text_wrapper'], styles[modalData?.type])}>
            <p>{modalData?.projectClient}</p>
            <p style={{ fontWeight: '300' }}>{modalData?.filmAndDirector}</p>
            <p style={{ fontWeight: '300' }}>{modalData?.extraInfo}</p>
          </div>
        </div> 
      
      </div>

    </div>
  )
}

export default VideoModal