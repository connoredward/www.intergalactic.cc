import React, { useState } from 'react'

import Link from 'next/link'
import classNames from 'classnames'
import { HamburgerElastic } from 'react-animated-burgers'
import * as Scroll from 'react-scroll'

import Footer from '~/components/layout/footer'

import styles from './styles.scss'

import LOGO from '~/static/images/INTERGALACTIC_LOGO_WHITE.png'

const links = [
  {name: 'DIRECTORS', link: '/directors'},
  {name: 'MUSIC VIDEOS', link: '/music_videos'},
  {name: 'CONTENT', link: '/content'},
  {name: 'NARRATIVE', link: '/narrative'}
]
const scroll = Scroll.animateScroll

export function NavigationBar (props) {
  const {
    active = ''
  } = props
  const [menuActive, setMenuActive] = useState(false)
  return (
    <div className={styles.main}>
      {/* desktop navigation */}
      <div className={styles['menu_bar_desktop']}>
        <Link href='/'>
          <img src={LOGO} />
        </Link>
        <div className={styles['menu_content']}>
          <ul>
            {links.map(({name, link}, index) => 
              <li key={index}>
                <Link href={link}>
                  <div className={styles['link_wrapper']}>
                    <a>{name}</a>
                    <span className={styles[active === name.toLowerCase() ? 'active' : undefined]}>{name}</span>
                  </div>
                </Link>
              </li>
            )}
            <li onClick={() => scroll.scrollToBottom()}>
              <span>CONTACT</span>
              <a>CONTACT</a>
            </li>
          </ul>
        </div>
      </div>


      {/* mobile navigation */}
      <div className={styles['menu_bar_mobile']}>
        <Link href='/'>
          <img src={LOGO} />
        </Link>
        <div className={classNames(styles['menu_bar'], styles[menuActive ? 'active' : undefined])}>
          <ul>
            {links.map(({name, link}, index) => 
              <li key={index}>
                <Link href={link}>
                  <a style={{ color: active === name.toLowerCase() ? 'red' : '' }}>{name}</a>
                </Link>
              </li>
            )}
          </ul>
          <Footer className={styles['mobile_footer']} />
        </div>
        <HamburgerElastic 
          className={styles[menuActive ? 'active' : undefined]} 
          isActive={menuActive} 
          onClick={() => setMenuActive(!menuActive)} 
        />
      </div>
    </div>
  )
}

export default NavigationBar