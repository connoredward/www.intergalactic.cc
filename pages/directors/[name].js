export function SubDirectorPage ({ slug }) {
  console.log('name', slug)
  return (
    <div>
      {slug}
    </div>
  )
}

SubDirectorPage.getInitialProps = async ({ query }) => {
  return { slug: query.name }
}

export default SubDirectorPage