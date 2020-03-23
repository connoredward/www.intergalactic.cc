import { useEffect, useState } from 'react'

import Link from 'next/link'

import PageWrapper from '~/components/layout/pageWrapper'
import VideoBanner from '~/components/layout/videoBanner'
import MusicVideoCard from '~/components/layout/directorCard'

import { wordpressCardApi, videoBannerApi } from '~/components/modules/wordpressCall'

export function MusicVideosPage() {
  const [musicVideoList, setMusicVideoList] = useState([])
  const [bannerVideo, setBannerVideo] = useState({title: ''})

  useEffect(() => {
    onLoad()
  }, [])

  async function onLoad() {
    setBannerVideo({src: await videoBannerApi('music videos'), title: 'MUSIC VIDEOS'})
  }

  return (
    <PageWrapper>
      <VideoBanner {...bannerVideo}>
        <h1>{bannerVideo.title}</h1>
      </VideoBanner>
    </PageWrapper>
  )
}

export default MusicVideosPage