import React, { useState, useEffect, useRef } from 'react'

// import { Carousel } from 'react-responsive-carousel'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';


import styles from './styles.scss'

export function MobileSlider({data, className}) {
  function nextSlide() {
    console.log('next')
  }

  return (
    <CarouselProvider
      className={className}
      naturalSlideWidth={100}
      naturalSlideHeight={125}
      totalSlides={1}
      orientation='vertical'
    >
      <Slider>
      {data.map(({videoSrc, titleimg}, index) => 
        <Slide key={index}>
          <div className={styles['slide_wrapper']}>
            <img src={titleimg} />
            <video src={videoSrc} autoPlay muted onEnded={() => nextSlide()} />
          </div>
        </Slide>
      )}
      </Slider>
      <ButtonBack>Back</ButtonBack>
      <ButtonNext>Next</ButtonNext>
    </CarouselProvider>
    // <Carousel
    //   axis='vertical'
    //   verticalSwipe='natural'
    //   emulateTouch
    //   className={className}
    // >
    //   {data.map(({videoSrc, titleimg}, index) => 
    //     <div className={styles['slide_wrapper']} key={index}>
    //       <img src={titleimg} />
    //       <video src={videoSrc} autoPlay muted onEnded={() => nextSlide()} />
    //     </div>
    //   )}
    // </Carousel>
  )
}

export default MobileSlider