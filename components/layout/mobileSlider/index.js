import React, { useState, useEffect, useRef } from 'react'

import Slider from 'react-slick'
import classNames from 'classnames'

import styles from './styles.scss'


export function MobileSlider({data, className, onClick}) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    beforeChange: beforeChange,
    afterChange: afterChange
  }

  function beforeChange(currentSlide, nextSlide) {
  }

  function afterChange(currentSlide) {
    setCurrentSlide(currentSlide)
  }

  return (
    <Slider {...settings} className={classNames(styles['slider_wrapper'], className)}>
      {data.map(({videoSrc, titleImg, slug}, index) => 
        <div key={index} className={styles['slide_content']} onClick={() => onClick(slug)}>
          <img src={titleImg} className={styles[currentSlide === index ? 'active' : undefined]} />
          <video src={videoSrc} autoPlay muted />
        </div>
      )}
    </Slider>
  )
}

export default MobileSlider