import { useEffect, useState } from 'react'

import Head from 'next/head'

import PageWrapper from '~/components/layout/pageWrapper'

import styles from './styles.scss'

export function PhotographersPage () {
  return ( 
    <PageWrapper active={'photographers'}>
      <Head>
        <title>Intergalactic &ndash; Photographers</title>
      </Head>
    </PageWrapper>
  )
}

export default PhotographersPage