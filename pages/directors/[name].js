import PageWrapper from '~/components/layout/pageWrapper'
import VideoBanner from '~/components/layout/videoBanner'
import DirectorCard from '~/components/layout/directorCard'

import VIDEO_0 from '~/static/videos/catergories/CONTENT_THUMBNAIL.mp4'

const data = {src: VIDEO_0, fName: 'TOM', lName: 'RINGSBY'}

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
    </PageWrapper>
  )
}

SubDirectorPage.getInitialProps = async ({ query }) => {
  return { slug: query.name }
}

export default SubDirectorPage