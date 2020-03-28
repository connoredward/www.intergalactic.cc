import { useEffect, useState } from 'react'

import Link from 'next/link'
import Router, { useRouter } from 'next/router'

import PageWrapper from '~/components/layout/pageWrapper'
import VideoGrid from '~/components/layout/videoGrid'
import DirectorCard from '~/components/layout/directorCard'
import VideoModal from '~/components/layout/videoModal'

import { getDirector, getVimeoVideo } from '~/components/modules/wordpressCall'

import styles from './styles.scss'
export function SubDirectorPage (props) {
  const {
    slug, 
    video = ''
  } = props
  const router = useRouter()
  // const [page, setPage] = useState()

  // useEffect(() => {
  //   setPage(slug)
  //   Router.events.on('routeChangeComplete', (url) => {setPage(url.substring(1))})
  // }, [slug])
  
  function changeRoute(videoSlug) {
    console.log(Router)
    // e.preventDefault();
    // console.log(videoSlug)
    Router.push(`/directors/${slug}`, `/directors/${slug}?video=${videoSlug}`, { shallow: true })
    // setPage(slug)
  }


  console.log(1, slug, video)

  const [director, setDirector] = useState([])
  const [modalState, setModalState] = useState({open: false, src: ''})

  useEffect(() => {
    if (slug) onLoad()
    if (video) startVideo()
    Router.events.on('routeChangeComplete', (url) => {console.log(url)})
  }, [slug, video])

  async function startVideo() {
    setModalState({open: true, src: await getVimeoVideo(video)})
  }

  async function onLoad() {
    setDirector(await getDirector(slug))
  }

  function closeModal() {
    // router.push(`directors/${slug}?`, `directors/${slug}`, { shallow: true })
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
  return { slug: query.name, video: query.video }
}

export default SubDirectorPage