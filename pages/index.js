import { useEffect } from 'react'

import fetch from 'isomorphic-unfetch'

import PageWrapper from '~/components/layout/pageWrapper'
import VideoCorousel from '~/components/layout/videoCarousel'
import CatergoriesBar from '~/components/layout/catergoriesBar'

import React from 'react' 

export default function MainPage() {
  useEffect(() => {
    onLoad()
  }, [])

  async function onLoad() {
    await fetch('https://public-api.wordpress.com/wp/v2/sites/atestdomains.wordpress.com/posts')
      .then(res => res.json())
      .then(sections => {
        console.log('sections', sections[0].content.rendered.split('"'))
        const imageIndex = sections[0].content.rendered.split('"').findIndex((item) => item === " data-large-file=") + 1
        console.log('image url', sections[0].content.rendered.split('"')[imageIndex])
      }
      ); 
  }

  return (
    <PageWrapper>
      <VideoCorousel />
      <CatergoriesBar />
    </PageWrapper>
  )
}

{/* <figure class="wp-block-image size-large is-resized">
  <img data-attachment-id="44" 
    data-permalink="https://atestdomains.wordpress.com/89917231_553869125484964_6596369416403812352_n-2/" 
    data-orig-file="https://atestdomains.files.wordpress.com/2020/03/89917231_553869125484964_6596369416403812352_n-2.png" 
    data-orig-size="334,403" 
    data-comments-opened="1" 
    data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" 
    data-image-title="89917231_553869125484964_6596369416403812352_n-2" data-image-description="" 
    data-medium-file="https://atestdomains.files.wordpress.com/2020/03/89917231_553869125484964_6596369416403812352_n-2.png?w=249" 
    data-large-file="https://atestdomains.files.wordpress.com/2020/03/89917231_553869125484964_6596369416403812352_n-2.png?w=334" 
    src="https://atestdomains.files.wordpress.com/2020/03/89917231_553869125484964_6596369416403812352_n-2.png?w=334" 
    alt="" 
    class="wp-image-44" 
    width="474" 
    height="572" 
    srcset="https://atestdomains.files.wordpress.com/2020/03/89917231_553869125484964_6596369416403812352_n-2.png 334w, https://atestdomains.files.wordpress.com/2020/03/89917231_553869125484964_6596369416403812352_n-2.png?w=124 124w, https://atestdomains.files.wordpress.com/2020/03/89917231_553869125484964_6596369416403812352_n-2.png?w=249 249w" sizes="(max-width: 474px) 100vw, 474px" 
  />
</figure> */}
