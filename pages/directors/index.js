import { useEffect, useState } from 'react'

import Link from 'next/link'

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

  const [directorsList, setDirectorsList] = useState([])
  const [bannerVideo, setBannerVideo] = useState({title: ''})
          
  useEffect(() => {
    onLoad()
  }, [])

  async function onLoad() {
    const categories = await fetch('https://public-api.wordpress.com/wp/v2/sites/atestdomains.wordpress.com/categories')
      .then(res => res.json())
    const catId = categories.find((item) => item.name === 'directors').id

    const tags = await fetch('https://public-api.wordpress.com/wp/v2/sites/atestdomains.wordpress.com/tags')
      .then(res => res.json())
    const bannerId = tags.find((item) => item.name === 'banner').id

    const postArray = await fetch('https://public-api.wordpress.com/wp/v2/sites/atestdomains.wordpress.com/posts')
      .then(res => res.json())

    const bannerVideoObj = postArray.find(({tags}) => tags[0] === bannerId)
    const bannerVideoContent = bannerVideoObj.content.rendered.split('"')
    const bannerVideoId = bannerVideoContent.findIndex((i) => i === "video/mp4") + 2
    const bannerVideoSrc = bannerVideoContent[bannerVideoId] 
    setBannerVideo({src: bannerVideoSrc, title: 'DIRECTORS'})

    const sortedList = postArray.filter((item) => item.categories[0] === catId)
      .map((item) => {
        if (item.tags[0] === bannerId) return {}
        let itemObj = item.content.rendered.split('"')
        let imgIndex = itemObj.findIndex((i) => i === " data-large-file=") + 1
        let videoIndex = itemObj.findIndex((i) => i === "video/mp4") + 2
        return {
          name: item.title.rendered,
          imgSrc: itemObj[imgIndex],
          videoSrc: itemObj[videoIndex]
        }
      }).filter(value => Object.keys(value).length !== 0)

    setDirectorsList(sortedList)
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