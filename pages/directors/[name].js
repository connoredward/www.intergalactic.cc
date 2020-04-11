import { useEffect, useState } from 'react'

import Router from 'next/router'
import { Textfit } from 'react-textfit'

import PageWrapper from '~/components/layout/pageWrapper'
import VideoGrid from '~/components/layout/videoGrid'
import DirectorCard from '~/components/layout/directorCard'
import VideoModal from '~/components/layout/videoModal'

import { getDirector, getVimeoVideo } from '~/components/modules/wordpressCall'

import styles from './styles.scss'
export function SubDirectorPage (props) {
  const {
    slug, 
    v = '',
  } = props

  const [banner, setBanner] = useState({})
  const [director, setDirector] = useState([])
  const [modalState, setModalState] = useState({open: false, src: ''})

  useEffect(() => {
    if (slug) onLoad()
    if (v) startVideo(v)
    Router.events.on('routeChangeComplete', (url) => {
      const videoUrl = url.split('v=')[1]
      if (videoUrl) startVideo(videoUrl)
      else setModalState({open: false, src: ''})
    })
  }, [slug, v])
  
  async function changeRoute(videoSlug) {
    const href = `/directors/${slug}?v=${videoSlug}`
    Router.push('/directors/[name]', href, { shallow: true })
    setModalState({open: true, src: await getVimeoVideo(videoSlug)})
  }

  async function startVideo(videoUrl) {
    setModalState({open: true, src: await getVimeoVideo(videoUrl)})
  }

  async function onLoad() {
    let directorData = await getDirector(slug)
    setBanner(directorData[0])
    directorData.shift()
    setDirector(directorData)
  }

  function closeModal() {
    const href = `/directors/${slug}`
    Router.push('/directors/[name]', href, { shallow: true })
    setModalState({open: false, src: ''})
  }

  return (
    <PageWrapper className={styles['sub_director_page']} active={'directors'}>
      <div className={styles['director_banner']}>
        {banner.name && (
          <Textfit className={styles.h1} mode="single">{banner.name}</Textfit>
        )}
      </div>
      <VideoGrid gridType={'twoGrid'}>
        {director.map((item, index) => 
          <DirectorCard 
            {...item} 
            onClick={( )=> changeRoute(item.slug)} key={index}
          >
            <img src={item.titleImg} />
          </DirectorCard>
        )}
      </VideoGrid>
      <VideoModal openModal={modalState} closeModal={() => closeModal()} />
    </PageWrapper>
  )
}

SubDirectorPage.getInitialProps = async ({ query }) => {
  return { slug: query.name, v: query.v }
}

export default SubDirectorPage