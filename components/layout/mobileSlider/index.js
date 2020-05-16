import { useState, useEffect } from 'react'

import Slider from 'react-slick'
import classNames from 'classnames'

import styles from './styles.scss'


export function MobileSlider({data, className, onClick}) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [height, setHeight] = useState()

  const [showImage, setShowImage] = useState(false)

  useEffect(() => {
    if (window) {
      setHeight(`calc(${window.innerHeight}px - 60px)`)
      if(navigator?.userAgent.includes('Instagram')){
        setShowImage(true)
      } else {  
        window.addEventListener('resize', () => {
          setHeight(`calc(${window.innerHeight}px - 60px)`)
        })
      }
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
    autoplaySpeed: 5000,
    speed: 500
  }

  function afterChange(currentSlide) {
    setCurrentSlide(currentSlide)
  }

  return (
    <Slider {...settings} className={classNames(styles['slider_wrapper'], className)}>
      {data.map(({imgSrc, imgTitleSrc, slug}, index) =>  
        <div 
          key={index} 
          className={styles['slide_content']} 
        >
          <div style={{ height: height }}>
            <div className={styles['background_image']} style={{ backgroundImage: `url(${imgSrc})` }} />
            <img 
              onClick={() => onClick(slug)}
              src={imgTitleSrc} 
              className={styles[currentSlide === index || showImage ? 'active' : undefined]} 
            />
          </div>
        </div>
      )}
    </Slider>
  )
}

export default MobileSlider