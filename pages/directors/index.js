import { useEffect, useState } from 'react'

import Link from 'next/link'
import Head from 'next/head'
import { Textfit } from 'react-textfit'

import PageWrapper from '~/components/layout/pageWrapper'
import DirectorCard from '~/components/layout/directorCard'
import VideoGrid from '~/components/layout/videoGrid'

import { getPage } from '~/api/wordpress'

import styles from './styles.scss'

export function DirectorsPage() {
  const [directorsList, setDirectorsList] = useState([])
          
  useEffect(() => {
    onLoad()
  }, [])

  async function onLoad() {
    setDirectorsList(await getPage('directors'))
  }
  
  return (
    <PageWrapper active={'directors'}>
      <Head><title>Intergalactic &ndash; Directors</title></Head>
      <VideoGrid>
        {directorsList.map((item, index) => 
          <Link href={`/directors/${item.slug}`} key={index}>
            <a style={{ gridColumn: `span ${item.gridColumn}`, gridRow: `span ${item.gridRow}` }}>
              <DirectorCard {...item} className={styles['director_card_wrapper']} showContent={true}>
                <Textfit className={styles.h1} mode="single" max={28}>{item.title}</Textfit>
              </DirectorCard>
            </a>
          </Link>
        )}
      </VideoGrid>
    </PageWrapper>
  )
}

export default DirectorsPage