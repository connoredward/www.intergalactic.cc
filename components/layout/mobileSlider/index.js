import React, { useState, useEffect, useRef } from 'react'

import Slider from 'react-slick'
import classNames from 'classnames'

import styles from './styles.scss'


export function MobileSlider({data, className, onClick}) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [vhResize, setVhResize] = useState()

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    afterChange: afterChange
  }

  useEffect(() => {
    if (window) {
      console.log(window)
      window.addEventListener('resize', () => {
        // console.log(window.innerHeight)
        setVhResize(window.innerHeight)
      })
    }
  }, [window])

  function afterChange(currentSlide) {
    setCurrentSlide(currentSlide)
  }

  console.log(1, vhResize)

  return (
    <Slider {...settings} className={classNames(styles['slider_wrapper'], className)}>
      {data.map(({videoSrc, titleImg, slug}, index) => 
        <div key={index} className={styles['slide_content']} onClick={() => onClick(slug)} style={{ height: `${vhResize}px` }}>
          <img src={titleImg} className={styles[currentSlide === index ? 'active' : undefined]} />
          <video src={videoSrc} autoPlay muted />
        </div>
      )}
    </Slider>
  )
}

export default MobileSlider