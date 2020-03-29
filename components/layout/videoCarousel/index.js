import React, { useState, useEffect, useRef } from 'react'

import styles from './styles.scss'

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

export function VideoCarousel ({data}) {
  const [currentVideo, setCurrentVideo] = useState()

  const videoArrayRefs = useRef(data.map(() => React.createRef()))

  useEffect(() => {
    setCurrentVideo(0)
  }, [])

  function previousVideo() {
    const index = currentVideo <= 0 ? 3 : currentVideo - 1
    videoArrayRefs.current[index].current.currentTime = 0
    videoArrayRefs.current[index].current.pause()
    videoArrayRefs.current[index].current.load()
    setCurrentVideo(index)
  }

  function nextVideo() {
    const index = currentVideo >= data.length - 1 ? 0 : currentVideo + 1
    videoArrayRefs.current[index].current.pause()
    videoArrayRefs.current[index].current.currentTime = 0
    videoArrayRefs.current[index].current.load()
    setTimeout(() => {
      setCurrentVideo(index)
    }, 10)
  }

  return (
    <div className={styles.main}> 
      <button 
        className={styles.prev} 
        onClick={() => previousVideo()}
      >
        <MdKeyboardArrowLeft />
      </button>
      <button 
        className={styles.next} 
        onClick={() => nextVideo()}
      >
        <MdKeyboardArrowRight />
      </button>

      {currentVideo >= 0 && (
        <div className={styles['video_slider_wrapper']}>
          <div 
            className={styles['current_slide']} 
            style={{ transform: `translateX(-${100/data.length*currentVideo}%)`, width: `${data.length}00%` }}
          >
            {data.map(({titleImg, videoSrc}, index) => 
              <div className={styles['slide_wrapper']} key={index}>
                <div className={styles['slide_content']}>
                  <img src={titleImg} />
                </div>
                <div className={styles['video_container']}>
                  <video
                    src={videoSrc}
                    autoPlay
                    muted
                    ref={videoArrayRefs.current[index]}
                    onEnded={() => nextVideo()} 
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default VideoCarousel