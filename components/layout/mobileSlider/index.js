import React, { useState, useEffect, useRef } from 'react'

import { Carousel } from 'react-responsive-carousel'

import styles from './styles.scss'

export function MobileSlider({data, className}) {
  function nextSlide() {
    console.log('next')
  }

  return (
    <Carousel
      axis='vertical'
      verticalSwipe='natural'
      emulateTouch
      className={className}
    >
      {data.map(({videoSrc, titleimg}, index) => 
        <div className={styles['slide_wrapper']} key={index}>
          <img src={titleimg} />
          <video src={videoSrc} autoPlay muted onEnded={() => nextSlide()} />
        </div>
      )}
    </Carousel>
  )
}

export default MobileSlider