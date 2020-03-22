import PageWrapper from '~/components/layout/pageWrapper'
import VideoBanner from '~/components/layout/videoBanner'

import VIDEO_0 from '~/static/videos/catergories/DIRECTORS_THUMBNAIL.mp4'

const data = {src: VIDEO_0, title: 'DIRECTORS'}

export function DirectorsPage() {
  return (
    <PageWrapper>
      <VideoBanner {...data} />
    </PageWrapper>
  )
}

export default DirectorsPage