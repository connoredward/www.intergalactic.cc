import { useEffect } from 'react'

import fetch from 'isomorphic-unfetch'

import PageWrapper from '~/components/layout/pageWrapper'
import VideoCorousel from '~/components/layout/videoCarousel'

import React from 'react' 

export default function MainPage() {
  useEffect(() => {
    onLoad()
  }, [])

  async function onLoad() {
    await fetch('https://public-api.wordpress.com/wp/v2/sites/atestdomains.wordpress.com/posts')
      .then(res => res.json())
      .then(sections =>
        console.log(sections)
      ); 
  }

  return (
    <PageWrapper>
      <VideoCorousel />
    </PageWrapper>
  )
}

