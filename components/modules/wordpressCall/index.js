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

export async function getHomePageVideos() {
  const {posts, categories} = await getWordpressData()
  const catId = categories.find(({name}) => name === 'home').id 
  return posts.filter(({categories}) => categories.includes(catId))
    .map((item) => {
      return {
        titleImg: item._embedded && item._embedded['wp:featuredmedia'] ? item._embedded['wp:featuredmedia'][0].source_url : undefined,
        videoSrc: item.content.rendered.match(/\bhttps?:\/\/\S+/gi)[0].split('"')[0]
      }
    })
}

export async function wordpressCardApi(page) {
  const {posts, categories, tags} = await getWordpressData()
  const catId = categories.find(({name}) => name === page) ? categories.find(({name}) => name === page).id : 'NOT_FOUND'
  const styleTags = tags.map(item => {
    const name = item.name
    if (name === 'big' || name === 'wide' || name === 'tall') return {...item}
    return {}
  }).filter(value => Object.keys(value).length !== 0)
    
  return posts.filter(({categories}) => {return categories.includes(catId)})
    .map((item) => {
      let itemObj = item.content.rendered.split('"')
      let imgIndex = itemObj.findIndex((i) => i === " data-large-file=") + 1
      let videoIndex = itemObj.findIndex((i) => i === "video/mp4") + 2
      return {
        name: item.title.rendered,
        desc: item.excerpt.rendered,
        imgSrc: itemObj[imgIndex],
        titleImg: item._embedded && item._embedded['wp:featuredmedia'] ? item._embedded['wp:featuredmedia'][0].source_url : undefined, 
        videoSrc: itemObj[videoIndex],
        videoLink: item.excerpt.rendered.match(/\bhttps?:\/\/\S+/gi) ? item.excerpt.rendered.match(/\bhttps?:\/\/\S+/gi)[0] : 'NOT_FOUND',
        gridStyle: styleTags.filter(o1 => item.tags.some(o2 => o1.id === o2))[0] ? styleTags.filter(o1 => item.tags.some(o2 => o1.id === o2))[0].name : 'NOT_FOUND'
      }
    }).filter(value => Object.keys(value).length !== 0)
}

export async function getDirector(director) {
  const {tags, posts} = await getWordpressData()

  const directorTag = tags.find(({name}) => name === 'director')
  const tagId = tags.find(({name}) => name === director.split('-').join(' ')).id
  const styleTags = tags.map(item => {
    const name = item.name
    if (name.includes('row') || name.includes('column')) return {...item}
    return {}
  }).filter(value => Object.keys(value).length !== 0)
  const postsFil = posts 
    .filter(({tags}) => {
      return tags.includes(tagId)
    })
    .map((item) => {
      let itemObj = item.content.rendered.split('"')
      let imgIndex = itemObj.findIndex((i) => i === " data-large-file=") + 1
      let videoIndex = itemObj.findIndex((i) => i === "video/mp4") + 2
      if (item.tags.find(tagI => tagI === directorTag.id)) return {
        name: item.title.rendered,
        titleImg: item._embedded && item._embedded['wp:featuredmedia'] ? item._embedded['wp:featuredmedia'][0].source_url : undefined
      }
      return {
        // name: item.title.rendered,
        slug: item.slug,
        desc: item.excerpt.rendered,
        imgSrc: itemObj[imgIndex],
        titleImg: item._embedded && item._embedded['wp:featuredmedia'] ? item._embedded['wp:featuredmedia'][0].source_url : undefined, 
        videoSrc: itemObj[videoIndex],
        videoLink: item.excerpt.rendered.match(/\bhttps?:\/\/\S+/gi) 
          ? item.excerpt.rendered.match(/\bhttps?:\/\/\S+/gi)[0].replace(/\"/g, '') 
          : 'NOT_FOUND',
        gridStyle: styleTags.filter(o1 => item.tags.some(o2 => o1.id === o2))
          ? styleTags.filter(o1 => item.tags.some(o2 => o1.id === o2)).map(({name}) => {
              let val = parseInt(name.replace( /[^\d.]/g, '' ))
              if (name.includes('row')) return {row: val}
              else return {column: val}
            }).reduce(function(acc, x) {
              for (var key in x) acc[key] = x[key];
              return acc;
            }, {})
          : 'NOT_FOUND'
      }
    })
  return move(postsFil, postsFil.findIndex((i) => !i.videoSrc), 0)
}

export async function getVimeoVideo(slug) {
  const {posts} = await getWordpressData()
  return posts.find((item) => item.slug === slug).excerpt.rendered.match(/\bhttps?:\/\/\S+/gi)[0].replace(/\"/g, '')
}

export default {
  wordpressCardApi,
  getDirector,
  getVimeoVideo,
  getHomePageVideos
}