window.addEventListener("load" ,()=>{
    const searchS=document.getElementById("search")
    searchS.addEventListener("keyup", musicSearhFetch)
    searchS.addEventListener("click", searchClick)
    const trenName=document.getElementById("tren")
    const ics=document.getElementById("ics")
    ics.addEventListener("click", icsClick)
    let trendingData;

    function searchDeletes(){
        let favorite=document.getElementById("favorite")
        favorite.classList="favorite closeFavorite"
        let musica= document.getElementById("musica")
        musica.innerText="SEARCH RESULTS"
    }
    function searchClick(){
        searchDeletes()
        ics.style.display="flex"
    }
    
    function undoSearchDeletes(){
        const favorite=document.getElementById("favorite")
        favorite.classList.remove="closeFavorite"
        favorite.classList="favorite"
        const musica= document.getElementById("musica")
        musica.innerText="MUSICA"
       document.getElementById("search").value = ""
    
    }
    function musicFetch(){
        fetch("https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=ddc75f55ff59c84a1b4f11fefc6313a9&format=json" )
          .then((res) => res.json())
          .then((data) => {
            generateTrending(data)
            trendingData=data
          });
    }
    function albumFetch(artist, title, img, def){
        fetch( `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=ddc75f55ff59c84a1b4f11fefc6313a9&artist=${artist}&track=${title}&format=json` )
          .then((res) => res.json())
          .then((data) => {
            if(data.track.album){
                img.src = data.track.album.image[2]["#text"]
                img.setAttribute("data-album",data.track.album.title)
            }
            else{
                img.src = def
                img.setAttribute("data-album","Louder actions")
            }
            
          });
    }
    
    musicFetch()


    
    function loopDubios(coolData){
        const gridTrending= document.getElementById("gridTrending")
        gridTrending.innerHTML=""
        for(let i=0;  i<coolData.length; i++){
            const actualTrend = document.createElement("div")
            const imgsTrensong = document.createElement("div")
            let img = document.createElement("img")
            let songName = document.createElement("p")
            let artistName = document.createElement("p")
            img.classList.add("cover")
            img.classList.add("skeleton")
            img.addEventListener("error",()=>{
                img.src="resurse/hill.jpg"
            })

            albumFetch(coolData[i].artist, coolData[i].name, img, coolData[i].image[2]["#text"])

            songName.classList.add("songname")
            artistName.classList.add("artist")
            gridTrending.appendChild(actualTrend)
            actualTrend.appendChild(imgsTrensong)
            songName.innerText=coolData[i].name
            artistName.innerText=coolData[i].artist
            img.setAttribute("data-title", coolData[i].name)
            img.setAttribute("data-artist", coolData[i].artist)
            imgsTrensong.appendChild(img)
            imgsTrensong.appendChild(songName)
            imgsTrensong.appendChild(artistName)
            actualTrend.addEventListener('click', popUpDisplay)
            actualTrend.addEventListener('click', generatePopUpElem)
        }
    }
    function generateTrending(data, isPhoto){
        const trendShi = data.tracks.track.map((track)=>({...track,artist:track.artist.name}))
        loopDubios(trendShi, isPhoto)
    }
    function musicSearhFetch(){
        const value = document.getElementById("search").value
        fetch("http://ws.audioscrobbler.com/2.0/?method=track.search&track="+value+"&api_key=ddc75f55ff59c84a1b4f11fefc6313a9&format=json" )
          .then((res) => res.json())
          .then((data) => {
            genrateSearchResult(data)
            // generatePopUpElem(data)
            console.log(data)
          });
    }
    function genrateSearchResult(data){
        const searchShi = data.results.trackmatches.track
        console.log("gvfcgfgccgfcfcfcfvgvg")
        loopDubios(searchShi)
        const value = document.getElementById("search").value
        trenName.innerText="MUSIC WITH "+value
        trenName.innerText=trenName.innerText.toUpperCase()
    }
    function icsClick(){
        
        undoSearchDeletes()
        ics.style.display="none"

        setTimeout(()=>{
            generateTrending(trendingData)
            trenName.innerText="TRENDING SONGS"
        },500)
        
    }
    function generatePopUpElem(e){
        const pozaFundalPop = document.getElementById("songfoto")
        const actualPopup = document.getElementById("infoPopUp")
        const pozaMelodie= document.getElementById("pozaMelodie")
        const title = document.getElementById("titlename")
        const artist =document.getElementById("artistname")
        const album =document.getElementById("albumname")
        pozaFundalPop.classList.add("songfoto")
        pozaFundalPop.setAttribute("src" ,e.target.getAttribute("src"))
        album.innerText=e.target.getAttribute("data-album")
        title.innerText=e.target.getAttribute("data-title")
        artist.innerText=e.target.getAttribute("data-artist")
        pozaMelodie.appendChild(pozaFundalPop)
    }     
})
function popUpDisplay(){
        const infoPopUp = document.getElementById("infoPopUp")     
        const backPopUp = document.getElementById("backGroundPopUp")
        backPopUp.classList.add("visible")
        infoPopUp.classList.add("visible")
        const buttonDrag = document.getElementById("butonDrag")
        buttonDrag.onclick=deletePopUp
    }
function deletePopUp(){
        const infoPopUp = document.getElementById("infoPopUp")     
        infoPopUp.classList.remove("visible")
        const backPopUp = document.getElementById("backGroundPopUp")
        backPopUp.classList.remove("visible")  
    }
function playButton(){
    const pozaFundalPop = document.getElementById("fundalPopUp")
    const playButton = document.getElementById("buttonPlay")
    pozaFundalPop.setAttribute("src", "resurse/dinamic.gif")
}
