import { useEffect, useState } from 'react'

import Link from 'next/link'

import PageWrapper from '~/components/layout/pageWrapper'
import DirectorCard from '~/components/layout/directorCard'
import VideoGrid from '~/components/layout/videoGrid'

import { wordpressCardApi, getGalleryGrid } from '~/components/modules/wordpressCall'

import TITLE from '~/static/TITLES_1.png'

import styles from './styles.scss'

export function DirectorsPage() {
  const [directorsList, setDirectorsList] = useState([])
          
  useEffect(() => {
    onLoad()
  }, [])

  async function onLoad() {
    setDirectorsList(await wordpressCardApi('director'))
    getGalleryGrid()
  }

  console.log(directorsList)

  return (
    <PageWrapper active={'directors'}>
      <VideoGrid gridType={'threeGrid'}>
        {directorsList.map((item,index) => 
          <Link href={`/directors/${item.name.split(' ')[0].toLowerCase()}-${item.name.split(' ')[1].toLowerCase()}`} key={index}>
            <a>
              <DirectorCard {...item}>
                <div className={styles['card_content']}>
                  <img className={styles['title_image']} src={item.titleImg} />
                </div>
              </DirectorCard>
            </a>
          </Link>
        )}
      </VideoGrid>
    </PageWrapper>
  )
}

export default DirectorsPage