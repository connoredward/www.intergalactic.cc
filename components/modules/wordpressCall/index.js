import fetch from 'isomorphic-unfetch'

const wordPressUrl = 'https://public-api.wordpress.com/wp/v2/sites/atestdomains.wordpress.com/'

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



export async function wordpressCardApi(page) {
  const categories = await fetch(wordPressUrl + 'categories')
    .then(res => res.json())
  const tags = await fetch(wordPressUrl + 'tags')
    .then(res => res.json())
  const posts = await fetch(wordPressUrl + 'posts')
    .then(res => res.json())

  const catId = categories.find(({name}) => name === page).id
  const bannerId = tags.find(({name}) => name === 'banner').id
    
  return posts.filter((item) => item.categories[0] === catId && item.tags[0] !== bannerId)
    .map((item) => {
      let itemObj = item.content.rendered.split('"')
      let imgIndex = itemObj.findIndex((i) => i === " data-large-file=") + 1
      let videoIndex = itemObj.findIndex((i) => i === "video/mp4") + 2
      return {
        name: item.title.rendered,
        imgSrc: itemObj[imgIndex],
        videoSrc: itemObj[videoIndex]
      }
    }).filter(value => Object.keys(value).length !== 0)
}

export default {
  wordpressCardApi,
  videoBannerApi
}