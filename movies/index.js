function openTrailer() {
    const iframe = document.getElementById("iframe")
    const trailerBtn = document.getElementById("trailerBtn")
    iframe.style.left = "8vw"
    trailerBtn.innerText = ""
    trailerBtn.innerText = "STOP PLAYING"
    trailerBtn.addEventListener("click", closeTrailer)
    function closeTrailer() {
        iframe.style.left = "-130vw";
        trailerBtn.innerText = "";
        trailerBtn.innerText = "PLAY VIDEO";
        trailerBtn.addEventListener("click", openTrailer);
    }
}
function openModal() {
    const modalBackground = document.getElementById("modalBackground")
    const modal = document.getElementById("modal")
    modalBackground.style.zIndex = "4"
    modalBackground.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    modal.style.bottom = "0";
}
function closeModal() {
    const modalBackground = document.getElementById("modalBackground")
    const modal = document.getElementById("modal")
    modalBackground.style.backgroundColor = "rgba(0, 0, 0, 0)";
    modalBackground.style.zIndex = "-1"
    modal.style.bottom = "-80vh";
}

function searchMenu() {
    const divSearch = document.getElementById("divSearch")
    const favoriteMovies = document.getElementById("favoriteMovies")
    const trendingMovies = document.getElementById("trendingMovies")
    const topTitle = document.getElementById("topTitle")
    const recommendMovies = document.getElementById("recommendMovies")
    const x = document.getElementById("x");
    favoriteMovies.style.height = "0";
    trendingMovies.style.height = "0";
    favoriteMovies.style.opacity = "0%";
    trendingMovies.style.opacity = "0%";
    recommendMovies.style.display = "flex";
    topTitle.innerText = "SEARCHING";
    x.style.display = "flex"
}
function closeSearchMenu() {
    const divSearch = document.getElementById("divSearch")
    const favoriteMovies = document.getElementById("favoriteMovies")
    const trendingMovies = document.getElementById("trendingMovies")
    const topTitle = document.getElementById("topTitle")
    const recommendMovies = document.getElementById("recommendMovies")
    const x = document.getElementById("x");
    favoriteMovies.style.height = "fit-content";
    trendingMovies.style.height = "fit-content";
    favoriteMovies.style.opacity = "100%";
    trendingMovies.style.opacity = "100%";
    recommendMovies.style.display = "none";
    topTitle.innerText = "MOVIES";
    x.style.display = "none"

}
// var dragValue;
// function move(id) {
//     var modal = document.getElementById("modal")
//     modal.style.position = "absolute"
//     modal.onmousedown = function () {
//         dragValue = modal;
//     }
//     document.onmousemove = function (e) {
//         var y = e.pageY
//         var x = e.pageX
//     }
// }
