import PageWrapper from '~/components/layout/pageWrapper'
import VideoBanner from '~/components/layout/videoBanner'

import VIDEO_2 from '~/static/videos/catergories/MUSIC_VIDEO_THUMBNAIL.mp4'

const data = {src: VIDEO_2, title: 'MUSIC VIDEOS'}

export function MusicVideosPage() {
  return (
    <PageWrapper>
      <VideoBanner {...data} />
    </PageWrapper>
  )
}

export default MusicVideosPage