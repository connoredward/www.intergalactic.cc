import { useEffect, useState } from 'react'

import classNames from 'classnames'

import styles from './styles.scss'

import LOGO_IMG from '~/static/images/CHROME_SILVER_LOGO.png'

export function SplashScreen ({loading}) {
  const [mobileHeight, setMobileHeight] = useState()
  const [anim, setAnim] = useState()

  useEffect(() => {
    if (window) {
      setMobileHeight(window.innerHeight)
      window.addEventListener('resize', function () {
        setMobileHeight(window.innerHeight)
      })
    }
    if (loading) {
      setAnim('fade')
      setTimeout(() => setAnim('hide'), 1000)
    }
  }, [loading])
  
  return (
    <div className={classNames(styles.main, styles[anim])} style={{ height: `${mobileHeight}px` }}>
      <img src={LOGO_IMG} className={styles[anim]} />
    </div>
  )
}

export default SplashScreen