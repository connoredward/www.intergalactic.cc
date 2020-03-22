import PageWrapper from '~/components/layout/pageWrapper'
import VideoBanner from '~/components/layout/videoBanner'
import DirectorCard from '~/components/layout/directorCard'

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
  return (
    <PageWrapper>
      <VideoBanner {...data} />
      <div className={styles['directors_grid']}>
        {directorsData.map((item, index) => 
          <DirectorCard key={index} {...item}>
            <div className={styles['card_content']}>
              <h1>{item.firstName}</h1>
              <h2>{item.lastName}</h2>
            </div>
          </DirectorCard>
        )}
      </div>
    </PageWrapper>
  )
}

export default DirectorsPage