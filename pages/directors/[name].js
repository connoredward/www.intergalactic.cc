import { useEffect, useState } from 'react'

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

  console.log(1, slug, video)

  const [director, setDirector] = useState([])
  const [modalState, setModalState] = useState({open: false, src: ''})

  useEffect(() => {
    if (slug) onLoad()
    if (video) startVideo()
  }, [])

  async function startVideo() {
    setModalState({open: true, src: await getVimeoVideo(video)})
  }

  async function onLoad() {
    setDirector(await getDirector(slug))
  }


  return (
    <PageWrapper className={styles['sub_director_page']} active={'directors'}>
      <VideoGrid gridType={'twoGrid'}>
        {director.map((item, index) => 
          <DirectorCard 
            {...item} 
            onClick={() => setModalState({open: true, src: item.videoLink})} 
            key={index} 
            className={styles['sub_director_card_wrapper']}
          >
            {item.name 
              ? <h1>{item.name}</h1>
              : <img src={item.titleImg} />
            }
          </DirectorCard>
        )}
      </VideoGrid>
      <VideoModal openModal={modalState} closeModal={() => setModalState({open: false, src: ''})} />
    </PageWrapper>
  )
}

SubDirectorPage.getInitialProps = async ({ query }) => {
  return { slug: query.name, video: query.video }
}

export default SubDirectorPage