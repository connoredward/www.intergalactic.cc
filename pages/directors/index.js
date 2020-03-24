import { useEffect, useState } from 'react'

import Link from 'next/link'

import PageWrapper from '~/components/layout/pageWrapper'
import DirectorCard from '~/components/layout/directorCard'

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
      <div className={styles['directors_grid']}>
        {directorsList.map((item,index) => 
          <Link href={`/directors/${item.name.split(' ')[0].toLowerCase()}-${item.name.split(' ')[1].toLowerCase()}`} key={index}>
            <a>
              <DirectorCard {...item}>
                <div className={styles['card_content']}>
                  <h1>{item.name.split(' ')[0]}</h1>
                  <h2>{item.name.split(' ')[1]}</h2>
                </div>
              </DirectorCard>
            </a>
          </Link>
        )}
      </div>
    </PageWrapper>
  )
}

export default DirectorsPage