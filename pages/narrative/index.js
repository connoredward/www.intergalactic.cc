import { useEffect, useState } from 'react'

import PageWrapper from '~/components/layout/pageWrapper'

import { wordpressCardApi } from '~/components/modules/wordpressCall'

export function NarrativePage() {
  const [contentList, setContentList] = useState([])

  useEffect(() => {
    onLoad()
  }, [])
  
  async function onLoad() {
    setContentList(await wordpressCardApi('narrative'))
  }

  return (
    <PageWrapper active={'narrative'}>
    </PageWrapper>
  )
}

export default NarrativePage