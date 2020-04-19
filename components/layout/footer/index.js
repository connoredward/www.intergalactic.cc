import React, { useState, useEffect } from 'react'

import classNames from 'classnames'

import styles from './styles.scss'

import FB_ICON from '~/static/images/icons/FB_ICON.png'
import IG_ICON from '~/static/images/icons/IG_ICON.png'
import VM_ICOM from '~/static/images/icons/VIMEO_ICON.png'

let wordArray = ['DESIGN STUDIO', 'CREATIVE NETWORK', 'PRODUCTION COMPANY', 'PHOTOGRAPHY AGENCY']

let socialMediaIcons = [
  { href: 'https://www.instagram.com/intergalactic.studios/', icon: IG_ICON },
  { href: 'https://www.facebook.com/studiointergalactic', icon: FB_ICON },
  { href: 'https://vimeo.com/intergalacticstudios', icon: VM_ICOM }
]

function Icons({className}) {
  return (
    <div className={classNames(styles['icon_wrapper'], className)}>
      {socialMediaIcons.map(({href, icon}, index) => 
        <a href={href} target='_blank' key={index}><img src={icon} /></a>
      )}
    </div>
  )
}

export function Footer ({className}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setCount(count >= 3 ? 0 : count + 1), 750)
    return () => clearInterval(id)
  }, [count])

  return (
    <div className={classNames(styles.main, className)}>
      <div className={styles['footer_top_row']}>
        <span>INTERGALACTIC IS A {wordArray[count]}</span>
        <Icons />
      </div>

      <div className={styles['footer_bottom_row']}>
        <div className={styles['footer_description']}>
          <p>We collaborate with artists, brands, labels and agencies to create visuals that are out of this world.</p>
        </div>
        <br/>
        <a className={styles.email} target='_blank' href='mailto:hello@intergalacticstudios.com'>
          <i>Initiate contact:</i>
          &nbsp;
          <span>HELLO</span>@INTERGALACTICSTUDIOS.COM
        </a>
        <br/>
        <div className={styles['footer_contact_info']}>
          <a className={styles.number} href="tel:442086915534">+44 20 8691 5534</a>
          <p className={styles.address}>326a New Cross Road, SE14 6AG</p>
          <p style={{ fontWeight: 'bold' }}>Based in London, available beyond.</p>
          <p>© INTERGALACTIC STUDIOS LTD. 2020</p>
          <Icons className={styles['mobile_icons']} />
        </div>
      </div>
    </div>
  )
}

export default Footer