import { useEffect, useState } from 'react'

import Router from 'next/router'
import Head from 'next/head'

import PageWrapper from '~/components/layout/pageWrapper'
import InfiniteSlider from '~/components/layout/infiniteSlider'
import MobileSlider from '~/components/layout/mobileSlider'

import VideoModal from '~/components/layout/videoModal'
import SplashScreen from '~/components/layout/splashScreen'

import { getHomePageVideos, getVimeoVideo } from '~/components/modules/wordpressCall'

import styles from './styles.scss'

const lockScroll = {
  height: '100vh',
  overflow: 'hidden'
}

export function MainPage(props) {
  const {v = ''} = props

  const [videoData, setVideoData] = useState()
  const [modalState, setModalState] = useState({open: false, src: ''})

  const [loading, setLoading] = useState(false)

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
    setVideoData(await getHomePageVideos())
    setLoading(true)
  }


  async function changeRoute(videoSlug) {
    const href = `/?v=${videoSlug}`
    Router.push('/', href, { shallow: true })
    setModalState({open: true, src: await getVimeoVideo(videoSlug)})
  }

  async function startVideo(videoSlug) {
    setModalState({open: true, src: await getVimeoVideo(videoSlug)})
  }

  function closeModal() {
    const href = '/'
    Router.push(href, href, { shallow: true })
    setModalState({open: false, src: ''})
  }
  
  return (
    <div style={loading ? undefined : lockScroll}>
      <Head>
        <title>Intergalactic &ndash; Home</title>
      </Head>
      <SplashScreen loading={loading} />
      <PageWrapper>
        {videoData && (
          <>
            <InfiniteSlider onClick={url => changeRoute(url)} className={styles['desktop_slider']} data={videoData} />
            <MobileSlider onClick={url => changeRoute(url)} className={styles['mobile_slider']} data={videoData} />
          </>
        )}
        <VideoModal openModal={modalState} closeModal={() => closeModal()} />
      </PageWrapper>
    </div>
  )
}

MainPage.getInitialProps = async ({ query }) => {
  return { v: query.v }
}

export default MainPage