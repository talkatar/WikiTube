

'use strict'

function onInit() {
    getSearchResults('Madonna')
        .then((res)=>{renderTopFiveVideos(res) 
            renderVideo(res[0].id)})

    getWikiResults('Madonna')
     .then( (res)=>renderWiki(res) )
     .catch(err => console.dir('err:', err))

        

        
}



function renderTopFiveVideos(res) {
    console.log( res);

    const strHTMLs = res.map(video => {

        console.log(video.id);
        return `  
        <div class="top-five" onclick="renderVideo('${video.id}')">        
        <img class="img1" src="${video.imgUrl}"
        <h2>${video.title}</h2>
        </div>`

        })
    document.querySelector('.videos-container').innerHTML = strHTMLs.join('')

}

function renderVideo(videoId){
    console.log(videoId);


    const strHTMLs =

        `
        <iframe  class="video"
        src=https://www.youtube.com/embed/${videoId}>
        </iframe> 
        `
       
        
    document.querySelector('.video').innerHTML = strHTMLs

    
}

function renderWiki(res) {
    console.log(res);
    document.querySelector('.title').innerHTML=res.title
    console.log(res.info);
    document.querySelector('.info').innerHTML=res.info
}



function onSearch(ev) {
    ev.preventDefault()
    const elInput = document.querySelector('input[name="browser"]')
    getSearchResults(elInput.value.toLowerCase())
        .then((res)=>{renderTopFiveVideos(res) 
        renderVideo(res[0].id)})

        getWikiResults(elInput.value.toLowerCase())
        .then( (res)=>renderWiki(res) )
    elInput.value = ''
}
