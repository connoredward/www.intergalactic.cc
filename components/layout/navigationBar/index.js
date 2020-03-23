import React, { useState } from 'react'

import Link from 'next/link'
import classNames from 'classnames'
import { HamburgerElastic } from 'react-animated-burgers'

import Footer from '~/components/layout/footer'

import styles from './styles.scss'

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
            <Link href='/content'>
              <a>CONTENT</a>
            </Link>
          </li>
          <li>
            <Link href='/narrative'>
              <a>NARRATIVE</a>
            </Link>
          </li>
          <li>
            <a onClick={() => window.scrollTo(0,document.body.scrollHeight)}>CONTACT</a>
          </li>
        </ul>
        <Footer className={styles['mobile_footer']} />
      </div>
      <HamburgerElastic 
        className={styles[menuActive ? 'active' : undefined]} 
        isActive={menuActive} 
        onClick={() => setMenuActive(!menuActive)} 
      />
    </div>
  )
}

export default NavigationBar