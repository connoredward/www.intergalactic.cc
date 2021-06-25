import { useState, useEffect } from 'react'

import NavigationBar from '~/components/layout/navigationBar'
import Footer from '~/components/layout/footer'

import classNames from 'classnames'

import styles from './styles.scss'

export function PageWrapper(props) {
  const { children, active, className, loading = true } = props
  const [screenHeight, setScreenHeight] = useState()

  useEffect(() => {
    if (window) {
      setScreenHeight(window.innerHeight)
      window.addEventListener('resize', () => {
        setScreenHeight(window.innerHeight)
      })
    }
  }, [])

  return (
    <>
      <div className={classNames(styles['page_wrapper'], className)} style={{ minHeight: `${screenHeight}px` }}>
        <NavigationBar active={active} />
        {children}
      </div>
      {loading && (<Footer className={styles['mobile_footer']} />)}
    </>
  )
}

export default PageWrapper