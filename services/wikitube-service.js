'use strict'

const API_KEY = 'AIzaSyBB_nsVZC67153SsDhhRBdpVLzzXwRFX3E'
const YT_KEY = 'ytDB'
const WP_KEY = 'wpDB'


let gWikiSearch = loadFromStorage(WP_KEY) || {}
let gCacheSearch = loadFromStorage(YT_KEY) || {}




function getSearchResults(keyword) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${API_KEY}&q=${keyword}`

    if (gCacheSearch[keyword]) return Promise.resolve(gCacheSearch[keyword])

    return fetch(url)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            const videos = res.items.map(item => 
                 ({
                    id: item.id.videoId,
                    title: item.snippet.title,
                    imgUrl: item.snippet.thumbnails.default.url
                })

                // {return{
                //     id: item.id.videoId,
                //     title: item.snippet.title,
                //     imgUrl: item.snippet.thumbnails.default.url
                // }}

            )
            if (!gCacheSearch && !gCacheSearch.length) throw new Error('No info Found')

            gCacheSearch[keyword]=videos

            saveToStorage(YT_KEY, gCacheSearch)
            return videos
           
        }) 
}


function getWikiResults(keyword) {
    const url = `https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&srsearch=${keyword}&format=json`
    
    if (gWikiSearch[keyword]) return Promise.resolve(gWikiSearch[keyword])

    return fetch(url)
        .then(res => res.json())
        .then(res => {
            console.log(res);

            const wikiInfo = {title:res.query.search[0].title, info:res.query.search[0].snippet}
            
                console.log(wikiInfo);
                if (!gWikiSearch && !gWikiSearch.length) throw new Error('No info Found')

                gWikiSearch[keyword]=wikiInfo
    
                saveToStorage(WP_KEY, gWikiSearch)
                return wikiInfo 

               
            }) 
    }
    

    function clearHistory() {
        gWikiSearch = {}
        saveToStorage(WP_KEY, gWikiSearch)
        gCacheSearch = {}
        saveToStorage(YT_KEY, gCacheSearch)
   }




   








