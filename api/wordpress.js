import fetch from 'isomorphic-unfetch'

const wordpressUrl = 'https://public-api.wordpress.com/wp/v2/sites/intergalacticcms.wordpress.com/'

async function getWordpressData() {
  return new Promise(async(res, rej) => {
    const categories = await fetch(wordpressUrl + 'categories?per_page=100&_embed=1')
      .then(res => res.json())
    const tags = await fetch(wordpressUrl + 'tags?per_page=100&_embed=1')
      .then(res => res.json())
    const posts = await fetch(wordpressUrl + 'posts?per_page=100&_embed=1')
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

export async function getSubPage(dSlug) {
  const newSlug = dSlug.replace(/\-/g, ' ')
  console.log(newSlug)
  const {posts, tags, categories} = await getWordpressData()
  const directorTagId = tags.find(({name}) => name === newSlug)?.id

  return posts 
    .filter(({tags}) => tags.includes(directorTagId))
    .map(item => dataStruc(item))
}

export async function getPage(pSlug) {
  const {posts, categories} = await getWordpressData()
  const categoryId = categories.find(({slug}) => slug === pSlug)?.id

  return posts
    .filter(({categories}) => categories.includes(categoryId))
    .map(item => dataStruc(item))
}

export async function getVimeoModalUrl (slug) {
  const {posts} = await getWordpressData()
  const f = posts.find((item) => item.slug === slug)
  return {
    src: f.acf['Vimeo Url'],
    projectClient: f.acf['Project Client'],
    filmAndDirector: f.acf['Film And Director'],
    extraInfo: f.acf['Extra Info']
  }
}

export default {
  getPage,
  getSubPage,
  getVimeoModalUrl
}