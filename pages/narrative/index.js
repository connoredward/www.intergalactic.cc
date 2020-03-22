import PageWrapper from '~/components/layout/pageWrapper'
import VideoBanner from '~/components/layout/videoBanner'

import VIDEO_3 from '~/static/videos/catergories/NARRATIVE_THUMBNAIL.mp4'

const data = {src: VIDEO_3, title: 'NARRATIVE'}

export function NarrativePage() {
  return (
    <PageWrapper>
      <VideoBanner {...data} />
    </PageWrapper>
  )
}

export default NarrativePage