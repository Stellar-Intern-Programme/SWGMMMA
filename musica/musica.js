function searchDeletes(){
    let trending = document.getElementById("trending")
    let favorite=document.getElementById("favorite")
    favorite.classList="favorite closeFavorite"
    let musica= document.getElementById("musica")
    musica.innerText="SEARCH RESULTS"
    trending.style.display="none"
    console.log(favorite)
}
function searchClick(){
    searchDeletes()
    const ics=document.getElementById("ics")
    ics.style.display="flex"
}