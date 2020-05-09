import fetch from 'isomorphic-unfetch'
import { pageview } from 'react-ga'

const wordpressUrl = 'https://public-api.wordpress.com/wp/v2/sites/intergalacticcms.wordpress.com/'

async function getWordpressData({pSlug, pTags, pageNumber}) {
  return new Promise(async(res, rej) => {
    const categories = await fetch(wordpressUrl + `categories?slug=${pSlug}&per_page=100&_embed=1`)
      .then(res => res.json())
    const tags = await fetch(wordpressUrl + `tags?slug=${pTags}&per_page=100&_embed=1`)
      .then(res => res.json())
    const posts = await fetch(wordpressUrl + `posts?${!tags[0] ? `categories=${categories[0].id}` : `tags=${tags[0].id}`}&page=${pageNumber}&per_page=10&_embed=1`)
      .then(res => res.json())

    res({ posts, categories, tags })
  })
}

const dataStruc = ({slug, title, tags, categories, acf}) => {
  return {
    slug,
    title: title.rendered,
    tags,
    categories,
    videoSrc: acf['Video Media'].url,
    imgSrc: acf['Image Media'].url,
    imgTitleSrc: acf['Image Title'].url,
    gridRow: parseInt(acf['Grid Row']),
    gridColumn: parseInt(acf['Grid Column'])
  }
}

export async function getSubPage({pTags, pageNumber}) {
  const {posts} = await getWordpressData({pTags, pageNumber})
  if (posts.data?.status === 400) return undefined
  return posts .map(item => dataStruc(item))
}

export async function getPage({pSlug, pageNumber}) {
  const {posts} = await getWordpressData({pSlug, pageNumber})
  if (posts.data?.status === 400) return undefined
  return posts.map(item => dataStruc(item))
}

export async function getVimeoModalUrl(slug) {
  const f = await fetch(wordpressUrl + `posts?slug=${slug}`)
    .then(res => res.json())
  return {
    src: f[0].acf['Vimeo Url'],
    projectClient: f[0].acf['Project Client'],
    filmAndDirector: f[0].acf['Film And Director'],
    extraInfo: f[0].acf['Extra Info'],
    type: f[0].acf.videoType
  }
}

async function photoUrl(id) {
  return new Promise(async(res, rej) => {
    const url = await fetch(`https://intergalacticcms.wpcomstaging.com/wp-json/wp/v2/media/${id}`)
      .then(res => res.json())
      
    res(url.source_url)
  })
}

export async function getPhotos(pSlug) {
  const post = await fetch(wordpressUrl + `posts?slug=${pSlug}`)
    .then(res => res.json())
  return await Promise.all(
    post[0]?.x_metadata.gallery.split(',').map((i) => photoUrl(i))
  )
}

export default {
  getPage,
  getSubPage,
  getVimeoModalUrl,
  getPhotos
}
