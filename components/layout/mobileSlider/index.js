import { useState, useEffect } from 'react'

import Slider from 'react-slick'
import classNames from 'classnames'

import styles from './styles.scss'


export function MobileSlider({data, className, onClick}) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [height, setHeight] = useState()

  useEffect(() => {
    if (window) {
      setHeight(window.innerHeight)
      window.addEventListener('resize', function () {
        setHeight(window.innerHeight)
      })
    }
  }, [])

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    afterChange: afterChange,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500
  }

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
          <div style={{ height: `calc(${height}px - 60px)` }}>
            <div className={styles['background_image']} style={{ backgroundImage: `url(${imgSrc})` }} />
            <img src={titleImg} className={styles[currentSlide === index ? 'active' : undefined]} />
          </div>
        </div>
      )}
    </Slider>
  )
}

export default MobileSlider