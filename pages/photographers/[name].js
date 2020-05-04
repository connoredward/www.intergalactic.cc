import { useEffect, useState } from 'react'

import Head from 'next/head'
import { Textfit } from 'react-textfit'
import ReactGA from 'react-ga'

import PageWrapper from '~/components/layout/pageWrapper'
import HoriScroll from '~/components/layout/HoriScroll'
import VideoGrid from '~/components/layout/videoGrid'

import { getPhotos } from '~/api/wordpress'

import styles from './styles.scss'

export function SubPhotographerPage (props) {
  const { slug } = props

  const [banner, setBanner] = useState()
  const [photographer, setPhotographer] = useState()

  useEffect(() => {
    if (window) {
      ReactGA.initialize('UA-165426415-1')
      ReactGA.pageview(window.location.pathname + window.location.search)
    }
    if (slug) {
      onLoad()
      setBanner(slug.replace(/\-/g, ' ').replace(/[0-9]/g, '').toUpperCase())
    }
  }, [])
  
  async function onLoad() {
    setPhotographer(await getPhotos(slug))
  }

  return (
    <PageWrapper active={'photographers'}> 
      <Head><title>Intergalactic &ndash; {banner ?  banner : ''}</title></Head>
      <div className={styles['photographers_banner']}>
        {banner && (
          <Textfit className={styles.h1} mode='single' max={50}>{banner}</Textfit>
        )}
      </div>
      {photographer && (
        <>
          <HoriScroll className={styles['desktop_view']}>
            {photographer.map((item, index) => <img src={item} key={index} /> )}
          </HoriScroll>
          <VideoGrid className={styles['mobile_view']}>
            {photographer.map((item, index) => 
              <img key={index} src={item} style={{ width: '100%', height: 'auto', margin: '0 0 -5px 0'}} />
            )}
          </VideoGrid>
        </>
      )}
    </PageWrapper>  
  )
}

SubPhotographerPage.getInitialProps = async ({ query }) => {
  return { slug: query.name }
}

export default SubPhotographerPage