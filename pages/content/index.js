import { useEffect, useState } from 'react'

import PageWrapper from '~/components/layout/pageWrapper'
import DirectorCard from '~/components/layout/directorCard'
import VideoGrid from '~/components/layout/videoGrid'

import { wordpressCardApi } from '~/components/modules/wordpressCall'

import styles from './styles.scss'

export function ContentPage() {
  const [contentList, setContentList] = useState([])

  useEffect(() => {
    onLoad()
  }, [])
  
  async function onLoad() {
    setContentList(await wordpressCardApi('content'))
  }

  return (
    <PageWrapper active={'content'}>
      <VideoGrid gridType={'flexGrid'}>
        {contentList.map((item, index) => 
          <DirectorCard {...item} key={index}>
            <img src={item.titleImg} />
          </DirectorCard>
        )}
      </VideoGrid>
    </PageWrapper>
  )
}

export default ContentPage