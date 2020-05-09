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

export function BrandedPage (props) {
  const {v = ''} = props
  
  const [brandedList, setBrandedList] = useState([])
  const [modalState, setModalState] = useState({open: false, data: {}})

  const [loadingMore, setLoadingMore] = useState(false)

  useEffect(() => {
    if (window) {
      ReactGA.initialize('UA-165426415-1')
      ReactGA.pageview(window.location.pathname + window.location.search)
    }
    onLoad()
    if (v) startVideo(v)
    Router.events.on('routeChangeComplete', (url) => {
      const videoUrl = url.split('v=')[1]
      if (videoUrl) startVideo(videoUrl)
      else setModalState({open: false, data: {}})
    })
  }, [])
  
  async function onLoad() {
    setBrandedList(await getPage({pSlug: 'branded', pageNumber: 1}))
    setLoadingMore(true)
  }

  async function startVideo(videoSlug) {
    setModalState({open: true, data: await getVimeoModalUrl(videoSlug)})
  }

  async function changeRoute(videoSlug) {
    const href = `/branded?v=${videoSlug}`
    Router.push('/branded', href, { shallow: true })
    setModalState({open: true, data: await getVimeoModalUrl(videoSlug)})
  }

  function closeModal() {
    const href = '/branded'
    Router.push(href, href, { shallow: true })
    setModalState({open: false, data: {}})
  }

  async function loadFunc(pageNumber) {
    const f = await getPage({pSlug: 'branded', pageNumber})
    if (f) setBrandedList([...brandedList, ...f])
    else setLoadingMore(false)
  }

  return (
    <PageWrapper active={'branded'}>
      <Head><title>Intergalactic &ndash; Branded</title></Head>
      <InfiniteScroll
        pageStart={1}
        loadMore={pageNumber => loadFunc(pageNumber)}
        hasMore={loadingMore}
      >
        <VideoGrid>
          {brandedList.map((item, index) => 
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

BrandedPage.getInitialProps = async ({ query }) => {
  return { v: query.v }
}

export default BrandedPage