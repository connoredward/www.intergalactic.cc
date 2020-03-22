import React, { useState } from 'react'

import Link from 'next/link'
import classNames from 'classnames'

import styles from './styles.scss'

import { HamburgerElastic } from 'react-animated-burgers'

import LOGO from '~/static/images/INTERGALACTIC_LOGO_WHITE.png'

export function NavigationBar () {
  const [menuActive, setMenuActive] = useState(false)
  return (
    <div className={styles.main}>
      <Link href='/'>
        <img src={LOGO} />
      </Link>
      <div className={classNames(styles['menu_bar'], styles[menuActive ? 'active' : undefined])}>
        <ul>
          <li>
            <Link href='/directors'>
              <a>DIRECTORS</a>
            </Link>
          </li>
          <li>
            <Link href='/music_videos'>
              <a>MUSIC VIDEOS</a>
            </Link>
          </li>
          <li>
            <Link href='/branded'>
              <a>BRANDED</a>
            </Link>
          </li>
          <li>
            <Link href='/narrative'>
              <a>NARRATIVE</a>
            </Link>
          </li>

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