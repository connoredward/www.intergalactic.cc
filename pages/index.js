import { useEffect } from 'react'

import fetch from 'isomorphic-unfetch'

import NavigationBar from '~/components/layout/navigationBar'

import React from 'react' 

export default function MainPage() {
  useEffect(() => {
    onLoad()
  }, [])

  async function onLoad() {
    await fetch('https://public-api.wordpress.com/wp/v2/sites/atestdomains.wordpress.com/posts')
      .then(res => res.json())
      .then(sections =>
        console.log(sections)
      ); 
  }

  return (
    <div>
      <NavigationBar />
    </div>
  )
}

