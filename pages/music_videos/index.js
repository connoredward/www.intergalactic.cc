import { useEffect, useState } from 'react'

import Link from 'next/link'

import PageWrapper from '~/components/layout/pageWrapper'
import VideoGrid from '~/components/layout/videoGrid'
import MusicVideoCard from '~/components/layout/directorCard'
import VideoModal from '~/components/layout/videoModal'

import { wordpressCardApi } from '~/components/modules/wordpressCall'

import styles from './styles.scss'

export function MusicVideosPage() {
  const [musicVideoList, setMusicVideoList] = useState([])
  const [modalState, setModalState] = useState({open: false, src: ''})

  useEffect(() => {
    onLoad()
  }, [])

  async function onLoad() {
    setMusicVideoList(await wordpressCardApi('music video'))
  }

  return (
    <PageWrapper active={'music videos'} className={styles['music_video_grid']}>
      <VideoGrid gridType={'twoByThreeGrid'}>
        {musicVideoList.map((item, index) => 
          <MusicVideoCard onClick={() => setModalState({open:true, src: item.videoLink})} {...item} key={index}>
            <img src={item.titleImg} />
          </MusicVideoCard>
        )}
      </VideoGrid>
      <VideoModal openModal={modalState} closeModal={() => setModalState({open: false, src: ''})} />
    </PageWrapper>
  )
}

export default MusicVideosPage