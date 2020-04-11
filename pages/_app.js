import React from 'react'
import App from 'next/app'

import './global.scss'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

class Base extends App {
  render () {
    const { Component, pageProps } = this.props
    return (
      <>
        <Component {...pageProps} />
      </>
    )
  }
}

export default Base