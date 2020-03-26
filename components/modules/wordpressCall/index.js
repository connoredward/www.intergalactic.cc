import fetch from 'isomorphic-unfetch'

const wordPressUrl = 'https://public-api.wordpress.com/wp/v2/sites/atestdomains.wordpress.com/'

function move(array, oldIndex, newIndex) {
  if (newIndex >= array.length) {
    newIndex = array.length - 1
  }
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]) 
  return array
}


async function getWordpressData() {
  return new Promise(async(res, rej) => {
    const categories = await fetch(wordPressUrl + 'categories?per_page=100&_embed=1')
      .then(res => res.json())
    const tags = await fetch(wordPressUrl + 'tags?per_page=100&_embed=1')
      .then(res => res.json())
    const posts = await fetch(wordPressUrl + 'posts?per_page=100&_embed=1')
      .then(res => res.json())
    res({posts, categories, tags})
  })
}

export async function videoBannerApi(page) {
  const categories = await fetch(wordPressUrl + 'categories')
    .then(res => res.json())
  const tags = await fetch(wordPressUrl + 'tags')
    .then(res => res.json())
  const posts = await fetch(wordPressUrl + 'posts')
    .then(res => res.json())

  const catId = categories.find(({name}) => name === page).id
  const bannerId = tags.find(({name}) => name === 'banner').id

  const bannerVideoObj = posts.filter(({categories}) => categories[0] === catId)
    .find(({tags}) => tags[0] === bannerId)
    .content.rendered.split('"')

  const videoIndex = bannerVideoObj.findIndex((i) => i === "video/mp4") + 2
  return bannerVideoObj[videoIndex]
}


export async function getGalleryGrid(page) {
  const {posts, categories, tags} = await getWordpressData()
}


export async function wordpressCardApi(page) {
  const {posts, categories, tags} = await getWordpressData()

  const catId = categories.find(({name}) => name === page + 's').id
  const tagId = tags.find(({name}) => name === page).id
    
  return posts.filter((item) => item.categories[0] === catId || item.tags[0] === tagId)
    .map((item) => {
      let itemObj = item.content.rendered.split('"')
      let imgIndex = itemObj.findIndex((i) => i === " data-large-file=") + 1
      let videoIndex = itemObj.findIndex((i) => i === "video/mp4") + 2
      return {
        name: item.title.rendered,
        desc: item.excerpt.rendered,
        imgSrc: itemObj[imgIndex],
        titleImg: item._embedded && item._embedded['wp:featuredmedia'] ? item._embedded['wp:featuredmedia'][0].source_url : undefined, 
        videoSrc: itemObj[videoIndex]
      }
    }).filter(value => Object.keys(value).length !== 0)
}

export async function getDirector(director) {
  const {tags, posts} = await getWordpressData()

  const tagId = tags.find(({name}) => name === director.split('-').join(' ')).id
  const postsFil = posts 
    .filter(({tags}) => {
      return tags.includes(tagId)
    })
    .map((item) => {
      let itemObj = item.content.rendered.split('"')
      let imgIndex = itemObj.findIndex((i) => i === " data-large-file=") + 1
      let videoIndex = itemObj.findIndex((i) => i === "video/mp4") + 2
      if (item.tags.find(tagI => tagI !== tagId)) return {
        name: item.title.rendered,
        titleImg: item._embedded && item._embedded['wp:featuredmedia'] ? item._embedded['wp:featuredmedia'][0].source_url : undefined, 
      }
      return {
        name: item.title.rendered,
        desc: item.excerpt.rendered,
        imgSrc: itemObj[imgIndex],
        titleImg: item._embedded && item._embedded['wp:featuredmedia'] ? item._embedded['wp:featuredmedia'][0].source_url : undefined, 
        videoSrc: itemObj[videoIndex]
      }
    })
  return move(postsFil, postsFil.findIndex((i) => !i.videoSrc), 0)
}

export default {
  wordpressCardApi,
  videoBannerApi,
  getGalleryGrid
}