function searchDeletes(){
    let favorite=document.getElementById("favorite")
    favorite.classList="favorite closeFavorite"
    let musica= document.getElementById("musica")
    musica.innerText="SEARCH RESULTS"
    console.log(favorite)
}
function searchClick(){
    searchDeletes()
    const ics=document.getElementById("ics")
    ics.style.display="flex"
}
function icsClick(){
    undoSearchDeletes()
    const ics=document.getElementById("ics")
    ics.style.display="none"
}
function undoSearchDeletes(){
    let favorite=document.getElementById("favorite")
    favorite.classList.remove="closeFavorite"
    favorite.classList="favorite"
    let musica= document.getElementById("musica")
    musica.innerText="MUSICA"
    console.log(favorite)
}
function musicFetch(){
    fetch("http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=ddc75f55ff59c84a1b4f11fefc6313a9&format=json" )
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      });
}
window.addEventListener("load",()=>{
    musicFetch()
})