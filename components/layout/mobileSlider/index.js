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

  useEffect(() => {
    if (window) {
      setMobileHeight(window.innerHeight)
      window.addEventListener('resive', function () {
        setMobileHeight(window.innerHeight)
      })
      console.log(window.innerHeight)
    }
  }, [])

  function afterChange(currentSlide) {
    setCurrentSlide(currentSlide)
  }

  return (
    <Slider {...settings} className={classNames(styles['slider_wrapper'], className)}>
      {data.map(({imgSrc, titleImg, slug}, index) =>  
        <div 
          key={index} 
          className={styles['slide_content']} 
          onClick={() => onClick(slug)}
          >
          <div style={{ height: `calc(${mobileHeight}px - 60px)` }}>
            {/* <h1 style={{ color: 'white' }}>{mobileHeight}</h1> */}
            <div className={styles['background_image']} style={{ backgroundImage: `url(${imgSrc})` }} />
            <img src={titleImg} className={styles[currentSlide === index ? 'active' : undefined]} />
          </div>
        </div>
      )}
    </Slider>
  )
}

export default MobileSlider