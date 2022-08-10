const API_KEY = '87d67bbfdc9296a27846a09607e7e14c';
const searchInput = document.getElementById('searchInput');
fetch(
  'https://api.themoviedb.org/3/search/movie?api_key=' +
    API_KEY +
    '&query=' +
    searchInput,
)
  .then(res => res.json())
  .then(data => {
    console.log(data);
  });
let favMovieList;
let favoriteMovies = [];
let trendingMovies;
let iframe;
let trailerBtn;
let modalBackground;
let modal;
let companiesImages;
let nothing;
let parent;

const arrayOfGenres = [
  {id: '28', name: 'Action'},
  {id: '12', name: 'Adventure'},
  {id: '16', name: 'Animation'},
  {id: '35', name: 'Comedy'},
  {id: '80', name: 'Crime'},
  {id: '99', name: 'Documentary'},
  {id: '18', name: 'Drama'},
  {id: '10751', name: 'Family'},
  {id: '36', name: 'History'},
  {id: '27', name: 'Horror'},
  {id: '10402', name: 'Music'},
  {id: '9648', name: 'Mystery'},
  {id: '10749', name: 'Romance'},
  {id: '878', name: 'Science Fiction'},
  {id: '10770', name: 'TV Movie'},
  {id: '53', name: 'Thriller'},
  {id: '10752', name: 'War'},
  {id: '37', name: 'Western'},
  {id: '10759', name: 'Adventure'},
  {id: '10762', name: 'Kids'},
  {id: '10763', name: 'News'},
  {id: '10764', name: 'Reality'},
  {id: '10765', name: 'Fantasy'},
  {id: '10766', name: 'Soap'},
  {id: '10767', name: 'Talk'},
  {id: '10768', name: 'Politics'},
];
console.log(arrayOfGenres);
let trendingMoviesArray =
  JSON.parse(localStorage.getItem('trendingMovies')) || [];
let favoriteMoviesArray;
function openTrailer() {
  iframe.style.left = '8vw';
  trailerBtn.innerText = '';
  trailerBtn.innerText = 'STOP PLAYING';
  trailerBtn.addEventListener('click', closeTrailer);
  function closeTrailer() {
    iframe.style.left = '-130vw';
    trailerBtn.innerText = '';
    trailerBtn.innerText = 'PLAY VIDEO';
    trailerBtn.addEventListener('click', openTrailer);
  }
}
function openModal() {
  modalBackground.style.zIndex = '4';
  modalBackground.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  modal.style.bottom = '0';
}
function closeModal() {
  modalBackground.style.backgroundColor = 'rgba(0, 0, 0, 0)';
  modalBackground.style.zIndex = '-1';
  modal.style.bottom = '-80vh';
  iframe.style.left = '-130vw';
  companiesImages.innerHTML = '';
  trailerBtn.innerText = '';
  trailerBtn.innerText = 'PLAY VIDEO';
  trailerBtn.addEventListener('click', openTrailer);
}

function searchMenu() {
  const topTitle = document.getElementById('topTitle');
  const recommendMovies = document.getElementById('recommendMovies');
  const x = document.getElementById('x');
  favoriteMovies.classList = 'favorite-movies close';
  trendingMovies.classList = 'trending-movies close';
  trendingMovies.style.height = '0';

  recommendMovies.style.display = 'flex';
  topTitle.innerText = 'SEARCHING';
  x.style.display = 'flex';
}
function closeSearchMenu() {
  const topTitle = document.getElementById('topTitle');
  const recommendMovies = document.getElementById('recommendMovies');
  const searchInput = document.getElementById('searchInput').value;
  const x = document.getElementById('x');
  favoriteMovies.classList = 'favorite-movies open';
  trendingMovies.classList = 'trending-movies open';
  favoriteMovies.classList.remove('close');
  trendingMovies.classList.remove('close');
  trendingMovies.style.height = 'fit-content';
  recommendMovies.style.display = 'none';
  topTitle.innerText = 'MOVIES';
  x.style.display = 'none';
  searchInput.innerText = '';
}

window.addEventListener('load', event => {
  favMovieList = document.getElementById('favMovieList');
  favoriteMovies = document.getElementById('favoriteMovies');
  trendingMovies = document.getElementById('trendingMovies');
  iframe = document.getElementById('iframe');
  trailerBtn = document.getElementById('trailerBtn');
  modalBackground = document.getElementById('modalBackground');
  modal = document.getElementById('modal');
  companiesImages = document.getElementById('companiesImages');
  nothing = document.getElementById('nothing');
  parent = window.ReactNativeWebView;

  fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY)
    .then(res => res.json())
    .then(data => {
      const trendMovieList = document.getElementById('trendMovieList');
      document
        .getElementById('searchInput')
        .addEventListener('keyup', searchMovie);
      trendingMovies.appendChild(trendMovieList);
      data.results.forEach(element => {
        const divMovieImg = document.createElement('div');
        const movieImg = document.createElement('img');
        divMovieImg.appendChild(movieImg);
        if ((favoriteMoviesArray?.length || 0) === 0) {
          nothing.style.display = 'flex';
        }
        if (element.poster_path === null) {
          movieImg.setAttribute(
            'src',
            'https://th.bing.com/th/id/OIP.6Hec0K-YQL1hL-sfqyPHBwAAAA?pid=ImgDet&rs=1',
          );
        } else {
          movieImg.setAttribute(
            'src',
            'https://image.tmdb.org/t/p/w500/' + element.poster_path,
          );
        }
        movieImg.addEventListener('click', () => {
          openModal(), modalData(element);
        });
        trendMovieList.appendChild(movieImg);
        trendingMoviesArray.push({
          title: element.title,
          photo: element.poster_path,
          genre: element.genre_ids[0],
          language: element.original_language,
          vote: element.vote,
          adult: element.adult,
        });
        localStorage.setItem('trending', JSON.stringify(trendingMoviesArray));
      });
    });

  document.addEventListener('message', e => {
    localStorage.setItem('favorite', e.data);
    favoriteMoviesArray = JSON.parse(e.data) || [];

    addFavoriteList();
  });
});

function modalData(element) {
  const info = document.getElementById('info');
  const title = document.getElementById('title');
  const rating = document.getElementById('rating');
  const genre = document.getElementById('genre');
  const language = document.getElementById('language');
  const adult = document.getElementById('adult');
  const description = document.getElementById('description');
  const movieImg = document.getElementById('img');
  movieImg.setAttribute(
    'src',
    'https://image.tmdb.org/t/p/w500/' + element.poster_path,
  );
  movieImg.addEventListener('error', () => {
    movieImg.setAttribute('src', 'src/noimage.png');
  });
  info.appendChild(movieImg);
  fetch(
    'https://api.themoviedb.org/3/movie/' +
      element.id +
      '/videos?api_key=' +
      API_KEY +
      '&language=en-US',
  )
    .then(res => res.json())
    .then(trailerData => {
      console.log(trailerData.results[0].key);
      iframe.innerHTML = `<iframe width="350px" height="170px" border-radius="20px" src="https://www.youtube.com/embed/${trailerData.results[0].key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    });
  fetch(
    `https://api.themoviedb.org/3/movie/${element.id}?api_key=${API_KEY}&language=en-US`,
  )
    .then(res => res.json())
    .then(production => {
      title.innerText = production.original_title;
      const addFav = document.getElementById('addFav');
      console.log(favoriteMoviesArray);
      if (favoriteMoviesArray.find(e => e.id === production.id)) {
        addFav.setAttribute('onclick', `removeFavorite(${production.id})`);
        addFav.style.backgroundColor = 'red';
        addFav.innerText = 'REMOVE FAVORITE';
      } else {
        addFav.setAttribute('onclick', `addFavorite(${production.id})`);
        addFav.style.backgroundColor = '#1A73E8';
        addFav.innerText = 'ADD TO FAVORITE';
      }
      rating.innerText = production.vote_average.toFixed(1);
      genre.innerText = production.genres[0].name;
      language.innerText = production.original_language;
      description.innerText = production.overview;
      if (element.adult != false) {
        console.log(element.adult);
        adult.innerText = 'adult';
      }
      const imdb = document.getElementById('imdb');
      imdb.setAttribute(
        'href',
        `https://www.imdb.com/title/${production.imdb_id}/?ref_=nv_sr_srsg_1`,
      );
      production.production_companies.forEach(x => {
        const compImg = document.createElement('img');
        compImg.setAttribute(
          'src',
          'https://image.tmdb.org/t/p/w500/' + x.logo_path,
        );
        companiesImages.appendChild(compImg);
        compImg.addEventListener('error', () => {
          compImg.style.display = 'none';
        });
      });
    });

  const addFav = document.getElementById('addFav');
  addFav.setAttribute('onclick', `addFavorite(${element.id})`);
}

function addFavorite(id) {
  if (favoriteMoviesArray.length === 0) {
    nothing.style.display = 'flex';
  }
  fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`,
  )
    .then(res => res.json())
    .then(favData => {
      const newMovie = {
        title: favData.original_title,
        id: favData.id,
        poster_path: favData.poster_path,
        original_language: favData.original_language,
        vote_average: favData.vote_average,
        adult: favData.adult,
        production_companies: favData.production_companies,
        overview: favData.overview,
        imdb: favData.imdb_id,
        genre: favData.genres[0].name,
      };
      parent?.postMessage?.(JSON.stringify([newMovie, 'add']));

      favoriteMoviesArray.unshift({
        title: favData.original_title,
        id: favData.id,
        poster_path: favData.poster_path,
        original_language: favData.original_language,
        vote_average: favData.vote_average,
        adult: favData.adult,
        production_companies: favData.production_companies,
        overview: favData.overview,
        imdb: favData.imdb_id,
        genre: favData.genres[0].name,
      });
      localStorage.setItem('favorite', JSON.stringify(favoriteMoviesArray));
      addFavoriteList();
      const addFav = document.getElementById('addFav');
      addFav.setAttribute('onclick', `removeFavorite(${id})`);
      addFav.style.backgroundColor = 'red';
      addFav.innerText = 'REMOVE FAVORITE';
      favP.style.display = 'flex';
    });
}
function addFavoriteList() {
  favMovieList.innerHTML = '';
  if (favoriteMoviesArray.length === 0) {
    nothing.style.display = 'flex';
  } else {
    nothing.style.display = 'none';
  }

  favoriteMoviesArray.forEach(x => {
    const favMovieImg = document.createElement('img');
    favMovieImg.setAttribute(
      'src',
      `https://image.tmdb.org/t/p/w500/${x.poster_path}`,
    );
    favMovieImg.addEventListener('click', () => {
      openModal(), modalData(x);
    });
    favMovieList.appendChild(favMovieImg);
  });
}
function removeFavorite(id) {
  const addFav = document.getElementById('addFav');
  addFav.setAttribute('onclick', `addFavorite(${id})`);
  addFav.style.backgroundColor = '#1A73E8';
  addFav.innerText = 'ADD TO FAVORITE';

  const removedMovie = favoriteMoviesArray.filter(
    favorite => favorite.id === id,
  )[0];

  parent?.postMessage?.(JSON.stringify([removedMovie, 'add']));

  favoriteMoviesArray = favoriteMoviesArray.filter(
    favorite => favorite.id !== id,
  );
  localStorage.setItem('favorite', JSON.stringify(favoriteMoviesArray));
  addFavoriteList();
  if (favoriteMoviesArray.length === 0) {
    nothing.style.display = 'flex';
  }
}
function searchMovie(event) {
  const value = document.getElementById('searchInput').value;
  const moviesWith = document.getElementById('moviesWith');
  moviesWith.innerText = '';
  moviesWith.innerText = 'MOVIES WITH ' + value.toUpperCase();
  // const recommendMovies = document.getElementById("recommendMovies")
  // const recommendP = document.createElement("p")
  // recommendMovies.appendChild(recommendP)
  // recommendP.innerText = "MOVIES WITH " + value;

  fetch(
    `https://api.themoviedb.org/3/search/movie?query=${value}&api_key=${API_KEY}`,
  )
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const recomMovieList = document.getElementById('recomMovieList');
      recomMovieList.innerHTML = '';
      data.results.forEach(element => {
        const movieImg = document.createElement('img');
        movieImg.setAttribute(
          'src',
          'https://image.tmdb.org/t/p/w500/' + element.poster_path,
        );
        movieImg.addEventListener('error', () => {
          movieImg.setAttribute('src', 'src/noimage.png');
        });
        movieImg.addEventListener('click', () => {
          openModal(), modalData(element);
        });
        recomMovieList.appendChild(movieImg);
      });
    });
}
// function addFavorite(element) {
//     console.log(element)
//     const favMovieList = document.getElementById("favMovieList");
//     const favMovieImg = document.createElement("img");
//     favMovieImg.setAttribute("src", "https://image.tmdb.org/t/p/w500/" + element.poster_path);
//     favMovieList.appendChild(favMovieImg);

// }

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
