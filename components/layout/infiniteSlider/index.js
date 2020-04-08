import React, { useState, useEffect, useRef } from 'react'

import { Carousel } from 'react-responsive-carousel'

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

import styles from './styles.scss'


export function InfiniteSlider({data}) {
  const sliderRef = useRef()
  const videoArrayRefs = useRef(data.map(() => React.createRef()))

  const [direction, setDirection] = useState(0)

  const [carouselStyling, setCourselStyling] = useState('flex-start')
  const [sliderTransform, setSliderTransform] = useState('0%')
  const [sliderTransition, setSliderTransition] = useState('all 1s')

  const [currentSlide, setCurrentSlide] = useState(0)

  const directionRef = useRef(direction)


  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.addEventListener('transitionend', function () {
        const {current} = directionRef
        if (current === 1) {
          sliderRef.current.prepend(sliderRef.current.lastElementChild)
        } else {
          sliderRef.current.appendChild(sliderRef.current.firstElementChild)
        }
        setSliderTransition('none')
        setSliderTransform('0%')
        setTimeout(() => {
          setSliderTransition('all 1s')
        }, 100)
      }, false)
    }
  }, [sliderRef])

  function nextClick() {
    const newIndex = currentSlide === 2 ? 0 : currentSlide + 1
    setCurrentSlide(newIndex)
    videoArrayRefs.current[currentSlide].current.pause()
    videoArrayRefs.current[currentSlide].current.currentTime = 0
    videoArrayRefs.current[currentSlide].current.load()
  
    setDirection(-1)
    directionRef.current = -1
    setCourselStyling('flex-start')
    setSliderTransform(`-${100 / data.length}%`)
  }

  function prevClick() {
    const newIndex = currentSlide === 0 ? 2 : currentSlide - 1
    setCurrentSlide(newIndex)
    videoArrayRefs.current[currentSlide].current.pause()
    videoArrayRefs.current[currentSlide].current.currentTime = 0
    videoArrayRefs.current[currentSlide].current.load()
    
    
    if (direction === -1) {
      setDirection(1)
      directionRef.current = 1
      sliderRef.current.appendChild(sliderRef.current.firstElementChild)
    }
    setCourselStyling('flex-end')
    setSliderTransform(`${100 / data.length}%`)
  }

  return (
    <div>

      <div className={styles.container}>
        <button className={styles.prev} onClick={() => prevClick()}><MdKeyboardArrowLeft /></button>
        <button className={styles.next} onClick={() => nextClick()}><MdKeyboardArrowRight /></button>
        <div className={styles.carousel} style={{ justifyContent: carouselStyling }}>
          <div ref={sliderRef} className={styles.slider} style={{ transform: `translate(${sliderTransform})`, transition: sliderTransition }}>
            {data.map(({videoSrc}, index) => 
              <section>
                <video src={videoSrc} autoPlay muted ref={videoArrayRefs.current[index]}  />
                {/* onEnded={() => nextClick()} */}
              </section>
            )}
          </div>
        </div>
</div>



      {/* <Carousel 
        className={styles['desktop_carousel']}
        ref={sliderRef}
        showArrows={true} 
        infiniteLoop={true}
        onChange={onChange} 
        showThumbs={false}
        transitionTime={speed}
        dots={false}
      >
        {data.map(({videoSrc}, index) => 
          <div className={styles['slide_wrapper']} key={index}>
            <video src={videoSrc} autoPlay muted ref={videoArrayRefs.current[index]} onEnded={() => nextSlide(index)} />
          </div>
        )}
      </Carousel> */}

      {/* <Carousel 
        axis="vertical" 
        verticalSwipe="natural" 
        emulateTouch
      >
        {data.map(({videoSrc}, index) => 
          <div className={styles['slide_wrapper']} key={index}>
            <video src={videoSrc} autoPlay muted ref={videoArrayRefs.current[index]} />
          </div>
        )}
      </Carousel> */}
    </div>
  )
}

export default InfiniteSlider