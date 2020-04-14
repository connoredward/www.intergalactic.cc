import { useEffect, useState } from 'react'

import Router from 'next/router'

import PageWrapper from '~/components/layout/pageWrapper'
import InfiniteSlider from '~/components/layout/infiniteSlider'
import MobileSlider from '~/components/layout/mobileSlider'

import VideoModal from '~/components/layout/videoModal'

import { getHomePageVideos, getVimeoVideo } from '~/components/modules/wordpressCall'

import styles from './styles.scss'

export function MainPage(props) {
  const {v = ''} = props

  const [videoData, setVideoData] = useState()
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
    setVideoData(await getHomePageVideos())
  }

  console.log(videoData)

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
    <PageWrapper>
      {videoData && (
        <>
          <InfiniteSlider onClick={url => changeRoute(url)} className={styles['desktop_slider']} data={videoData} />
          <MobileSlider onClick={url => changeRoute(url)} className={styles['mobile_slider']} data={videoData} />
        </>
      )}
      <VideoModal openModal={modalState} closeModal={() => closeModal()} />
    </PageWrapper>
  )
}

MainPage.getInitialProps = async ({ query }) => {
  return { v: query.v }
}

export default MainPage