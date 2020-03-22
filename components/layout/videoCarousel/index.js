import React, { useState, useEffect, useRef } from 'react'

import classNames from 'classnames'

import styles from './styles.scss'

import VIDEO_0 from '~/static/videos/homeCarousel/BAD_HONEY.mp4'
import VIDEO_1 from '~/static/videos/homeCarousel/DE_JA_LOOP.mp4'
import VIDEO_2 from '~/static/videos/homeCarousel/POLKA_DOTS.mp4'
import VIDEO_3 from '~/static/videos/homeCarousel/YASHI.mp4'

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

let videoArray = [
  {src: VIDEO_0, title: 'BAD HONEY', desc: (<><span style={{ fontFamily: 'New Times Roman' }}>"Easily"</span> by TOM RINGSBY</>)},
  {src: VIDEO_1, title: 'LIL SILVA', desc: (<><span style={{ fontFamily: 'New Times Roman' }}>"Do Ja"</span> by MATT HALSALL</>)},
  {src: VIDEO_2, title: 'YASHA', desc: (<><span style={{ fontFamily: 'New Times Roman' }}>"Max 95, Donnin"</span> by SIMON HALSALL</>)},
  {src: VIDEO_3, title: 'BITE THE BUFFALO', desc: (<><span style={{ fontFamily: 'New Times Roman' }}>"Polka Dots"</span> by RHORY DANNIELLS</>)}
]

export function VideoCarousel () {
  const [currentVideo, setCurrentVideo] = useState()

  const videoArrayRefs = useRef(videoArray.map(() => React.createRef()))

  useEffect(() => {
    setCurrentVideo(0)
  }, [])

  function previousVideo() {
    let index = currentVideo <= 0 ? 3 : currentVideo - 1
    videoArrayRefs.current[index].current.currentTime = 0
    videoArrayRefs.current[index].current.pause()
    videoArrayRefs.current[index].current.load()
    setCurrentVideo(index)
  }

  function nextVideo() {
    let index = currentVideo >= videoArray.length - 1 ? 0 : currentVideo + 1
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
            style={{ transform: `translateX(-${100/videoArray.length*currentVideo}%)`, width: `${videoArray.length}00%` }}
          >
            {videoArray.map(({src, title, desc}, index) => 
              <div className={styles['slide_wrapper']}>
                <div className={styles['slide_content']}>
                  <h1>{title}</h1>
                  <h1>{desc}</h1>
                </div>
                <div className={styles['video_container']}>
                  <video
                    src={src}
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