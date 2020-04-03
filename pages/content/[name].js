export function SubContentPage ({ slug }) {
  return (
    <div>
      {slug}
    </div>
  )
}

SubContentPage.getInitialProps = async ({ query }) => {
  return { slug: query.name }
}

export default SubContentPage