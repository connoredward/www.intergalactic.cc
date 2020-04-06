import { useEffect, useState } from 'react'

import Router from 'next/router'

import PageWrapper from '~/components/layout/pageWrapper'
import VideoCorousel from '~/components/layout/videoCarousel'
import InfiniteSlider from '~/components/layout/infiniteSlider'


import VideoModal from '~/components/layout/videoModal'

import { getHomePageVideos, getVimeoVideo } from '~/components/modules/wordpressCall'

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
        // <VideoCorousel onClick={url => changeRoute(url)} data={videoData}/>
        <InfiniteSlider data={videoData} />
      )}
      <VideoModal openModal={modalState} closeModal={() => closeModal()} />
    </PageWrapper>
  )
}

MainPage.getInitialProps = async ({ query }) => {
  return { v: query.v }
}

export default MainPage