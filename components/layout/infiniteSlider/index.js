import React, { useState, useEffect, useRef } from 'react'

import Slider from 'react-slick'

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
}

export function InfiniteSlider({data}) {
  const sliderRef = useRef()
  const videoArrayRefs = useRef(data.map(() => React.createRef()))

  function nextSlide() {
    videoArrayRefs.current[0].current.play()
    sliderRef.current.slickNext()
  }
  


  return (
    <div>
      <button onClick={() => nextSlide()}>next</button>
      <Slider {...settings} ref={sliderRef}>
        <video src={data[0].videoSrc} ref={videoArrayRefs.current[0]} autoPlay muted /> 
        <video src={data[1].videoSrc} ref={videoArrayRefs.current[1]} autoPlay muted />
        {/* {data.map(({videoSrc}, index) => <video key={index} src={videoSrc} ref={videoArrayRefs.current[index]} autoPlay muted />)} */}
      </Slider>
    </div>
  )
}

export default InfiniteSlider