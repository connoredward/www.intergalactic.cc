import React from 'react'
import App from 'next/app'

import './global.scss'

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