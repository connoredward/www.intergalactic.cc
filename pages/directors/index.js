import { useEffect, useState } from 'react'

import Link from 'next/link'
import Head from 'next/head'
import { Textfit } from 'react-textfit'

import PageWrapper from '~/components/layout/pageWrapper'
import DirectorCard from '~/components/layout/directorCard'
import VideoGrid from '~/components/layout/videoGrid'

import { wordpressCardApi } from '~/components/modules/wordpressCall'

import styles from './styles.scss'

export function DirectorsPage() {
  const [directorsList, setDirectorsList] = useState([])
          
  useEffect(() => {
    onLoad()
  }, [])

  async function onLoad() {
    setDirectorsList(await wordpressCardApi('directors'))
  }

  return (
    <PageWrapper active={'directors'}>
      <Head>
        <title>Intergalactic &ndash; Directors</title>
      </Head>
      <VideoGrid gridType={'threeGrid'}>
        {directorsList.map((item,index) => 
          <Link href={`/directors/${item.name.split(' ')[0].toLowerCase()}-${item.name.split(' ')[1].toLowerCase()}`} key={index}>
            <a style={{ gridColumn: `span ${item.column}`, gridRow: `span ${item.row}` }}>
              <DirectorCard {...item} className={styles['director_card_wrapper']}>
                <Textfit className={styles.h1} mode="single">{item.name}</Textfit>
              </DirectorCard>
            </a>
          </Link>
        )}
      </VideoGrid>
    </PageWrapper>
  )
}

export default DirectorsPage