import React from 'react'

export function Product ({ slug }) {
  console.log('name', slug)
  return (
    <div>
      {slug}
    </div>
  )
}

Product.getInitialProps = async ({ query }) => {
  return { slug: query.name }
}

export default Product