import { useEffect, useState } from 'react'

import Router from 'next/router'
import Head from 'next/head'
import ReactGA from 'react-ga'

import PageWrapper from '~/components/layout/pageWrapper'
import InfiniteSlider from '~/components/layout/infiniteSlider'
import MobileSlider from '~/components/layout/mobileSlider'

import VideoModal from '~/components/layout/videoModal'
import SplashScreen from '~/components/layout/splashScreen'

import { getPage, getVimeoModalUrl } from '~/api/wordpress'

import styles from './styles.scss'

const lockScroll = {
  height: '100vh',
  overflow: 'hidden'
}

export function MainPage(props) {
  const {v = ''} = props

  const [videoData, setVideoData] = useState()
  const [modalState, setModalState] = useState({open: false, data: {}})

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(navigator?.userAgent.includes('Instagram')){
      // window.location.href = 'https://www.intergalacticstudios.com/'
    }

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
    setVideoData(await getPage({pSlug: 'home', pageNumber: 1}))
    setLoading(true)
  }

  async function changeRoute(videoSlug) {
    const href = `/?v=${videoSlug}`
    Router.push('/', href, { shallow: true })
    setModalState({open: true, data: await getVimeoModalUrl(videoSlug)})
  }

  async function startVideo(videoSlug) {
    setModalState({open: true, data: await getVimeoModalUrl(videoSlug)})
  }

  function closeModal() {
    const href = '/'
    Router.push(href, href, { shallow: true })
    setModalState({open: false, data: {}})
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