import React, { useState } from 'react'

import Link from 'next/link'
import classNames from 'classnames'
import { HamburgerElastic } from 'react-animated-burgers'

import Footer from '~/components/layout/footer'

import styles from './styles.scss'

import LOGO from '~/static/images/INTERGALACTIC_LOGO_WHITE.png'

const links = [
  {name: 'FEATURED WORK', link: '/featured_work'},
  {name: 'DIRECTORS', link: '/directors'},
  {name: 'MUSIC VIDEOS', link: '/music_videos'},
  {name: 'CONTENT', link: '/content'},
  {name: 'NARRATIVE', link: '/narrative'}
]

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
                  <a className={styles[active === name.toLowerCase() ? 'active' : undefined]}>{name}</a>
                  {/* <a style={{ color: active === name.toLowerCase() ? 'red' : '', fontWeight: 600 }}>{name}</a> */}
                </Link>
              </li>
            )}
            <li>
              <a onClick={() => window.scrollTo(0,document.body.scrollHeight)}>CONTACT</a>
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