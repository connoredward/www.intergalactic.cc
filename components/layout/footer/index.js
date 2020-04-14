import React, { useState, useEffect } from 'react'

import classNames from 'classnames'

import styles from './styles.scss'

import FB_ICON from '~/static/images/icons/FB_ICON.png'
import IG_ICON from '~/static/images/icons/IG_ICON.png'
import VM_ICOM from '~/static/images/icons/VIMEO_ICON.png'

let wordArray = ['DESIGN STUDIO', 'CREATIVE NETWORK', 'PRODUCTION COMPANY', 'PHOTOGRAPHY AGENCY']

export function Footer ({className}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setCount(count >= 3 ? 0 : count + 1), 500)
    return () => clearInterval(id)
  }, [count])


  return (
    <div className={classNames(styles.main, className)}>
      <div className={styles['footer_top_row']}>
        <span>INTERGALACTIC IS A {wordArray[count]}</span>

        <div className={styles['icon_wrapper']}>
          <a href='https://www.instagram.com/intergalactic.studios/' target='_blank'>
            <img src={IG_ICON} />
          </a>
          <a href='https://www.facebook.com/studiointergalactic' target='_blank'>
            <img src={FB_ICON} />
          </a>
          <a href='https://vimeo.com/intergalacticstudios' target='_blank'>
            <img src={VM_ICOM} />
          </a>
        </div>
      </div>

      <div className={styles['footer_bottom_row']}>
        <div className={styles['footer_description']}>
          <p>We are a team of super creative filmmakers, photographers, designers, animators.</p>
          <p>We produce eye-popping commercial, music promos, documentaries, narrative fiction.</p>
          <p>We work on awesome brands, labels, artists, agencies.</p>
        </div>
        <br/>
        <a className={styles.email} target='_blank' href='mailto:hello@intergalacticstudios.com'>Click and say&nbsp;<span>HELLO</span>@INTERGALACTICSTUDIOS.COM</a>
        <br/>
        <div className={styles['footer_contact_info']}>
          <p className={styles.number}>+44 20 8691 5534</p>
          <p className={styles.address}>326a New Cross Road, SE14 6AG</p>
          <p style={{ fontWeight: 'bold' }}>Based in London, available beyond.</p>
          <p>© INTERGALACTIC STUDIOS LTD. 2020</p>
        </div>
      </div>
    </div>
  )
}

export default Footer