import React, { useState, useEffect } from 'react'

import styles from './styles.scss'

import FB_ICON from '~/static/images/icons/FB_ICON.png'
import IG_ICON from '~/static/images/icons/IG_ICON.png'
import VM_ICOM from '~/static/images/icons/VIMEO_ICON.png'

let wordArray = ['DESIGN STUDIO', 'CREATIVE NETWORK', 'PRODUCTION COMPANY', 'PHOTOGRAPHY AGENCY']

export function Footer () {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setCount(count >= 3 ? 0 : count + 1), 500)
    return () => clearInterval(id)
  }, [count])


  return (
    <div className={styles.main}>
      <div className={styles['footer_top_row']}>
        <span>INTERGALACTIC IS A {wordArray[count]}</span>
        <p>Based in London, available beyond.</p>

        <div className={styles['icon_wrapper']}>
          <a href='https://www.facebook.com/studiointergalactic' target='_blank'>
            <img src={FB_ICON} />
          </a>
          <a href='https://www.instagram.com/intergalacticstudio/' target='_blank'>
            <img src={IG_ICON} />
          </a>
          <a href='https://vimeo.com/intergalacticstudio' target='_blank'>
            <img src={VM_ICOM} />
          </a>
        </div>
      </div>

      <div className={styles['footer_bottom_row']}>
        <span>HELLO@INTERGALACTIC.COM</span>
        <span className={styles.address}>326a New Cross Road, SE14 6AG</span>
      </div>
    </div>
  )
}

export default Footer