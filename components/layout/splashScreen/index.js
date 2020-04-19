import classNames from 'classnames'

import styles from './styles.scss'

import LOGO_IMG from '~/static/images/INTERGALACTIC_LOGO_WHITE.png'
import { useEffect, useState } from 'react'

export function SplashScreen ({loading}) {
  const [anim, setAnim] = useState()
  useEffect(() => {
    if (loading) {
      setAnim('fade')
      setTimeout(() => setAnim('hide'), 1000)
    }
  }, [loading])
  return (
    <div className={classNames(styles.main, styles[anim])}>
      <img src={LOGO_IMG} />
    </div>
  )
}

export default SplashScreen