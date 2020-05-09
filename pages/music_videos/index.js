import { useEffect, useState } from 'react'

import Router from 'next/router'
import Head from 'next/head'
import InfiniteScroll from 'react-infinite-scroller'
import ReactGA from 'react-ga'

import PageWrapper from '~/components/layout/pageWrapper'
import VideoGrid from '~/components/layout/videoGrid'
import MusicVideoCard from '~/components/layout/directorCard'
import VideoModal from '~/components/layout/videoModal'

import { getPage, getVimeoModalUrl } from '~/api/wordpress'

import styles from './styles.scss'

export function MusicVideosPage (props) {
  const {v = ''} = props

  const [musicVideoList, setMusicVideoList] = useState([])
  const [modalState, setModalState] = useState({open: false, data: {}}) 

  const [loadingMore, setLoadingMore] = useState(false)

  useEffect(() => {
    onLoad()
    if (window) {
      ReactGA.initialize('UA-165426415-1')
      ReactGA.pageview(window.location.pathname + window.location.search)
    }
    if (v) startVideo(v)
    Router.events.on('routeChangeComplete', (url) => {
      const videoUrl = url.split('v=')[1]
      if (videoUrl) startVideo(videoUrl)
      else setModalState({open: false, data: {}})
    })
  }, [])

  async function onLoad() {
    setMusicVideoList(await getPage({pSlug: 'music_videos', pageNumber: 1}))
    setLoadingMore(true)
  }

  async function changeRoute(videoSlug) {
    const href = `/music_videos?v=${videoSlug}`
    Router.push('/music_videos', href, { shallow: true })
    setModalState({open: true, data: await getVimeoModalUrl(videoSlug)})
  }

  async function startVideo(videoSlug) {
    setModalState({open: true, data: await getVimeoModalUrl(videoSlug)})
  }

  function closeModal() {
    const href = `/music_videos`
    Router.push(href, href, { shallow: true })
    setModalState({open: false, data: {}})
  }
  
  async function loadFunc(pageNumber) {
    const f = await getPage({pSlug: 'music_videos', pageNumber})
    if (f) setMusicVideoList([...musicVideoList, ...f])
    else setLoadingMore(false)
  }

  return (
    <PageWrapper active={'music videos'} className={styles['music_video_grid']}>
      <Head>
        <title>Intergalactic &ndash; Music Videos</title>
      </Head>
      <InfiniteScroll
        pageStart={1}
        loadMore={pageNumber => loadFunc(pageNumber)}
        hasMore={loadingMore}
      >
        <VideoGrid>
          {musicVideoList.map((item, index) => 
            <MusicVideoCard onClick={() => changeRoute(item.slug)} {...item} key={index}>
              <img src={item.imgTitleSrc} />
            </MusicVideoCard>
          )}
        </VideoGrid>
      </InfiniteScroll>
      <VideoModal openModal={modalState} closeModal={() => closeModal()} />
    </PageWrapper>
  )
}

MusicVideosPage.getInitialProps = async ({ query }) => {
  return { v: query.v }
}

export default MusicVideosPage