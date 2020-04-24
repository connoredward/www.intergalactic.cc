import { useEffect, useState } from 'react'

import Router from 'next/router'
import Head from 'next/head'
import { Textfit } from 'react-textfit'

import PageWrapper from '~/components/layout/pageWrapper'
import HoriScroll from '~/components/layout/HoriScroll'
import VideoGrid from '~/components/layout/videoGrid'
import Card from '~/components/layout/directorCard'

import styles from './styles.scss'

import IMAGE_0 from '~/static/images/test/i0.jpg'
import IMAGE_1 from '~/static/images/test/i1.jpg'
import IMAGE_2 from '~/static/images/test/i2.jpg'
import IMAGE_3 from '~/static/images/test/i3.jpg'
import IMAGE_4 from '~/static/images/test/i4.jpg'
import IMAGE_5 from '~/static/images/test/i5.jpg'
import IMAGE_6 from '~/static/images/test/i6.jpg'
import IMAGE_7 from '~/static/images/test/i7.jpg'

let array = [{gridStyle: 0, imgSrc: IMAGE_0}, {gridStyle: 0, imgSrc: IMAGE_1}, {gridStyle: 0, imgSrc: IMAGE_2}, {gridStyle: 0, imgSrc: IMAGE_3}, {gridStyle: 0, imgSrc: IMAGE_4}, {gridStyle: 0, imgSrc: IMAGE_5}, {gridStyle: 0, imgSrc: IMAGE_6}, {gridStyle: 0, imgSrc: IMAGE_7}]

export function SubPhotographerPage (props) {
  const { slug } = props

  useEffect(() => {
    if (slug) onLoad()
  }, [])
  
  function onLoad() {
    // call wordpress function here
  }

  return (
    <PageWrapper active={'photographers'}> 
      <div className={styles['photographers_banner']}>
        <Textfit className={styles.h1} mode='single' max={50}>TOM RINGSBY</Textfit>
      </div>
      <HoriScroll className={styles['desktop_view']}>
        {array.map(({imgSrc}, index) => <img src={imgSrc} key={index} /> )}
      </HoriScroll>
      <VideoGrid className={styles['mobile_view']}>
        {array.map((item, index) => 
          <img key={index} src={item.imgSrc} style={{ width: '100%', height: 'auto', margin: '0 0 -5px 0'}} />
        )}
      </VideoGrid>
    </PageWrapper>  
  )
}

SubPhotographerPage.getInitialProps = async ({ query }) => {
  return { slug: query.name }
}

export default SubPhotographerPage