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

const data = {src: VIDEO_0, fName: 'TOM', lName: 'RINGSBY'}

const directorsData = [
  {videoSrc: VIDEO_1, imgSrc: IMAGE_0, title: 'BAD HONEY', desc: '"Easily" by TOM RINGSBY'},
  {videoSrc: VIDEO_0, imgSrc: IMAGE_1, title: 'BAD HONEY', desc: '"Easily" by TOM RINGSBY'},
  {videoSrc: VIDEO_2, imgSrc: IMAGE_2, title: 'BAD HONEY', desc: '"Easily" by TOM RINGSBY'},
  {videoSrc: VIDEO_3, imgSrc: IMAGE_3, title: 'BAD HONEY', desc: '"Easily" by TOM RINGSBY'},
  {videoSrc: VIDEO_1, imgSrc: IMAGE_0, title: 'BAD HONEY', desc: '"Easily" by TOM RINGSBY'}
]

export function SubDirectorPage ({ slug }) {
  console.log('name', slug)
  return (
    <PageWrapper>
      <VideoBanner {...data}>
        <>
          <h1>{data.fName}</h1>
          <h2>{data.lName}</h2>
        </>
      </VideoBanner>
      <div className={styles['sub_director_grid']}>
        {directorsData.map((item, index) => 
          <DirectorCard {...item} key={index}>
            <div className={styles['card_content']}>
              <h1>{item.title}</h1>
              <h2>{item.desc}</h2>
            </div>
          </DirectorCard>
        )}
      </div>
    </PageWrapper>
  )
}

SubDirectorPage.getInitialProps = async ({ query }) => {
  return { slug: query.name }
}

export default SubDirectorPage