import React, { useState, useEffect, useRef } from 'react'

import Slider from 'react-slick'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import classNames from 'classnames'

import styles from './styles.scss'

const settings = {
  dots: false,
  // infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: null,
  prevArrow: null
};


export function VideoCarousel ({data, onClick}) {
  const [currentVideo, setCurrentVideo] = useState()
  const [imgAnim, setImgAnim] = useState()

  const sliderRef = useRef()
  const videoArrayRefs = useRef(data.map(() => React.createRef()))

  useEffect(() => {
    setCurrentVideo(0)
    setTimeout(() => setImgAnim(0) , 1000)
    
  }, [])

  function restartVideo(index) {
    videoArrayRefs.current[index].current.pause()
    videoArrayRefs.current[index].current.currentTime = 0
    videoArrayRefs.current[index].current.load()
  }

  function nextSlide () {
    restartVideo(currentVideo >= data.length - 1 ? 0 : currentVideo + 1)
    sliderRef.current.slickNext()
  }

  function prevSlide () {
    restartVideo(currentVideo <= 0 ? data.length - 1 : currentVideo - 1)
    sliderRef.current.slickPrev()
  }

  return (
    <div className={styles.main}> 
      <button 
        className={styles.prev} 
        onClick={() => prevSlide()}
      >
        <MdKeyboardArrowLeft />
      </button>
      <button 
        className={styles.next} 
        onClick={() => nextSlide()}
      >
        <MdKeyboardArrowRight />
      </button>
      {currentVideo >= 0 && (
        <div className={styles['video_slider_wrapper']}>
          <Slider {...settings} ref={sliderRef} afterChange={a => setImgAnim(a)}>
            {data.map(({videoSrc, titleImg, slug}, index) => 
              <div className={styles['slide_content_wrapper']} key={index} onClick={() => onClick(slug)}>
                <img className={styles[imgAnim === index ? 'active' : undefined]} src={titleImg} />
                <video 
                  src={videoSrc} 
                  ref={videoArrayRefs.current[index]} 
                  onEnded={() => nextSlide()}
                  autoPlay muted 
                />
              </div>
            )}
          </Slider>
        </div>
      )}
    </div>
  )
}

export default VideoCarousel