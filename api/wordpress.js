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





export async function getDataTest() {
  const {posts, tags, categories} = await getWordpressData()
  console.log('post', posts)
  console.log('tags', tags)
  console.log('categories', categories)
}

export async function getHome() {
  const {posts, categories} = await getWordpressData()
  const categoryId = categories.find(({slug}) => slug === 'home').id
  
  return posts
    .filter(({categories}) => categories
    .includes(categoryId))
    .map(({slug, title, tags, categories, acf}) => { return {
      slug, 
      title: title.rendered,
      tags,
      categories,
      videoSrc: acf['Video Media'].url,
      imgSrc: acf['Image Media'].url,
      imgTitleSrc: acf['Image Title'].url,
      vimeoUrl: acf['Vimeo Url'],
      projectClient: acf['Project Client'],
      filmAndDirector: acf['Film And Director'],
      extraInfo: acf['Extra Info'],
      gridRow: parseInt(acf['Grid Row']),
      gridColumn: parseInt(acf['Grid Column'])
    }})
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
  getDataTest,
  getHome,
  getVimeoModalUrl
}