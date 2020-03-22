import React from 'react'

import styles from './styles.scss'

import IMAGE_0 from '~/static/images/catergories/COURTESY_ZOOM.jpg'
import IMAGE_1 from '~/static/images/catergories/NOVELIST.jpg'
import IMAGE_2 from '~/static/images/catergories/CONTENT_THUMBNAIL.jpg'
import IMAGE_3 from '~/static/images/catergories/DARKSTAR.jpg'

import VIDEO_0 from '~/static/videos/catergories/CONTENT_THUMBNAIL.mp4'
import VIDEO_1 from '~/static/videos/catergories/DIRECTORS_THUMBNAIL.mp4'
import VIDEO_2 from '~/static/videos/catergories/MUSIC_VIDEO_THUMBNAIL.mp4'
import VIDEO_3 from '~/static/videos/catergories/NARRATIVE_THUMBNAIL.mp4'

export function CatergoriesBar () {
  return (
    <div className={styles.main}>
      <div className={styles['catergory_wrapper']}>
        <div className={styles['directors_title']}>
          <p>DIR</p>
          <p>ECT</p>
          <p>ORS</p>
        </div>
        <div className={styles.image} style={{ backgroundImage: `url(${IMAGE_0})` }} />
        <div className={styles['video_wrapper']}>
          <video src={VIDEO_1} autoPlay muted loop />
        </div>
      </div>

      <div className={styles['catergory_wrapper']}>
        <div className={styles['content_title']}>
          <div className={styles['title_1']}>
            <span><div>C</div></span>
            <span><div>O</div></span>
            <span><div>N</div></span>
            <span><div>T</div></span>
            <span><div>E</div></span>
            <span><div>N</div></span>
            <span><div>T</div></span>
          </div>
        </div>
        <div className={styles.image} style={{ backgroundImage: `url(${IMAGE_1})` }} />
        <div className={styles['video_wrapper']}>
          <video src={VIDEO_0} autoPlay muted loop />
        </div>
      </div>

      <div className={styles['catergory_wrapper']}>
        <div className={styles['music_videos_title']}>
          <div className={styles['title_1']}>
            <span><div>M</div></span>
            <span><div>U</div></span>
            <span><div>S</div></span>
            <span><div>I</div></span>
            <span><div>C&nbsp;</div></span>
          </div>

          <div className={styles['title_2']}>
            <span><div>V</div></span>
            <span><div>I</div></span>
            <span><div>D</div></span>
            <span><div>E</div></span>
            <span><div>O</div></span>
            <span><div>S</div></span>
          </div>
        </div>

        <div className={styles.image} style={{ backgroundImage: `url(${IMAGE_2})` }} />
        <div className={styles['video_wrapper']}>
          <video src={VIDEO_2} autoPlay muted loop />
        </div>
      </div>

      <div className={styles['catergory_wrapper']}>
        <div className={styles['narrative_title']}>
          <span><div>N</div></span>
          <span><div>A</div></span>
          <span><div>R</div></span>
          <span><div>R</div></span>
          <span><div>A</div></span>
          <span><div>T</div></span>
          <span><div>I</div></span>
          <span><div>V</div></span>
          <span><div>E</div></span>
        </div>
        <div className={styles.image} style={{ backgroundImage: `url(${IMAGE_3})` }} />
        <div className={styles['video_wrapper']}>
          <video className={styles['larger_video']} src={VIDEO_3} autoPlay muted loop />
        </div>
      </div>
    </div>
  )
}

export default CatergoriesBar