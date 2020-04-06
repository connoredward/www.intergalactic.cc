import React from 'react'
import App from 'next/app'

import './global.scss'

import "react-responsive-carousel/lib/styles/carousel.min.css";

class Base extends App {
  render () {
    const { Component, pageProps } = this.props
    return (
      <>
        <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
        <Component {...pageProps} />
      </>
    )
  }
}

export default Base