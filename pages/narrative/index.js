import { useEffect, useState } from 'react'

import Router from 'next/router'
import Head from 'next/head'
import InfiniteScroll from 'react-infinite-scroller'
import ReactGA from 'react-ga'

import PageWrapper from '~/components/layout/pageWrapper'
import DirectorCard from '~/components/layout/directorCard'
import VideoGrid from '~/components/layout/videoGrid'
import VideoModal from '~/components/layout/videoModal'

import { getPage, getVimeoModalUrl } from '~/api/wordpress'

export function NarrativePage(props) {
  const {v = ''} = props

  const [contentList, setContentList] = useState([])
  const [modalState, setModalState] = useState({open: false, data: {}})

  const [loadingMore, setLoadingMore] = useState(false)

  useEffect(() => {
    onLoad()
    if (window) {
      ReactGA.initialize('UA-165426415-1')
      ReactGA.pageview(window.location.pathname + window.location.search)
    }
    if (v) startVideo(v)
    Router.events.on('routeChangeComplete', (url) => {
      const videoUrl = url.split('v=')[1]
      if (videoUrl) startVideo(videoUrl)
      else setModalState({open: false, data: {}})
    })
  }, [])
  
  async function onLoad() {
    setContentList(await getPage({pSlug: 'narrative', pageNumber: 1}))
    setLoadingMore(true)

  }

  async function startVideo(videoSlug) {
    setModalState({open: true, data: await getVimeoModalUrl(videoSlug)})
  }

  async function changeRoute(videoSlug) {
    const href = `/narrative?v=${videoSlug}`
    Router.push('/narrative', href, { shallow: true })
    setModalState({open: true, data: await getVimeoModalUrl(videoSlug)})
  }

  function closeModal() {
    const href = '/narrative'
    Router.push(href, href, { shallow: true })
    setModalState({open: false, data: {}})
  }

  async function loadFunc(pageNumber) {
    const f = await getPage({pSlug: 'narrative', pageNumber})
    if (f) setContentList([...contentList, ...f])
    else setLoadingMore(false)
  }

  return (
    <PageWrapper active={'narrative'}>
      <Head><title>Intergalactic &ndash; Narrative</title></Head>
      <InfiniteScroll
        pageStart={1}
        loadMore={pageNumber => loadFunc(pageNumber)}
        hasMore={loadingMore}
      >
        <VideoGrid>
          {contentList.map((item, index) => 
            <DirectorCard {...item} key={index} onClick={() => changeRoute(item.slug)}>
              <img src={item.imgTitleSrc} />
            </DirectorCard>
          )}
        </VideoGrid>
      </InfiniteScroll>
      <VideoModal openModal={modalState} closeModal={() => closeModal()} />
    </PageWrapper>
  )
}

NarrativePage.getInitialProps = async ({query}) => {
  return { v: query.v }
}

export default NarrativePage