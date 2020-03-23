import { useEffect, useState } from 'react'

import Link from 'next/link'

import PageWrapper from '~/components/layout/pageWrapper'
import VideoBanner from '~/components/layout/videoBanner'
import DirectorCard from '~/components/layout/directorCard'

import { wordpressCardApi, videoBannerApi } from '~/components/modules/wordpressCall'

import IMAGE_0 from '~/static/images/catergories/COURTESY_ZOOM.jpg'
import IMAGE_1 from '~/static/images/catergories/NOVELIST.jpg'
import IMAGE_2 from '~/static/images/catergories/CONTENT_THUMBNAIL.jpg'
import IMAGE_3 from '~/static/images/catergories/DARKSTAR.jpg'

import VIDEO_0 from '~/static/videos/catergories/CONTENT_THUMBNAIL.mp4'
import VIDEO_1 from '~/static/videos/catergories/DIRECTORS_THUMBNAIL.mp4'
import VIDEO_2 from '~/static/videos/catergories/MUSIC_VIDEO_THUMBNAIL.mp4'
import VIDEO_3 from '~/static/videos/catergories/NARRATIVE_THUMBNAIL.mp4'

import styles from './styles.scss'

const data = {src: VIDEO_0, title: 'DIRECTORS'}

const directorsData = [
  {videoSrc: VIDEO_1, imgSrc: IMAGE_0, firstName: 'RHORY', lastName: 'DANNIELLS'},
  {videoSrc: VIDEO_0, imgSrc: IMAGE_1, firstName: 'MATT', lastName: 'HALSALL'},
  {videoSrc: VIDEO_2, imgSrc: IMAGE_2, firstName: 'SIMON', lastName: 'HALSALL'},
  {videoSrc: VIDEO_3, imgSrc: IMAGE_3, firstName: 'TOM', lastName: 'RINGSBY'}
]

export function DirectorsPage() {

  const [directorsList, setDirectorsList] = useState([])
  const [bannerVideo, setBannerVideo] = useState({title: ''})
          
  useEffect(() => {
    onLoad()
  }, [])

  async function onLoad() {
    setBannerVideo({src: await videoBannerApi('directors'), title: 'DIRECTORS'})
    setDirectorsList(await wordpressCardApi('directors'))
  }

  return (
    <PageWrapper>
      <VideoBanner {...bannerVideo}>
        <h1>{bannerVideo.title}</h1>
      </VideoBanner>
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
        {/* {directorsData.map((item, index) => 
          <Link href={`/directors/${item.firstName.toLowerCase()}-${item.lastName.toLowerCase()}`} key={index}>
            <a>
              <DirectorCard {...item}>
                <div className={styles['card_content']}>
                  <h1>{item.firstName}</h1>
                  <h2>{item.lastName}</h2>
                </div>
              </DirectorCard>
            </a>
          </Link>
        )} */}
      </div>
    </PageWrapper>
  )
}

export default DirectorsPage