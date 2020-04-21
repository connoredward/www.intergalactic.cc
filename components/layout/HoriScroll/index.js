import { useEffect, useState, useRef } from 'react'

import HorizontalScroll from 'react-scroll-horizontal'

import styles from './styles.scss'

import IMAGE_0 from '~/static/images/test/i0.jpg'
import IMAGE_1 from '~/static/images/test/i1.jpg'
import IMAGE_2 from '~/static/images/test/i2.jpg'
import IMAGE_3 from '~/static/images/test/i3.jpg'
import IMAGE_4 from '~/static/images/test/i4.jpg'
import IMAGE_5 from '~/static/images/test/i5.jpg'
import IMAGE_6 from '~/static/images/test/i6.jpg'
import IMAGE_7 from '~/static/images/test/i7.jpg'

let imgs = [IMAGE_0, IMAGE_1, IMAGE_2, IMAGE_3, IMAGE_4, IMAGE_5, IMAGE_6, IMAGE_7]

export function HoriScroll () {
  return (
    <div className={styles.main}>
      <HorizontalScroll reverseScroll={true}>
        {imgs.map((item, index) => <img key={index} src={item} />)}
      </HorizontalScroll>
    </div>
  )
}

export default HoriScroll