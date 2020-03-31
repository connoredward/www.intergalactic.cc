import { useEffect, useState } from 'react'

import PageWrapper from '~/components/layout/pageWrapper'
import VideoCorousel from '~/components/layout/videoCarousel'

import InfiniteSlider from '~/components/layout/infiniteSlider'

import { getHomePageVideos } from '~/components/modules/wordpressCall'

export default function MainPage() {
  const [videoData, setVideoData] = useState()

  useEffect(() => {
    onLoad()
  }, [])

  async function onLoad() {
    setVideoData(await getHomePageVideos())
  }

  return (
    <PageWrapper>
      {videoData && (
        <VideoCorousel data={videoData}/>
        // <InfiniteSlider data={videoData} />
      )}
    </PageWrapper>
  )
}
