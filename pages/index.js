import { useEffect } from 'react'

import fetch from 'isomorphic-unfetch'

import PageWrapper from '~/components/layout/pageWrapper'
import VideoCorousel from '~/components/layout/videoCarousel'

export default function MainPage() {
  useEffect(() => {
    onLoad()
  }, [])

  async function onLoad() {
    await fetch('https://public-api.wordpress.com/wp/v2/sites/atestdomains.wordpress.com/posts')
      .then(res => res.json())
      .then(sections => {
        // console.log('sections', sections[0].content.rendered.split('"'))
        // const imageIndex = sections[0].content.rendered.split('"').findIndex((item) => item === " data-large-file=") + 1
        // console.log('image url', sections[0].content.rendered.split('"')[imageIndex])
      }
      ); 
  }

  return (
    <PageWrapper>
      <VideoCorousel />
    </PageWrapper>
  )
}
