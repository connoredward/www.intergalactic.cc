import {useEffect, useState, useContext} from 'react'

import Router from 'next/router'
import Head from 'next/head'
import InfiniteScroll from 'react-infinite-scroller'
import ReactGA from 'react-ga'

import PageWrapper from '~/components/layout/pageWrapper'
import VideoGrid from '~/components/layout/videoGrid'
import MusicVideoCard from '~/components/layout/directorCard'
import VideoModal from '~/components/layout/videoModal'

import {getPage} from '~/api/wordpress'
import {Context as ModalContext} from '~/store/modal'

import styles from './styles.module.scss'

export function MusicVideosPage ({v}) {
  const [musicVideoList, setMusicVideoList] = useState([])
  const [loadingMore, setLoadingMore] = useState(false)

  const {modalRoute, loadVideo, emptyModal} = useContext(ModalContext)

  useEffect(() => {
    onLoad()
    if (window) {
      ReactGA.initialize('UA-165426415-1')
      ReactGA.pageview(window.location.pathname + window.location.search)
    }
    if (v) loadVideo(v)
    Router.events.on('routeChangeComplete', (url) => {
      const videoUrl = url.split('v=')[1]
      if (videoUrl) loadVideo(videoUrl)
      else emptyModal()
    })
  }, [v])

  async function onLoad() {
    setMusicVideoList(await getPage({pSlug: 'music_videos', pageNumber: 1}))
    setLoadingMore(true)
  }
  
  async function loadFunc(pageNumber) {
    const f = await getPage({pSlug: 'music_videos', pageNumber})
    if (f) setMusicVideoList([...musicVideoList, ...f])
    else setLoadingMore(false)
  }

  return (
    <PageWrapper active={'music videos'} className={styles['music_video_grid']}>
      <Head><title>Intergalactic &ndash; Music Videos</title></Head>
      <InfiniteScroll
        pageStart={1}
        loadMore={pageNumber => loadFunc(pageNumber)}
        hasMore={loadingMore}
      >
        <VideoGrid>
          {musicVideoList.map((item, index) => 
            <MusicVideoCard {...item} key={index}
              onClick={() => modalRoute('/music_videos', `/music_videos?v=${item.slug}`)} 
            >
              <img src={item.imgTitleSrc} />
            </MusicVideoCard>
          )}
        </VideoGrid>
      </InfiniteScroll>
      <VideoModal />
    </PageWrapper>
  )
}

MusicVideosPage.getInitialProps = async ({ query }) => {
  return { v: query.v }
}

export default MusicVideosPage