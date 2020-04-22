import React, { useState, useEffect } from 'react'

import Slider from 'react-slick'
import classNames from 'classnames'

import styles from './styles.scss'


export function MobileSlider({data, className, onClick}) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mobileHeight, setMobileHeight] = useState()

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    afterChange: afterChange,
    // autoplay: true,
    // autoplaySpeed: 2000,
    speed: 500
  }

  // useEffect(() => {
  //   if (window) {
  //     setMobileHeight(window.innerHeight)
  //     console.log(window.innerHeight)
  //   }
  // }, [])

  function afterChange(currentSlide) {
    setCurrentSlide(currentSlide)
  }

  return (
    <Slider style={{}} {...settings} className={classNames(styles['slider_wrapper'], className)}>
      {data.map(({imgSrc, titleImg, slug}, index) =>  
        <div 
          style={{ height: 'calc(200vh - 60px)', background: 'red' }}
          key={index} 
          className={styles['slide_content']} 
          onClick={() => onClick(slug)}
          // style={{ minHeight: `calc(90vh - 60px)`, height: `calc(${mobileHeight}px - 60px)`}}
          // style={{ height: '100px !important' }}
        >
          <div className={styles['background_image']} style={{ backgroundImage: `url(${imgSrc})` }} />
          <img src={titleImg} className={styles[currentSlide === index ? 'active' : undefined]} />
        </div>
      )}
    </Slider>
  )
}

export default MobileSlider