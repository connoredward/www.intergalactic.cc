import {useEffect, useState, useContext} from 'react'

import Router from 'next/router'
import Head from 'next/head'
import InfiniteScroll from 'react-infinite-scroller'
import ReactGA from 'react-ga'

import PageWrapper from '~/components/layout/pageWrapper'
import DirectorCard from '~/components/layout/directorCard'
import VideoGrid from '~/components/layout/videoGrid'
import VideoModal from '~/components/layout/videoModal'

import {getPage} from '~/api/wordpress'
import {Context as ModalContext} from '~/store/modal'

export function LivePage ({v}) {
  const [liveList, setLiveList] = useState([])
  const [loadingMore, setLoadingMore] = useState(false)

  const {modalRoute, loadVideo, emptyModal} = useContext(ModalContext)

  useEffect(() => {
    onLoad()
    if (window) {
      ReactGA.initialize('UA-165426415-1')
      ReactGA.pageview(window.location.pathname + window.location.search)
    }
    if (v) startVideo(v)
    Router.events.on('routeChangeComplete', (url) => {
      const videoUrl = url.split('v=')[1]
      if (videoUrl) loadVideo(videoUrl)
      else emptyModal()
    })
  }, [v])

  async function onLoad() {
    setLiveList(await getPage({pSlug: 'live', pageNumber: 1}))
    setLoadingMore(true)
  }

  async function loadFunc(pageNumber) {
    const f = await getPage({pSlug: 'live', pageNumber})
    if (f) setLiveList([...liveList, ...f])
    else setLoadingMore(false)
  }

  return (
    <PageWrapper active={'live'}>
      <Head><title>Intergalactic &ndash; Live</title></Head>
      <InfiniteScroll
        pageStart={1}
        loadMore={pageNumber => loadFunc(pageNumber)}
        hasMore={loadingMore}
      >
        <VideoGrid>
          {liveList.map((item, index) => 
            <DirectorCard {...item} key={index} 
              onClick={() => modalRoute('/live', `/live?v=${item.slug}`)}
            >
              <img src={item.imgTitleSrc} />
            </DirectorCard>
          )}
        </VideoGrid>
      </InfiniteScroll>
      <VideoModal />
    </PageWrapper>
  )
}

export default LivePage