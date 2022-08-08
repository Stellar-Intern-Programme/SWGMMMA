let arrayOfFavMusic=[]
let trendingData;
let trenName
let favorite, musica
let pozaFundalPop
let authToken
document.addEventListener("message",niggers=>{
    authToken=JSON.parse(niggers.data).message
    window.ReactNativeWebView.postMessage("susy")
    document.getElementById('musica').textContent = JSON.parse(niggers.data).message
})
console.log(authToken)
window.addEventListener("load" ,()=>{
    pozaFundalPop = document.getElementById("fundalPopUp")
    arrayOfFavMusic=JSON.parse(localStorage.getItem("favorite"))|| []
    const searchS=document.getElementById("search")
    searchS.addEventListener("keyup", musicSearhFetch)
    searchS.addEventListener("click", searchClick)
    trenName=document.getElementById("tren")
    const ics=document.getElementById("ics")
    ics.addEventListener("click", icsClick)
    favorite = document.getElementById("favorite")
    musica= document.getElementById("musica")
    musicFetch()
    loopDubios(arrayOfFavMusic,"actualFavSongs", true)
    if(arrayOfFavMusic.length===0){
        creeazaPoza()
    }
})



function creeazaPoza(){
    const actual =document.getElementById("actualFavSongs")
    const poza = document.createElement("img")
    poza.src="resurse/nothing-here.png"
    poza.classList.add("cover")
    actual.appendChild(poza)
}
function searchDeletes(){
    favorite.classList="favorite closeFavorite"
    musica.innerText="SEARCH RESULTS"
}
function searchClick(){
    searchDeletes()
    ics.style.display="flex"
}

function undoSearchDeletes(){
    favorite.classList.remove="closeFavorite"
    favorite.classList="favorite"
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
        if(data.track && data.track.album){
            img.src = data.track.album.image[2]["#text"]
            img.setAttribute("data-album",data.track.album.title)
        }
        else{
            img.src = def
            img.setAttribute("data-album","Louder actions")
        }
      });
}

function popUpDisplay(){
        const infoPopUp = document.getElementById("infoPopUp")     
        const backPopUp = document.getElementById("backGroundPopUp")
        backPopUp.classList.add("visible")
        infoPopUp.classList.add("visible")
        const buttonDrag = document.getElementById("butonDrag")
        buttonDrag.onclick=deletePopUp
        buttonDrag.addEventListener("click",e=>{pozaFundalPop.setAttribute("data-gif", "fals") 
        playButton()
        })
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
    if(pozaFundalPop.getAttribute("data-gif")==="tru"){
        pozaFundalPop.setAttribute("src", "resurse/dinamic.gif")
        pozaFundalPop.setAttribute("data-gif", "fals")
    }else{
        pozaFundalPop.setAttribute("src", "resurse/static.png")
        pozaFundalPop.setAttribute("data-gif", "tru")
    }
}
function changeButton(){
    const favTxt =document.getElementById("divFavTxt")
    const divFavTxt =document.getElementById("divFavTxt")
    if(favTxt.innerText==="Remove from Favorite"){
        favTxt.innerText="Add to Favorites"
        divFavTxt.classList.remove("buttonFavoriteRed")
        
    }else{
        favTxt.innerText="Remove from Favorite"
        divFavTxt.classList.add("buttonFavoriteRed")
    }
}
async function  saveToArray(title,artist,src,album){
    if(!arrayOfFavMusic.find(e=>e.name===title)){
         const song={
            title,
            artist,
            album,
            info: ''
        }
        await fetch("https://messaging-app-intern.herokuapp.com/api/profile/add-song",{
            method:'POST',
            headers:{
                "Content-Type":"application/JSON",
                Cookie: `auth-token=${authToken};`
            },
            body: JSON.stringify(song),
            credentials: 'include'
        })
    arrayOfFavMusic.push({name:title,artist:artist,img:src,album:album})
    }else{
        let index=arrayOfFavMusic.findIndex(e=>e.name===title)
        arrayOfFavMusic.splice(index,1)
    }
    localStorage.setItem("favorite",JSON.stringify(arrayOfFavMusic))
    listFav(arrayOfFavMusic)
    changeButton();
    if(arrayOfFavMusic.length===0){
        creeazaPoza()
    }
}
function listFav(data){
    loopDubios(data,"actualFavSongs", true)
}



function loopDubios(coolData, container, isFav){
    const gridTrending= document.getElementById(container)
    gridTrending.innerHTML=""
    for(let i=0;  i<coolData.length; i++){
        const root = document.createElement("div")
        const divContainer = document.createElement("div")
        const musicImg = document.createElement("img")
        const songName = document.createElement("p")
        const artistName = document.createElement("p")


        if(!isFav){
            albumFetch(coolData[i].artist, coolData[i].name, musicImg, coolData[i].image[2]["#text"])
        }
        else{
            musicImg.src = coolData[i].img;
        }
        musicImg.classList.add("cover")
        musicImg.classList.add("skeleton")
        musicImg.addEventListener("error",()=>{
            musicImg.src="resurse/hill.jpg"
        })

        songName.classList.add("songname")
        artistName.classList.add("artist")
        root.appendChild(divContainer)
        songName.innerText=coolData[i].name
        artistName.innerText=coolData[i].artist
        musicImg.setAttribute("data-title", coolData[i].name)
        musicImg.setAttribute("data-artist", coolData[i].artist)
        divContainer.appendChild(musicImg)
        divContainer.appendChild(songName)
        divContainer.appendChild(artistName)
        root.addEventListener('click', popUpDisplay)
        root.addEventListener('click', generatePopUpElem)
        // console.log(root)


        gridTrending.appendChild(root)
    }
}
function generateTrending(data){
    const trendShi = data.tracks.track.map((track)=>({...track,artist:track.artist.name}))
    loopDubios(trendShi, "gridTrending", false)
}
function musicSearhFetch(){
    const value = document.getElementById("search").value
    fetch("http://ws.audioscrobbler.com/2.0/?method=track.search&track="+value+"&api_key=ddc75f55ff59c84a1b4f11fefc6313a9&format=json" )
      .then((res) => res.json())
      .then((data) => {
        genrateSearchResult(data)
        // generatePopUpElem(data)
      });
}
function genrateSearchResult(data){
    const searchShi = data.results.trackmatches.track
    loopDubios(searchShi, "gridTrending", false)
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
    const favTxt =document.getElementById("favTxt")
    const divFavTxt =document.getElementById("divFavTxt")
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
    const _name = e.target.getAttribute("data-title")
    const _artist = e.target.getAttribute("data-artist")
    const _album = e.target.getAttribute("data-album")

    if(arrayOfFavMusic.find(f=>f.name===_name)){
        divFavTxt.classList.add("buttonFavoriteRed")
        divFavTxt.innerText="Remove from Favorite"
    }else{
        divFavTxt.classList.remove("buttonFavoriteRed")
        divFavTxt.innerText="Add to Favorite"
    }
    divFavTxt.onclick =()=>{
        saveToArray(_name,_artist,e.target.src,_album)
    }

}