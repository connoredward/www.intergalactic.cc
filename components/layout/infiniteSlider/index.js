import React, { useState, useEffect, useRef } from 'react'

import { Carousel } from 'react-responsive-carousel'

export function InfiniteSlider({data}) {
  const sliderRef = useRef()
  const videoArrayRefs = useRef(data.map(() => React.createRef()))
  
  function onChange(index,b,c) {
    videoArrayRefs.current[0].current.pause()
    console.log(videoArrayRefs.current[0].current)
    console.log('index', index)
    console.log(videoArrayRefs)
    videoArrayRefs.current[index].current.pause()
    videoArrayRefs.current[index].current.currentTime = 0
    videoArrayRefs.current[index].current.load()
  }
  function onClickItem(a,b,c) {
    console.log(a,b,c)
  }
  function onClickThumb(a,b,c) {
    console.log(a,b,c)
  }

  return (
    <Carousel 
      showArrows={true} 
      infiniteLoop={true}
      onChange={onChange} 
      showThumbs={false}
      // onClickItem={onClickItem} 
      // onClickThumb={onClickThumb}
    >
      {data.map(({videoSrc}, index) => 
        <div key={index}>
          <video src={videoSrc} autoPlay muted ref={videoArrayRefs.current[index]} />
        </div>
      )}
    </Carousel>
  )
}

export default InfiniteSlider