import NavigationBar from '~/components/layout/navigationBar'
import Footer from '~/components/layout/footer'

export function PageWrapper({ children, active }) {
  return (
    <>
      <NavigationBar active={active} />
      {children}
      <Footer />
    </>
  )
}

export default PageWrapper