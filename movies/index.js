const API_KEY = "87d67bbfdc9296a27846a09607e7e14c";
const searchInput = document.getElementById("searchInput")
fetch("https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY + "&query=" + searchInput).then(res => res.json()).then(data => {
    console.log(data);
})
const arrayOfGenres = [
    { id: '28', name: 'Action' },
    { id: '12', name: 'Adventure' },
    { id: '16', name: 'Animation' },
    { id: '35', name: 'Comedy' },
    { id: '80', name: 'Crime' },
    { id: '99', name: 'Documentary' },
    { id: '18', name: 'Drama' },
    { id: '10751', name: 'Family' },
    { id: '36', name: 'History' },
    { id: '27', name: 'Horror' },
    { id: '10402', name: 'Music' },
    { id: '9648', name: 'Mystery' },
    { id: '10749', name: 'Romance' },
    { id: '878', name: 'Science Fiction' },
    { id: '10770', name: 'TV Movie' },
    { id: '53', name: 'Thriller' },
    { id: '10752', name: 'War' },
    { id: '37', name: 'Western' },
    { id: '10759', name: 'Adventure' },
    { id: '10762', name: 'Kids' },
    { id: '10763', name: 'News' },
    { id: '10764', name: 'Reality' },
    { id: '10765', name: 'Fantasy' },
    { id: '10766', name: 'Soap' },
    { id: '10767', name: 'Talk' },
    { id: '10768', name: 'Politics' },
]
console.log(arrayOfGenres)
let trendingMoviesArray = JSON.parse(localStorage.getItem("trendingMovies")) || [];
let favoriteMoviesArray = JSON.parse(localStorage.getItem("FavoriteMovies")) || [];
console.log(trendingMoviesArray)
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
    const iframe = document.getElementById("iframe")
    const trailerBtn = document.getElementById("trailerBtn")
    iframe.style.left = "-130vw";

    trailerBtn.innerText = "";
    trailerBtn.innerText = "PLAY VIDEO";
    trailerBtn.addEventListener("click", openTrailer);
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


window.addEventListener("load", (event) => {
    fetch("https://api.themoviedb.org/3/trending/all/day?api_key=" + API_KEY).then(res => res.json()).then(data => {
        console.log(data);
        const trendingMovies = document.getElementById("trendingMovies")
        const trendMovieList = document.getElementById("trendMovieList")
        trendingMovies.appendChild(trendMovieList)
        data.results.forEach(element => {
            const movieImg = document.createElement("img");
            movieImg.setAttribute("src", "https://image.tmdb.org/t/p/w500/" + element.poster_path)
            movieImg.addEventListener("click", () => { openModal(), modalData(element) })
            trendMovieList.appendChild(movieImg)
            trendingMoviesArray.push({ title: element.title, photo: element.poster_path, genre: element.genre_ids[0], language: element.original_language, vote: element.vote, adult: element.adult });
            localStorage.setItem("trending", JSON.stringify(trendingMoviesArray));
        });
    })
});
function modalData(element) {
    const info = document.getElementById("info")
    const title = document.getElementById("title")
    const rating = document.getElementById("rating")
    const genre = document.getElementById("genre")
    const language = document.getElementById("language")
    const adult = document.getElementById("adult")
    const description = document.getElementById("description")
    const movieImg = document.getElementById("img");
    movieImg.setAttribute("src", "https://image.tmdb.org/t/p/w500/" + element.poster_path)
    info.appendChild(movieImg)
    title.innerText = element.title;
    rating.innerText = element.vote_average.toFixed(1);
    arrayOfGenres.forEach(g => { if (Number(g.id) === element.genre_ids[0]) { console.log(g.name); genre.innerText = g.name } })
    language.innerText = element.original_language;
    description.innerText = element.overview;
    if (element.adult !== false) {
        console.log(element.adult);
        adult.innerText = "adult";
    }
    fetch("https://api.themoviedb.org/3/movie/" + element.id + "/videos?api_key=" + API_KEY + "&language=en-US").then(res => res.json()).then(trailerData => {
        console.log(trailerData.results[0].key);
        const iframe = document.getElementById("iframe")
        iframe.innerHTML = `<iframe width="350px" height="170px" border-radius="20px" src="https://www.youtube.com/embed/${trailerData.results[0].key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    })
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
