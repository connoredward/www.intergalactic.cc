import { useEffect, useState, useContext } from 'react';

import Router from 'next/router';
import Head from 'next/head';
import { Textfit } from 'react-textfit';
import InfiniteScroll from 'react-infinite-scroller';
import ReactGA from 'react-ga';

import PageWrapper from '~/components/layout/pageWrapper';
import VideoGrid from '~/components/layout/videoGrid';
import DirectorCard from '~/components/layout/directorCard';
import VideoModal from '~/components/layout/videoModal';

import { getSubPage } from '~/api/wordpress';
import { Context as ModalContext } from '~/store/modal';

import styles from './styles.module.scss';
export function SubDirectorPage({ slug, v }) {
  const [banner, setBanner] = useState();
  const [originalDirectorList, setOriginalDirectorList] = useState([]);
  const [mobileList, setMobileList] = useState([]);
  const [director, setDirector] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);

  const { directorModalRoute, loadVideo, emptyModal } = useContext(ModalContext);

  useEffect(() => {
    if (window) {
      ReactGA.initialize('UA-165426415-1');
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
    if (slug) {
      setBanner(slug.replace(/\-/g, ' ').replace(/[0-9]/g, '').toUpperCase());
      onLoad();
    }
    if (v) loadVideo(v);
    Router.events.on('routeChangeComplete', (url) => {
      const videoUrl = url.split('v=')[1];
      if (videoUrl) loadVideo(videoUrl);
      else emptyModal();
    });
  }, [slug, v]);

  async function onLoad() {
    const f = await getSubPage({ pTags: slug, pageNumber: 1 });
    setOriginalDirectorList(f);
    setDirector(f);
    setMobileList(f);
    setLoadingMore(true);
  }

  function loadFunc() {
    setMobileList([...mobileList, ...originalDirectorList]);
  }

  async function loadFuncDesktop(pageNumber) {
    const f = await getSubPage({ pTags: slug, pageNumber });
    if (f) setDirector([...director, ...f]);
    else setLoadingMore(false);
  }

  return (
    <PageWrapper className={styles['sub_director_page']} active={'directors'}>
      <Head>
        <title>Intergalactic &ndash; {banner && banner}</title>
      </Head>
      <div className={styles['director_banner']}>
        {banner && (
          <Textfit className={styles.h1} mode="single" max={50}>
            {banner}
          </Textfit>
        )}
      </div>

      <InfiniteScroll
        pageStart={1}
        loadMore={(pageNumber) => loadFuncDesktop(pageNumber)}
        hasMore={loadingMore}
      >
        <VideoGrid className={styles['desktop_grid']}>
          {director.map((item, index) => (
            <DirectorCard
              {...item}
              onClick={() => directorModalRoute({ pageSlug: slug, videoSlug: item.slug })}
              key={index}
            >
              <img src={item.imgTitleSrc} />
            </DirectorCard>
          ))}
        </VideoGrid>
      </InfiniteScroll>

      <VideoGrid className={styles['mobile_grid']}>
        <InfiniteScroll pageStart={1} loadMore={loadFunc} hasMore={loadingMore}>
          {mobileList.map((item, index) => (
            <DirectorCard
              {...item}
              onClick={() => directorModalRoute({ pageSlug: slug, videoSlug: item.slug })}
              key={index}
            >
              <img src={item.imgTitleSrc} />
            </DirectorCard>
          ))}
        </InfiniteScroll>
      </VideoGrid>
      <VideoModal slug={slug} />
    </PageWrapper>
  );
}

SubDirectorPage.getInitialProps = async ({ query }) => {
  return { slug: query.name, v: query.v };
};

export default SubDirectorPage;
