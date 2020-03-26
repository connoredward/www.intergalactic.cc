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
  const [modalState, setModalState] = useState(false)

  useEffect(() => {
    onLoad()
  }, [])

  async function onLoad() {
    setMusicVideoList(await wordpressCardApi('music video'))
  }

  function openModal() {
    // console.log(1)
  }

  return (
    <PageWrapper active={'music videos'} className={styles['music_video_grid']}>
      <VideoGrid gridType={'twoByThreeGrid'}>
        {musicVideoList.map((item, index) => 
          <MusicVideoCard {...item} onClick={() => setModalState(true)} key={index}>
            <div className={styles['card_content']}>
              <img src={item.titleImg} />
            </div>
          </MusicVideoCard>
        )}
      </VideoGrid>
      <VideoModal openModal={modalState} closeModal={() => setModalState(false)} />
    </PageWrapper>
  )
}

export default MusicVideosPage