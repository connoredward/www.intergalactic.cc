import { useEffect, useState } from 'react'

import PageWrapper from '~/components/layout/pageWrapper'
import VideoBanner from '~/components/layout/videoBanner'

import { wordprocessCardApi, videoBannerApi } from '~/components/modules/wordpressCall'

export function ContentPage() {
  const [contentList, setContentList] = useState([])
  const [bannerVideo, setBannerVideo] = useState({title: ''})

  useEffect(() => {
    onLoad()
  }, [])
  
  async function onLoad() {
    setBannerVideo({src: await videoBannerApi('content'), title: 'CONTENT'})
  }

  return (
    <PageWrapper>
      <VideoBanner {...bannerVideo}>
        <h1>{bannerVideo.title}</h1>
      </VideoBanner>
    </PageWrapper>
  )
}

export default ContentPage