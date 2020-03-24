import { useEffect, useState } from 'react'

import PageWrapper from '~/components/layout/pageWrapper'

export function SubMusicVideoPage ({ slug }) {
  console.log('name', slug)
  return (
    <PageWrapper>
      {/* <VideoBanner {...data}>
        <>
        </>
      </VideoBanner> */}
    </PageWrapper>
  )
}

SubMusicVideoPage.getInitialProps = async ({ query }) => {
  return { slug: query.name }
}

export default SubMusicVideoPage