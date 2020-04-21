import { useEffect, useState } from 'react'

import Router from 'next/router'
import Head from 'next/head'

import PageWrapper from '~/components/layout/pageWrapper'
import HoriScroll from '~/components/layout/HoriScroll'

import styles from './styles.scss'

export function SubPhotographerPage (props) {
  const { slug } = props

  useEffect(() => {
    if (slug) onLoad()
  }, [])
  
  function onLoad() {
    // call wordpress function here
  }

  return (
    <PageWrapper active={'photographers'}> 
      <HoriScroll />
    </PageWrapper>
  )
}

SubPhotographerPage.getInitialProps = async ({ query }) => {
  return { slug: query.name }
}

export default SubPhotographerPage