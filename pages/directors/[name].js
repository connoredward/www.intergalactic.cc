import { useEffect, useState } from 'react'

import PageWrapper from '~/components/layout/pageWrapper'
import VideoGrid from '~/components/layout/videoGrid'
import DirectorCard from '~/components/layout/directorCard'

import { getDirector } from '~/components/modules/wordpressCall'

import styles from './styles.scss'
export function SubDirectorPage ({ slug }) {
  const [director, setDirector] = useState([])

  useEffect(() => {
    if (slug) onLoad()
  }, [])

  async function onLoad() {
    setDirector(await getDirector(slug))
  }

  console.log(director)
  

  return (
    <PageWrapper className={styles['sub_director_page']} active={'directors'}>
      <VideoGrid gridType={'threeGrid'}>
        {director.map((item, index) => 
          <DirectorCard {...item} key={index} className={styles.video}>
            <div className={styles['card_content']}>
              <img src={item.titleImg} />
            </div>
          </DirectorCard>
        )}
      </VideoGrid>
    </PageWrapper>
  )
}

SubDirectorPage.getInitialProps = async ({ query }) => {
  return { slug: query.name }
}

export default SubDirectorPage