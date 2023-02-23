'use strict'

function init() {
  getSearchResults('flowers')
}

function onSearch(ev) {
  ev.preventDefault()
  const keyword = document.querySelector('[name="search"]').value
  getSearchResults(keyword)
}

function getSearchResults(keyword) {
  Promise.all([getVideos(keyword), getWiki(keyword)])
    .then(res => {
      renderVideosList(res[0])
      onSelectVideo(res[0][0].videoId)
      renderWiki(res[1])
    })
    .catch(err => {
      console.log('no search results')
    })
}
function renderVideosList(videos) {
  document.querySelector('.videos-list').innerHTML = videos
    .map(
      ({ videoId, url, title }) =>
        `
              <li class="vid-preview prev-layout" onclick="onSelectVideo('${videoId}')">
                <img src="${url}" />
                <h3>${title}</h3>
              </li>
          `
    )
    .join('')
}

function renderWiki({ title, txt }) {
  document.querySelector('.wikipedia').innerHTML = `
   <h3>${title}</h3>
    <p>${txt}</p>
  `
}

function onSelectVideo(id) {
  document.querySelector('iframe').src = `https://www.youtube.com/embed/${id}`
}
