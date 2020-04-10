import NavigationBar from '~/components/layout/navigationBar'
import Footer from '~/components/layout/footer'

import classNames from 'classnames'

import styles from './styles.scss'

export function PageWrapper({ children, active, className }) {
  return (
    <>
      <div className={classNames(styles['page_wrapper'], className)}>
        <NavigationBar active={active} />
        {children}
      </div>
      <Footer className={styles['mobile_footer']} />
    </>
  )
}

export default PageWrapper