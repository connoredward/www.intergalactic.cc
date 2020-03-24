import { useEffect, useState } from 'react'

import Link from 'next/link'

import PageWrapper from '~/components/layout/pageWrapper'
import VideoBanner from '~/components/layout/videoBanner'
import MusicVideoCard from '~/components/layout/directorCard'
import VideoModal from '~/components/layout/videoModal'

import { wordpressCardApi, videoBannerApi } from '~/components/modules/wordpressCall'

import styles from './styles.scss'

export function MusicVideosPage() {
  const [musicVideoList, setMusicVideoList] = useState([])
  const [bannerVideo, setBannerVideo] = useState({title: ''})
  const [modalState, setModalState] = useState(false)

  useEffect(() => {
    onLoad()
  }, [])

  async function onLoad() {
    setBannerVideo({src: await videoBannerApi('music videos'), title: 'MUSIC VIDEOS'})
    setMusicVideoList(await wordpressCardApi('music videos'))
  }

  function openModal() {
    console.log(1)
  }

  return (
    <PageWrapper active={'music videos'}>
      <VideoBanner {...bannerVideo}>
        <h1>{bannerVideo.title}</h1>
      </VideoBanner>
      <div className={styles['music_videos_grid']}>
        {musicVideoList.map((item, index) => 
          <MusicVideoCard {...item} onClick={() => setModalState(true)} key={index}>
            <div className={styles['card_content']}>
              <h1>{item.name}</h1>
              <h2 dangerouslySetInnerHTML={{ __html: item.desc }} />
            </div>
          </MusicVideoCard>
        )}
      </div>
      <VideoModal openModal={modalState} closeModal={() => setModalState(false)} />
    </PageWrapper>
  )
}

export default MusicVideosPage