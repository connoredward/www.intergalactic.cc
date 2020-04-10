import React, { useState, useEffect, useRef } from 'react'

import Slider from 'react-slick'
import classNames from 'classnames'

import styles from './styles.scss'

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  vertical: true,
  verticalSwiping: true,
  arrows: false,
  beforeChange: (currentSlide,  nextSlide) => {
    console.log(currentSlide, nextSlide)
  },
  afterChange: (currentSlide) => {
    console.log(currentSlide)
  }
}

export function MobileSlider({data, className}) {
  const sliderRef = useRef()

  return (
    <Slider {...settings} className={classNames(styles['slider_wrapper'], className)}>
      {data.map(({videoSrc}, index) => 
        <div key={index} className={styles['slide_content']}>
          <video src={videoSrc} autoPlay muted />
        </div>
      )}
    </Slider>
  )
}

export default MobileSlider