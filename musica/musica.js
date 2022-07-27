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
        fetch("http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=ddc75f55ff59c84a1b4f11fefc6313a9&format=json" )
          .then((res) => res.json())
          .then((data) => {
            generateTrending(data)
            trendingData=data
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
            songName.classList.add("songname")
            artistName.classList.add("artist")
            gridTrending.appendChild(actualTrend)
            actualTrend.appendChild(imgsTrensong)
            img.setAttribute("src",coolData[i].image[2]["#text"])
            songName.innerText=coolData[i].name
            artistName.innerText=coolData[i].artist
            img.setAttribute("data-title", coolData[i].name)
            img.setAttribute("data-artist", coolData[i].artist)
            console.log(artistName.innerText)
            imgsTrensong.appendChild(img)
            imgsTrensong.appendChild(songName)
            imgsTrensong.appendChild(artistName)
            actualTrend.addEventListener('click', popUpDisplay)
            actualTrend.addEventListener('click', generatePopUpElem)
        }
    }
    function generateTrending(data){
        const trendShi = data.tracks.track.map((track)=>({...track,artist:track.artist.name}))
        loopDubios(trendShi)
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
        generateTrending(trendingData)
        trenName.innerText="TRENDING SONGS"
    }
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
    function generatePopUpElem(e){
        const pozaFundalPop = document.createElement("img")
        const actualPopup = document.getElementById("infoPopUp")
        pozaFundalPop.setAttribute("src" ,e.target.getAttribute("data-title")) 
        actualPopup.appendChild(pozaFundalPop)
    }     
})
