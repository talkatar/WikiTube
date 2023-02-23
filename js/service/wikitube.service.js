'use strict'

const YT_KEY = 'AIzaSyB_6u19ZnSR_5zv7HYgTJKw6qkPpnsREcg'

const urlYT = `https://www.googleapis.com/youtube/v3/search?part=snippet
&videoEmbeddable=true&type=video&key=${YT_KEY}&q=`
const urlWiki = `https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&format=json&
srsearch=`

const SEARCH_KEY = 'videosDB'
const WIKI_KEY = 'wikiDB'
let gSearchCache = loadFromStorage(SEARCH_KEY) || {}
let gWikiCache = loadFromStorage(WIKI_KEY) || {}

function getVideos(keyword) {
  if (gSearchCache[keyword]) {
    console.log('Loading from cache')
    return Promise.resolve(gSearchCache[keyword])
  }

  return axios.get(urlYT + keyword).then(res => {
    console.log('res', res)
    const videos = res.data.items.map(item => _prepareData(item))
    gSearchCache[keyword] = videos
    saveToStorage(SEARCH_KEY, gSearchCache)
    return videos
  })
}

function getWiki(keyword) {
  if (gWikiCache[keyword]) {
    console.log('Loading from cache')
    return Promise.resolve(gWikiCache[keyword])
  }

  return axios.get(urlWiki + keyword).then(res => {
    const result = {
      title: res.data.query.search[0].title,
      txt: res.data.query.search[0].snippet,
    }
    gWikiCache[keyword] = result
    saveToStorage(WIKI_KEY, gWikiCache)
    return result
  })
}

function _prepareData(item) {
  return {
    videoId: item.id.videoId,
    title: item.snippet.title,
    url: item.snippet.thumbnails.high.url,
  }
}
