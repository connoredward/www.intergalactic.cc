import { useEffect, useState } from 'react'

import PageWrapper from '~/components/layout/pageWrapper'
import VideoGrid from '~/components/layout/videoGrid'
import DirectorCard from '~/components/layout/directorCard'
import VideoModal from '~/components/layout/VideoModal'

import { getDirector } from '~/components/modules/wordpressCall'

import styles from './styles.scss'
export function SubDirectorPage ({ slug }) {
  const [director, setDirector] = useState([])
  const [modalState, setModalState] = useState({open: false, src: ''})

  useEffect(() => {
    if (slug) onLoad()
  }, [])

  async function onLoad() {
    setDirector(await getDirector(slug))
  }


  return (
    <PageWrapper className={styles['sub_director_page']} active={'directors'}>
      <VideoGrid gridType={'twoGrid'}>
        {director.map((item, index) => 
          <DirectorCard onClick={() => setModalState({open: true, src: item.videoLink})} {...item} key={index} className={styles.video}>
            <img src={item.titleImg} />
          </DirectorCard>
        )}
      </VideoGrid>
      <VideoModal openModal={modalState} closeModal={() => setModalState({open: false, src: ''})} />
    </PageWrapper>
  )
}

SubDirectorPage.getInitialProps = async ({ query }) => {
  return { slug: query.name }
}

export default SubDirectorPage