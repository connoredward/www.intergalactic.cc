import { useEffect, useState } from 'react'

import Router from 'next/router'
import Head from 'next/head'

import PageWrapper from '~/components/layout/pageWrapper'
import VideoGrid from '~/components/layout/videoGrid'
import MusicVideoCard from '~/components/layout/directorCard'
import VideoModal from '~/components/layout/videoModal'

import { wordpressCardApi, getVimeoVideo } from '~/components/modules/wordpressCall'

import styles from './styles.scss'

export function MusicVideosPage (props) {
  const {v = ''} = props

  const [musicVideoList, setMusicVideoList] = useState([])
  const [modalState, setModalState] = useState({open: false, src: ''})

  useEffect(() => {
    onLoad()
    if (v) startVideo(v)
    Router.events.on('routeChangeComplete', (url) => {
      const videoUrl = url.split('v=')[1]
      if (videoUrl) startVideo(videoUrl)
      else setModalState({open: false, src: ''})
    })
  }, [])

  async function onLoad() {
    setMusicVideoList(await wordpressCardApi('music videos'))
  }

  async function changeRoute(videoSlug) {
    const href = `/music_videos?v=${videoSlug}`
    Router.push('/music_videos', href, { shallow: true })
    setModalState({open: true, src: await getVimeoVideo(videoSlug)})
  }

  async function startVideo(videoSlug) {
    setModalState({open: true, src: await getVimeoVideo(videoSlug)})
  }

  function closeModal() {
    const href = `/music_videos`
    Router.push(href, href, { shallow: true })
    setModalState({open: false, src: ''})
  }

  return (
    <PageWrapper active={'music videos'} className={styles['music_video_grid']}>
      <Head>
        <title>Intergalactic &ndash; Music Videos</title>
      </Head>
      <VideoGrid gridType={'twoByThreeGrid'}>
        {musicVideoList.map((item, index) => 
          <MusicVideoCard onClick={() => changeRoute(item.slug)} {...item} key={index}>
            <img src={item.titleImg} />
          </MusicVideoCard>
        )}
      </VideoGrid>
      <VideoModal openModal={modalState} closeModal={() => closeModal()} />
    </PageWrapper>
  )
}

MusicVideosPage.getInitialProps = async ({ query }) => {
  return { v: query.v }
}

export default MusicVideosPage