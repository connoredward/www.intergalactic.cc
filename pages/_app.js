import React from 'react'
import App from 'next/app'

import { Store as ModalStore } from '~/store/modal'

import './global.scss'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

class Base extends App {
  render () {
    const { Component, pageProps } = this.props
    return (
      <ModalStore>
        <Component {...pageProps} />
      </ModalStore>
    )
  }
}

export default Base