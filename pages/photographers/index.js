import { useEffect, useState } from 'react'

import Link from 'next/link'
import Head from 'next/head'
import { Textfit } from 'react-textfit'

import PageWrapper from '~/components/layout/pageWrapper'
import DirectorCard from '~/components/layout/directorCard'
import VideoGrid from '~/components/layout/videoGrid'

import { wordpressCardApi } from '~/components/modules/wordpressCall'

import styles from './styles.scss'

export function PhotographersPage () {
  const [photographersList, setPhotographersList] = useState([])

  useEffect(() => {
    onLoad()
  }, [])

  async function onLoad() {
    setPhotographersList(await wordpressCardApi('photographers'))
  }

  return ( 
    <PageWrapper active={'photographers'}>
      <Head><title>Intergalactic &ndash; Photographers</title></Head>
      <VideoGrid>
        {photographersList.map((item, index) =>
          <Link href={`/photographers/${item.name.split(' ')[0].toLowerCase()}-${item.name.split(' ')[1].toLowerCase()}`} key={index}>
            <a style={{ gridColumn: `span ${item.column}`, gridRow: `span ${item.row}`}}>
              <DirectorCard {...item}>
                <Textfit mode='single'>{item.name}</Textfit>
              </DirectorCard>
            </a>
          </Link>
        )}
      </VideoGrid>
    </PageWrapper>
  )
}

export default PhotographersPage