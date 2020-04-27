import { useEffect, useState } from 'react'

import Router from 'next/router'
import Head from 'next/head'
import { Textfit } from 'react-textfit'
import InfiniteScroll from 'react-infinite-scroller'

import PageWrapper from '~/components/layout/pageWrapper'
import VideoGrid from '~/components/layout/videoGrid'
import DirectorCard from '~/components/layout/directorCard'
import VideoModal from '~/components/layout/videoModal'

import { getSubPage, getVimeoModalUrl } from '~/api/wordpress'

import styles from './styles.scss'
export function SubDirectorPage (props) {
  const { slug, v = '' } = props

  const [banner, setBanner] = useState()

  const [originalDirectorList, setOriginalDirectorList] = useState([])

  const [director, setDirector] = useState([])
  const [modalState, setModalState] = useState({open: false, data: {}})

  const [loadingMore, setLoadingMore] = useState(false)

  useEffect(() => {
    if (slug) {
      setBanner(slug.replace(/\-/g, ' ').replace(/[0-9]/g, '').toUpperCase())
      onLoad()
    }
    if (v) startVideo(v)
    Router.events.on('routeChangeComplete', (url) => {
      const videoUrl = url.split('v=')[1]
      if (videoUrl) startVideo(videoUrl)
      else setModalState({open: false, data: {}})
    })
  }, [slug, v])
  
  async function changeRoute(videoSlug) {
    const href = `/directors/${slug}?v=${videoSlug}`
    Router.push('/directors/[name]', href, { shallow: true })
    setModalState({open: true, data: await getVimeoModalUrl(videoSlug)})
  }

  async function startVideo(videoSlug) {
    setModalState({open: true, data: await getVimeoModalUrl(videoSlug)})
  }

  async function onLoad() {
    const f = await getSubPage(slug)
    setOriginalDirectorList(f)
    setDirector(f)
    setLoadingMore(true)
  }

  function closeModal() {
    const href = `/directors/${slug}`
    Router.push('/directors/[name]', href, { shallow: true })
    setModalState({open: false, data: {}})
  }

  function loadFunc() {
    setDirector([...director, ...originalDirectorList])
  }

  return (
    <PageWrapper className={styles['sub_director_page']} active={'directors'}>
      <Head><title>Intergalactic &ndash; {banner ? banner : ''}</title></Head>
      <div className={styles['director_banner']}>
        {banner && (
          <Textfit className={styles.h1} mode="single" max={50}>{banner}</Textfit>
        )}
      </div>

      <VideoGrid className={styles['desktop_grid']}>
        {director.map((item, index) => 
          <DirectorCard 
            {...item} 
            onClick={() => changeRoute(item.slug)} key={index}
          >
            <img src={item.imgTitleSrc} />
          </DirectorCard>
        )}
      </VideoGrid>

      <VideoGrid className={styles['mobile_grid']}>
        <InfiniteScroll
          pageStart={1}
          loadMore={() => loadFunc()}
          hasMore={loadingMore}
        >
          {director.map((item, index) => 
            <DirectorCard
              {...item}
              onClick={() => changeRoute(item.slug)} key={index}
            >
              <img src={item.titleImg} />
            </DirectorCard>
          )}
        </InfiniteScroll>
      </VideoGrid>
      
      <VideoModal openModal={modalState} closeModal={() => closeModal()} />
    </PageWrapper>
  )
}

SubDirectorPage.getInitialProps = async ({ query }) => {
  return { slug: query.name, v: query.v }
}

export default SubDirectorPage