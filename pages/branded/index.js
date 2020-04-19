import { useEffect, useState } from 'react'

import Router from 'next/router'
import Head from 'next/head'

import PageWrapper from '~/components/layout/pageWrapper'
import DirectorCard from '~/components/layout/directorCard'
import VideoGrid from '~/components/layout/videoGrid'

import { wordpressCardApi } from '~/components/modules/wordpressCall'

import styles from './styles.scss'

export function BrandedPage (props) {
  const {v = ''} = props
  
  const [brandedList, setBrandedList] = useState([])

  useEffect(() => {
    onLoad()
  }, [])
  
  async function onLoad() {
    setBrandedList(await wordpressCardApi('branded'))
  }

  return (
    <PageWrapper active={'branded'}>
      <Head>
        <title>Intergalactic &ndash; Branded</title>
      </Head>
      <VideoGrid gridType={'flexGrid'}>
        {brandedList.map((item, index) => 
          <DirectorCard {...item} key={index}>
            <img src={item.titleImg} />
          </DirectorCard>
        )}
      </VideoGrid>
    </PageWrapper>
  )
}

BrandedPage.getInitialProps = async ({ query }) => {
  return { v: query.v }
}

export default BrandedPage