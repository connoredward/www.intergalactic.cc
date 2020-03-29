import { useEffect, useState } from 'react'

import Link from 'next/link'
import Router, { useRouter, withRouter } from 'next/router'

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
    setDirector(await getDirector(slug))
  }

  function closeModal() {
    const href = `/directors/${slug}`
    Router.push('/directors/[name]', href, { shallow: true })
    setModalState({open: false, src: ''})
  }

  return (
    <PageWrapper className={styles['sub_director_page']} active={'directors'}>
      <VideoGrid gridType={'twoGrid'}>
        {director.map((item, index) => 
          <DirectorCard 
            {...item} 
            onClick={( )=> changeRoute(item.slug)} key={index}
            // onClick={() => setModalState({open: true, src: item.videoLink})} 
            className={styles['sub_director_card_wrapper']}
          >
            {item.name 
              ? <h1>{item.name}</h1>
              : <img src={item.titleImg} />
            }
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