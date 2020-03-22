export function SubBrandPage ({ slug }) {
  console.log('name', slug)
  return (
    <div>
      {slug}
    </div>
  )
}

SubBrandPage.getInitialProps = async ({ query }) => {
  return { slug: query.name }
}

export default SubBrandPage