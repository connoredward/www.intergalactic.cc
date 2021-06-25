import { useEffect, useState } from 'react';

import Link from 'next/link';
import Head from 'next/head';
import { Textfit } from 'react-textfit';
import InfiniteScroll from 'react-infinite-scroller';
import ReactGA from 'react-ga';

import PageWrapper from '~/components/layout/pageWrapper';
import DirectorCard from '~/components/layout/directorCard';
import VideoGrid from '~/components/layout/videoGrid';

import { getPage } from '~/api/wordpress';

import styles from './styles.module.scss';

export function DirectorsPage() {
  const [directorsList, setDirectorsList] = useState([]);

  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    if (window) {
      ReactGA.initialize('UA-165426415-1');
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
    onLoad();
  }, []);

  async function onLoad() {
    setDirectorsList(await getPage({ pSlug: 'directors', pageNumber: 1 }));
    setLoadingMore(true);
  }

  async function loadFunc(pageNumber) {
    const f = await getPage({ pSlug: 'directors', pageNumber });
    if (f) setDirectorsList([...directorsList, ...f]);
    else setLoadingMore(false);
  }

  return (
    <PageWrapper active={'directors'}>
      <Head>
        <title>Intergalactic &ndash; Directors</title>
      </Head>
      <InfiniteScroll
        pageStart={1}
        loadMore={(pageNumber) => loadFunc(pageNumber)}
        hasMore={loadingMore}
      >
        <VideoGrid className={styles['director_grid_sizing']}>
          {directorsList.map((item, index) => (
            <Link href={`/directors/${item.slug}`} key={index}>
              <a
                className={styles['card_links']}
                style={{ gridColumn: `span ${item.gridColumn}`, gridRow: `span ${item.gridRow}` }}
              >
                <DirectorCard
                  {...item}
                  className={styles['director_card_wrapper']}
                  showContent={true}
                >
                  <Textfit className={styles.h1} mode="single" max={28}>
                    {item.title}
                  </Textfit>
                </DirectorCard>
              </a>
            </Link>
          ))}
        </VideoGrid>
      </InfiniteScroll>
    </PageWrapper>
  );
}

export default DirectorsPage;
