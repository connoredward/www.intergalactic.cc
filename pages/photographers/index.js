import { useEffect, useState } from 'react'

import Link from 'next/link'
import Head from 'next/head'
import { Textfit } from 'react-textfit'
import InfiniteScroll from 'react-infinite-scroller'
import ReactGA from 'react-ga'

import PageWrapper from '~/components/layout/pageWrapper'
import DirectorCard from '~/components/layout/directorCard'
import VideoGrid from '~/components/layout/videoGrid'

import { getPage } from '~/api/wordpress'

import styles from './styles.scss'

export function PhotographersPage () {
  const [photographersList, setPhotographersList] = useState([])

  const [loadingMore, setLoadingMore] = useState(false)

  useEffect(() => {
    if (window) {
      ReactGA.initialize('UA-165426415-1')
      ReactGA.pageview(window.location.pathname + window.location.search)
    }
    onLoad()
  }, [])

  async function onLoad() {
    setPhotographersList(await getPage({pSlug: 'photographers', pageNumber: 1}))
    setLoadingMore(true)
  }

  async function loadFunc(pageNumber) {
    const f = await getPage({pSlug: 'photographers', pageNumber})
    if (f) setPhotographersList([...photographersList, ...f])
    else setLoadingMore(false)
  }

  return ( 
    <PageWrapper active={'photographers'}>
      <Head><title>Intergalactic &ndash; Photographers</title></Head>
      <InfiniteScroll
        pageStart={1}
        loadMore={pageNumber => loadFunc(pageNumber)}
        hasMore={loadingMore}
      >
        <VideoGrid className={styles['photographers_grid_sizing']}>
          {photographersList.map((item, index) =>
            <Link href={`/photographers/${item.slug}`} key={index}>
              <a className={styles['card_links']} style={{ gridColumn: `span ${item.gridColumn}`, gridRow: `span ${item.gridRow}`}}>
                <DirectorCard {...item} showContent={true} className={styles['photographer_card_wrapper']}>
                  <Textfit className={styles.h1} mode='single' max={28}>{item.title}</Textfit>
                </DirectorCard>
              </a>
            </Link>
          )}
        </VideoGrid>
      </InfiniteScroll>
    </PageWrapper>
  )
}

export default PhotographersPage