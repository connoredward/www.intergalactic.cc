import PageWrapper from '~/components/layout/pageWrapper'
import VideoBanner from '~/components/layout/videoBanner'

import VIDEO_0 from '~/static/videos/catergories/CONTENT_THUMBNAIL.mp4'

const data = {src: VIDEO_0, title: 'CONTENT'}

export function BrandedPage() {
  return (
    <PageWrapper>
      <VideoBanner {...data} />
    </PageWrapper>
  )
}

export default BrandedPage