import React, { useState, useEffect, useRef } from 'react'

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import classNames from 'classnames'

import styles from './styles.scss'

export function InfiniteSlider({data, className, onClick}) {
  const sliderRef = useRef()
  const videoArrayRefs = useRef(data.map(() => React.createRef()))

  const [direction, setDirection] = useState(0)
  const directionRef = useRef(direction)

  const [carouselStyling, setCourselStyling] = useState('flex-start')
  const [sliderTransform, setSliderTransform] = useState('0%')
  const [sliderTransition, setSliderTransition] = useState('all 1s')

  const [currentSlide, setCurrentSlide] = useState(0)

  const [blockNext, setBlockNext] = useState(false)

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.addEventListener('transitionend', function () {
        const {current} = directionRef
        if (current === 1) {
          sliderRef.current.prepend(sliderRef.current.lastElementChild)
        } else {
          sliderRef.current.appendChild(sliderRef.current.firstElementChild)
        }
        setBlockNext(true)
        setSliderTransition('none')
        setSliderTransform('0%')
        setTimeout(() => setSliderTransition('all 1s'), 100)
        setTimeout(() => setBlockNext(false) ,1000)
      })
    }
  }, [sliderRef])

  function videoPlayBack(index) {
    videoArrayRefs.current[index].current.pause()
    videoArrayRefs.current[index].current.currentTime = 0
    videoArrayRefs.current[index].current.load()
  }

  function nextClick() {
    if (!blockNext) {
      const newIndex = currentSlide === 2 ? 0 : currentSlide + 1
      setTimeout(() => setCurrentSlide(newIndex),1000)
      videoPlayBack(newIndex)
      
      setDirection(-1)
      directionRef.current = -1
      setCourselStyling('flex-start')
      setSliderTransform(`-${100 / data.length}%`)
    }
  }

  function prevClick() {
    if (!blockNext) {
      const newIndex = currentSlide === 0 ? 2 : currentSlide - 1
      setTimeout(() => setCurrentSlide(newIndex),1000)
      videoPlayBack(newIndex)
      
      if (direction === -1) {
        setDirection(1)
        directionRef.current = 1
        sliderRef.current.appendChild(sliderRef.current.firstElementChild)
      }
      setCourselStyling('flex-end')
      setSliderTransform(`${100 / data.length}%`)
    }
  }

  return (
    <div className={classNames(styles.container, className)}>
      <button className={styles.prev} onClick={() => prevClick()}><MdKeyboardArrowLeft /></button>
      <button className={styles.next} onClick={() => nextClick()}><MdKeyboardArrowRight /></button>
      <div className={styles.carousel} style={{ justifyContent: carouselStyling }}>
        <div ref={sliderRef} className={styles.slider} 
          style={{ transform: `translate(${sliderTransform})`, transition: sliderTransition, width: `${data.length}00%` }}
        >
          {data.map(({videoSrc, titleImg, slug}, index) => 
            <section key={index} onClick={() => onClick(slug)}>
              <img src={titleImg} className={styles[currentSlide === index ? 'active' : undefined]} />
              <video src={videoSrc} autoPlay muted ref={videoArrayRefs.current[index]} onEnded={() => nextClick()} />
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

export default InfiniteSlider