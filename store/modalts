import React, { useState } from 'react';
import Router from 'next/router';

import { getVimeoModalUrl } from '~/api/wordpress';

export const Context = React.createContext();

export function Store({ children }) {
  const [modalState, setModalState] = useState();
  const [modalContent, setModalContent] = useState();

  function closeModal(props) {
    console.log('props', props);
    const { pageSlug = '/' } = props;
    Router.push(pageSlug.search('directors') > 0 ? '/directors/[name]' : pageSlug, pageSlug, {
      shallow: true,
    });
    emptyModal();
  }

  function modalRoute(page, video) {
    Router.push(page, video, { shallow: true });
    loadVideo(video.split('v=')[1]);
  }

  function directorModalRoute({ pageSlug, videoSlug }) {
    const href = `/directors/${pageSlug}?v=${videoSlug}`;
    Router.push('/directors/[name]', href, { shallow: true });
    loadVideo(videoSlug);
  }

  async function loadVideo(slug) {
    setModalState(true);
    setModalContent(await getVimeoModalUrl(slug));
  }

  function emptyModal() {
    setModalContent();
    setModalState();
  }

  return (
    <Context.Provider
      value={{
        modalState,
        modalContent,
        closeModal,
        modalRoute,
        loadVideo,
        emptyModal,
        directorModalRoute,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default {
  Store,
  Context,
};
