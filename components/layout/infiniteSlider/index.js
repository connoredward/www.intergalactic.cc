import {useState, useEffect, useRef} from 'react'

import RightArrow from '~/static/right_arrow.svg'
import LeftArrow from '~/static/left_arrow.svg'

import styles from './styles.scss'

export function InfiniteSlider({data, onClick}) {
  const sliderRef = useRef()
  const videoArrayRefs = useRef(data.map(() => React.createRef()))

  const [direction, setDirection] = useState(-1)
  const directionRef = useRef(direction)

  const [carouselStyling, setCourselStyling] = useState('flex-start')
  const [sliderTransform, setSliderTransform] = useState('0%')
  const [sliderTransition, setSliderTransition] = useState('all 1s')

  const [currentSlide, setCurrentSlide] = useState(0)

  const [blockNext, setBlockNext] = useState(false)

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.addEventListener('transitionend', () => {
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
      const newIndex = currentSlide === data.length - 1 ? 0 : currentSlide + 1
      setTimeout(() => setCurrentSlide(newIndex),1000)
      videoPlayBack(newIndex)

      if (direction === 1) {
        sliderRef.current.prepend(sliderRef.current.lastElementChild)
      }
      
      setDirection(-1)
      directionRef.current = -1
      setCourselStyling('flex-start')
      setSliderTransform(`-${100 / data.length}%`)
    }
  }

  function prevClick() {
    if (!blockNext) {
      const newIndex = currentSlide === 0 ? data.length - 1 : currentSlide - 1
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
    <div className={styles.container}>
      <button className={styles.prev} onClick={prevClick}>
        <img src={LeftArrow} style={{ width: '30px', height: '25px' }} />
      </button>
      <button className={styles.next} onClick={nextClick}>
        <img src={RightArrow} style={{ width: '30px', height: '25px' }} />
      </button>
      <div className={styles.carousel} style={{ justifyContent: carouselStyling }}>
        <div ref={sliderRef} className={styles.slider} 
          style={{ transform: `translate(${sliderTransform})`, transition: sliderTransition, width: `${data.length}00%` }}
        >
          {data.map(({videoSrc, imgTitleSrc, slug}, index) => 
            <section key={index}>
              <img src={imgTitleSrc} className={styles[currentSlide === index ? 'active' : undefined]} onClick={() => onClick(slug)} />
              <video src={videoSrc} autoPlay muted ref={videoArrayRefs.current[index]} onEnded={nextClick} />
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

export default InfiniteSlider