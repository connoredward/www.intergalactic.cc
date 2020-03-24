import { useEffect, useState } from 'react'

import PageWrapper from '~/components/layout/pageWrapper'
import VideoBanner from '~/components/layout/videoBanner'

import { wordprocessCardApi, videoBannerApi } from '~/components/modules/wordpressCall'

export function NarrativePage() {
  const [contentList, setContentList] = useState([])
  const [bannerVideo, setBannerVideo] = useState({title: ''})

  useEffect(() => {
    onLoad()
  }, [])
  
  async function onLoad() {
    setBannerVideo({src: await videoBannerApi('narrative'), title: 'NARRATIVE'})
  }
  return (
    <PageWrapper active={'narrative'}>
      <VideoBanner {...bannerVideo}>
        <h1>{bannerVideo.title}</h1>
      </VideoBanner>
    </PageWrapper>
  )
}

export default NarrativePage