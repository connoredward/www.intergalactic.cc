import { useEffect, useState, useContext } from 'react';

import Router from 'next/router';
import Head from 'next/head';
import ReactGA from 'react-ga';

import PageWrapper from '~/components/layout/pageWrapper';
import InfiniteSlider from '~/components/layout/infiniteSlider';
import MobileSlider from '~/components/layout/mobileSlider';
import VideoModal from '~/components/layout/videoModal';
import SplashScreen from '~/components/layout/splashScreen';

import { getPage } from '~/api/wordpress';
import { Context as ModalContext } from '~/store/modal';

const lockScroll = {
  height: '100vh',
  overflow: 'hidden',
};

export function MainPage({ v }) {
  const [videoData, setVideoData] = useState();
  const [loading, setLoading] = useState(false);

  const { modalRoute, loadVideo, emptyModal } = useContext(ModalContext);

  useEffect(() => {
    onLoad();
    if (window) {
      ReactGA.initialize('UA-165426415-1');
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
    if (v) loadVideo(v);
    Router.events.on('routeChangeComplete', (url) => {
      const videoUrl = url.split('v=')[1];
      if (videoUrl) loadVideo(videoUrl);
      else emptyModal();
    });
  }, []);

  async function onLoad() {
    setVideoData(await getPage({ pSlug: 'home', pageNumber: 1 }));
    setLoading(true);
  }

  return (
    <div style={loading ? undefined : lockScroll}>
      <Head>
        <title>Intergalactic &ndash; Home</title>
      </Head>
      <SplashScreen loading={loading} />
      <PageWrapper loading={loading}>
        {videoData && (
          <>
            <InfiniteSlider onClick={(url) => modalRoute('/', `/?v=${url}`)} data={videoData} />
            <MobileSlider onClick={(url) => modalRoute('/', `/?v=${url}`)} data={videoData} />
          </>
        )}
        <VideoModal />
      </PageWrapper>
    </div>
  );
}

MainPage.getInitialProps = async ({ query }) => {
  return { v: query.v };
};

export default MainPage;
