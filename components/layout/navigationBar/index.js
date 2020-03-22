import React, { useState } from 'react'

import classNames from 'classnames'

import styles from './styles.scss'

import { HamburgerElastic } from 'react-animated-burgers'

import LOGO from '~/static/images/INTERGALACTIC_LOGO_WHITE.png'

export function NavigationBar () {
  const [menuActive, setMenuActive] = useState(false)
  return (
    <div className={styles.main}>
      <img src={LOGO} />
      <div className={classNames(styles['menu_bar'], styles[menuActive ? 'active' : undefined])}>
        <ul>
          <li><a>DIRECTORS</a></li>
          <li><a>MUSIC VIDEOS</a></li>
          <li><a>BRANDED</a></li>
          <li><a>NARRATIVE</a></li>
          <li><a>CONTACT</a></li>
        </ul>
      </div>
      <button onClick={() => setMenuActive(!menuActive)}>
        <HamburgerElastic isActive={menuActive} />
      </button>
    </div>
  )
}

export default NavigationBar