import NavigationBar from '~/components/layout/navigationBar'
import Footer from '~/components/layout/footer'

import styles from './styles.scss'

export function PageWrapper({ children, active }) {
  return (
    <>
      <div className={styles['page_wrapper']}>
        <NavigationBar active={active} />
        {children}
      </div>
      <Footer />
    </>
  )
}

export default PageWrapper