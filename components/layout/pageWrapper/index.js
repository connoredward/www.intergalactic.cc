import NavigationBar from '~/components/layout/NavigationBar'
import Footer from '~/components/layout/footer'

export function PageWrapper({ children }) {
  return (
    <>
      <NavigationBar />
      {children}
      <Footer />
    </>
  )
}

export default PageWrapper