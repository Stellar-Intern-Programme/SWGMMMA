let index = 0;
let overlay,
  value,
  divResults,
  searchBar,
  results,
  lupa,
  X,
  searchInput,
  topOverlay,
  inputWidth,
  overlayTop,
  quote,
  quoteOfTheDay,
  listOfQuotes,
  searchResults,
  divMare,
  quotePopUp,
  popUpQuote,
  popUpAuthor,
  arrowLeft,
  button,
  listaJos;
let randomQuoteData;
let rolls = 0,
  rollsX = 0,
  rollX2 = 0;
let isLightMode;
let numeFoarteRandom;
let parent;
const MAX_COUNT = 50;
// add to fave / remove from fave
// change images
// dont fetch quote if there is a current one saved
// show favorite quotes
// fix search
// click pe alea din search
// modalitate sa go back to homepage

let favorites = [];

window.addEventListener('load', () => {
  let loading = true;
  overlay = document.getElementById('overlay');
  searchInput = document.getElementById('search');
  divResults = document.getElementById('resultBackground');
  searchBar = document.getElementById('search');
  results = document.getElementById('result');
  lupa = document.getElementById('Lupa');
  X = document.getElementById('X');
  topOverlay = document.getElementById('topSideOverlayWithBackground');
  inputWidth = document.getElementById('inputWidth');
  overlayTop = document.getElementById('overlayTop');
  quote = document.getElementById('quote');
  quoteOfTheDay = document.getElementById('quoteOfTheDay');
  listOfQuotes = document.getElementById('listOfQuotes');
  searchResults = document.getElementById('searchResults');
  divMare = document.getElementById('quoteSearchResults');
  quotePopUp = document.getElementById('quotePopUp');
  popUpQuote = document.getElementById('popUpQuote');
  popUpAuthor = document.getElementById('popUpAuthor');
  arrowLeft = document.getElementById('goBack');
  listaJos = document.querySelectorAll('.quoteInTheListText');
  isLightMode = localStorage.getItem('LIGHT_MODE') === 'true';
  parent = window.ReactNativeWebView;

  document.addEventListener('message', e => {
    localStorage.setItem('favoriteQuotes', JSON.stringify(e.data));
    favorites = JSON.parse(e.data) || [];
  });

  setColors();
  randomQuote();
  randomQuoteList();
});

function showResults() {
  fetch('https://programming-quotes-api.herokuapp.com/authors')
    .then(res => res.json())
    .then(data => {
      actuallyShowResults(data);
    });
}

function actuallyShowResults(data) {
  const value = searchInput.value;
  if (index == 0) moveDown();
  overlay.style.display = 'flex';
  results.innerHTML = '';
  if (value.length == 0) {
    hideResults();
  }
  showSearchList(data, value);
}

function showSearchList(data, value) {
  for (let i = 0; i < Object.keys(data).length; i++) {
    if (Object.keys(data)[i].toLowerCase().includes(value.toLowerCase())) {
      if (value.length) {
        divResults.style.display = 'flex';
        results.style.display = 'flex';
        lupa.style.borderBottomRightRadius = '0px';
        searchBar.style.borderBottomLeftRadius = '0px';
        X.style.display = 'flex';
        X.style.zIndex = '6';
      }

      const pResult = document.createElement('p');
      pResult.textContent = Object.keys(data)[i];
      results.appendChild(pResult);
      pResult.onclick = () => {
        fetchSearchResults(pResult.innerText);
      };
    }
  }
}

function hideResults() {
  moveUp();

  inputWidth.style.zIndex = 'auto';
  topOverlay.style.display = 'flex';
  rollsX++;
  X.style.xIndex = '10';
  X.style.transform = `rotate(${360 * rollsX}deg)`;
  overlay.style.display = 'none';
  lupa.style.borderBottomRightRadius = '20px';
  searchBar.style.borderBottomLeftRadius = '20px';
}

function moveUp() {
  let up;
  index = 0;

  overlayTop.style.display = 'none';
  lupa.style.zIndex = '5';
  search.style.zIndex = '5';

  let pos = 37;
  clearInterval(up);
  up = setInterval(frame, 5);

  function frame() {
    if (pos < -215) {
      clearInterval(up);
      results.style.display = 'none';
      topOverlay.style.display = 'none';
      deextendSearchBar();
    } else {
      pos -= 6;
      divResults.style.top = pos + 'px';
    }
  }
}

function moveDown() {
  let down;
  index = 1;
  overlayTop.style.display = 'flex';
  lupa.style.zIndex = '6';
  search.style.zIndex = '6';
  overlay.style.zIndex = '4';
  topOverlay.style.display = 'flex';
  let pos = -215;
  down = setInterval(frame, 1);

  function frame() {
    if (pos >= 37) {
      clearInterval(down);
    } else {
      pos += 6;
      divResults.style.top = pos + 'px';
    }
  }
}

function fetchSearchResults(author) {
  hideResults();
  listOfQuotes.style.display = 'none';
  quoteOfTheDay.style.display = 'none';
  searchResults.style.display = 'flex';
  arrowLeft.style.display = 'flex';
  fetch('https://programming-quotes-api.herokuapp.com/quotes/author/' + author)
    .then(res => res.json())
    .then(data => {
      addQuotes(data);
    });
  numeFoarteRandom = 'search';
}

function addQuotes(data) {
  let thelask;
  const quotesListTitle = document.getElementById('quotesListTitle');
  console.log(numeFoarteRandom);

  if (numeFoarteRandom === 'search') {
    thelask = data;
    quotesListTitle.innerText = 'SEARCH RESULTS';
  } else {
    thelask = favorites;
    quotesListTitle.innerText = 'FAVORITE QUOTES';
  }

  let test = 1;

  searchResults.style.display = 'flex';

  divMare.innerHTML = '';
  divMare.style.display = 'flex';
  divMare.style.marginLeft = '0px';

  if (thelask.length === 1) {
    divMare.style.display = 'block';
    divMare.style.marginLeft = '30px';
  }

  for (let i = 0; i < thelask.length; i++) {
    const divMic = document.createElement('div');
    const pQuote = document.createElement('p');
    const openQuote = document.createElement('img');
    const arrowRight = document.createElement('img');

    arrowRight.setAttribute('src', 'resources/ArrowRight.png');
    arrowRight.setAttribute('class', 'ArrowRight');
    openQuote.setAttribute('class', 'closedQuote');
    openQuote.setAttribute(
      'src',
      'https://res.cloudinary.com/multimediarog/image/upload/v1659946687/IFrameApplication/open_voywbb.svg',
    );
    divMic.setAttribute('class', 'quotesSearchResults');
    pQuote.setAttribute('class', 'quoteTextSearchResults');

    if (thelask[i].en.length > 140 && (i + 1) % 2 == test) {
      if (test === 0) test = 1;
      else test = 0;
      divMic.classList.add('quotesSearchResultsBigBoy');
      pQuote.classList.add('quoteTextSearchResultsBigBoy');
    }

    pQuote.innerText = thelask[i].en;

    divMic.appendChild(arrowRight);
    divMic.appendChild(openQuote);
    divMic.appendChild(pQuote);
    divMare.appendChild(divMic);
    setColors();
    divMic.onclick = () => openModal(thelask[i]);
  }
}

function randomQuote() {
  fetch('https://programming-quotes-api.herokuapp.com/quotes/random')
    .then(res => res.json())
    .then(data => {
      if (data.en.length < 130) {
        const LINII2 = document.querySelector('.LINII2');
        LINII2.style.display = 'none';
        randomQuoteData = data;
        const quote = document.getElementById('quote');
        const author = document.getElementById('author');
        quote.innerHTML = data.en;
        author.innerHTML = 'BY ' + data.author.toUpperCase();
      } else {
        randomQuote();
      }
    });
}

let i;

function randomQuoteList() {
  for (i = 0; i < 11; i++) {
    replaceQuotesInList(i);
  }

  // listaJos[i].onclick = () => {
  //     openModal(data)
  // }
}

function replaceQuotesInList(i) {
  const quoteInTheList = document.querySelectorAll('.quoteInTheList');
  const numeRandom = document.querySelectorAll('.quoteInTheListText');
  const linii = document.querySelectorAll('.LINII');
  fetch('https://programming-quotes-api.herokuapp.com/quotes/random')
    .then(res => res.json())
    .then(data => {
      if (data.en.length < 120) {
        quoteInTheList[i].style.alignItems = 'center';
        quoteInTheList[i].style.flexDirection = 'row';
        linii[i].style.display = 'none';
        numeRandom[i].innerHTML = data.en;
        listaJos[i].onclick = () => {
          openModal(data);
        };
      } else {
        replaceQuotesInList(i);
      }
    });
}

let IDK;

function openModal(data = randomQuoteData) {
  quoteMoveUp();

  if (button != undefined) {
    button.style.display = 'none';
  }

  button = document.createElement('button');
  button.innerText = 'ADD TO FAVORITE';
  button.setAttribute('class', 'addToFavorite');

  for (let i = 0; i < favorites.length; i++) {
    if (data.id == favorites[i].id) {
      button.innerText = 'REMOVE FROM FAVORITE';
      button.style.backgroundColor = '#E81A1A';
    }
  }

  quotePopUp.appendChild(button);

  button.onclick = () => {
    addToFavorite(data, button);
  };

  button.setAttribute('data-favorite', 'true');

  quotePopUp.style.display = 'flex';
  quoteOverlay.style.display = 'flex';
  searchBar.style.zIndex = '1';
  lupa.style.zIndex = '1';

  popUpQuote.innerHTML = data.en;
  popUpAuthor.innerHTML = data.author;
}

function hidePopUp() {
  quoteMoveDown();
  const quoteOverlay = document.getElementById('quoteOverlay');
  quoteOverlay.style.display = 'none';
}

function quoteMoveUp() {
  let pos = -800,
    quoteUp;
  quoteUp = setInterval(frame, 5);

  function frame() {
    if (pos === 0) {
      clearInterval(quoteUp);
    } else {
      pos += 10;
      quotePopUp.style.bottom = pos + 'px';
    }
  }
}

function quoteMoveDown() {
  let pos = 0,
    quoteDown;
  quoteDown = setInterval(frame, 5);

  function frame() {
    if (pos === -800) {
      clearInterval(quoteDown);
      quotePopUp.style.display = 'none';
    } else {
      pos -= 10;
      quotePopUp.style.bottom = pos + 'px';
    }
  }
}

function reroll() {
  randomQuote();
  const rerollButton = document.getElementById('reroll');
  rolls++;
  rerollButton.style.transform = `rotate(${360 * rolls}deg)`;
}

function extendSearchBar() {
  search.style.zIndex = '1';
  lupa.style.zIndex = '1';

  let pos = 1,
    sb;
  sb = setInterval(frame, 5);

  function frame() {
    if (pos == 89) {
      clearInterval(sb);
    } else {
      pos += 2;
      searchBar.style.width = pos + '%';
      lupa.style.left = pos - 1 + '%';
    }
  }
  showClearButton();
}

function showClearButton() {
  X.style.display = 'flex';
  X.style.zIndex = '10';
}

function deextendSearchBar() {
  search.style.zIndex = '1';
  lupa.style.zIndex = '1';
  let pos = 89,
    dsb;
  dsb = setInterval(frame, 5);

  function frame() {
    if (pos == 1) {
      clearInterval(dsb);
      searchBar.value = '';
      X.style.display = 'none';
    } else {
      pos -= 2;
      searchBar.style.width = pos + '%';
      lupa.style.left = pos - 1 + '%';
    }
  }
}

function changeAppearance() {
  isLightMode = !isLightMode;
  localStorage.setItem('LIGHT_MODE', isLightMode);
  setColors();
}

function setColors() {
  const type = isLightMode ? 'add' : 'remove';

  const title = document.querySelector('.Title');
  title.classList[type]('TitleLightMode');

  const background = document.getElementById('background');
  background.classList[type]('backgroundLightMode');

  const heart = document.querySelector('.heart');
  heart.classList[type]('heartLightMode');

  const Moon = document.querySelector('.Moon');
  if (type == 'add') {
    Moon.setAttribute('src', 'resources/sun.svg');
  } else {
    Moon.setAttribute(
      'src',
      'https://res.cloudinary.com/multimediarog/image/upload/v1659946689/IFrameApplication/moon_gy2meg.svg',
    );
  }
  Moon.classList[type]('MoonLightMode');

  lupa.classList[type]('LupaLightMode');

  const input = document.querySelector('.input');
  input.classList[type]('inputLightMode');

  const qotd = document.querySelector('.qotd');
  qotd.classList[type]('qotdLightMode');

  const theQuote = document.querySelector('.theQuote');
  theQuote.classList[type]('theQuoteLightMode');

  const quote = document.querySelector('.quote');
  quote.classList[type]('quoteLightMode');

  const author = document.querySelector('.author');
  author.classList[type]('authorLightMode');

  const openQuote = document.querySelector('.openQuote');
  openQuote.classList[type]('openQuoteLightMode');

  const closeQuote = document.querySelector('.closeQuote');
  closeQuote.classList[type]('openQuoteLightMode');

  const reroll = document.querySelector('.reroll');
  reroll.classList[type]('rerollLightMode');

  const listOfQuotesTitle = document.querySelector('.listOfQuotesTitle');
  listOfQuotesTitle.classList[type]('listOfQuotesTitleLightMode');

  const quoteInTheList = document.querySelectorAll('.quoteInTheList');
  for (let i = 0; i < quoteInTheList.length; i++) {
    quoteInTheList[i].classList[type]('quoteInTheListLightMode');
  }

  const quoteInTheListText = document.querySelectorAll('.quoteInTheListText');
  for (let i = 0; i < quoteInTheListText.length; i++) {
    quoteInTheListText[i].classList[type]('quoteInTheListTextLightMode');
  }

  const ArrowRight = document.querySelectorAll('.ArrowRight');
  for (let i = 0; i < ArrowRight.length; i++) {
    ArrowRight[i].classList[type]('ArrowRightLightMode');
  }

  const closedQuote = document.querySelectorAll('.closedQuote');
  for (let i = 0; i < closedQuote.length; i++) {
    closedQuote[i].classList[type]('openQuoteLightMode');
  }

  const popUpX = document.querySelector('.popUpX');
  popUpX.classList[type]('popUpXLightMode');

  const resultBackground = document.querySelector('.resultBackground');
  resultBackground.classList[type]('resultBackgroundLightMode');

  const topSideOverlayWithBackground = document.querySelector(
    '.topSideOverlayWithBackground',
  );
  topSideOverlayWithBackground.classList[type](
    'topSideOverlayWithBackgroundLightMode',
  );

  const TitleOverlay = document.querySelector('.TitleOverlay');
  TitleOverlay.classList[type]('TitleOverlayLightMode');

  const searchResults = document.querySelector('.searchResults');
  searchResults.classList[type]('searchResultsLightMode');

  const quotePopUp = document.querySelector('.quotePopUp');
  quotePopUp.classList[type]('quotePopUpLightMode');

  const popUpQuote = document.querySelector('.popUpQuote');
  popUpQuote.classList[type]('popUpQuoteLightMode');

  const popUpAuthor = document.querySelector('.popUpAuthor');
  popUpAuthor.classList[type]('popUpAuthorLightMode');

  // const addToFavorite = document.querySelector(".addToFavorite")
  // addToFavorite.classList[type]("addToFavoriteLightMode")

  for (let i = 0; i < divMare.children.length; i++) {
    divMare.children[i].classList[type]('quotesSearchResultsLightMode');
    divMare.children[i].lastChild.classList[type](
      'quoteTextSearchResultsLightMode',
    );
  }

  const result = document.querySelector('.result');
  result.classList[type]('resultLightMode');

  const arrowLeft = document.querySelector('.goBack');
  arrowLeft.classList[type]('goBackLightMode');
}

function showFavorites() {
  listOfQuotes.style.display = 'none';
  quoteOfTheDay.style.display = 'none';
  arrowLeft.style.display = 'flex';
  numeFoarteRandom = 'favorite';
  addQuotes();
}

function goBackIsNotAFunction() {
  searchResults.style.display = 'none';
  rollX2++;
  arrowLeft.style.transform = `rotate(${72000 * rollsX}deg)`;
  arrowLeft.style.display = 'none';
  listOfQuotes.style.display = 'flex';
  quoteOfTheDay.style.display = 'flex';
}

function arrowLeftGoesBRRRRRRR() {
  let lmao;

  rollX2++;
  arrowLeft.style.transform = `rotate(${1440 * rollsX}deg)`;

  let pos = 140;
  clearInterval(lmao);
  lmao = setInterval(frame, 5);

  function frame() {
    if (pos == 351) {
      clearInterval(lmao);
    } else {
      pos += 1;
      arrowLeft.style.left = pos + 'px';
    }
  }
}

function goRight() {
  let lmao;

  let pos = 140;
  clearInterval(lmao);
  lmao = setInterval(frame, 5);

  function frame() {
    if (pos == 281) {
      clearInterval(lmao);
      goDown();
    } else {
      pos += 1;
      arrowLeft.style.left = pos + 'px';
    }
  }
}

function goDown() {
  let lmao;

  let pos = 0;
  clearInterval(lmao);
  lmao = setInterval(frame, 5);

  function frame() {
    if (pos == 635) {
      clearInterval(lmao);
      goLeft();
    } else {
      pos += 1;
      arrowLeft.style.top = pos + 'px';
    }
  }
}

function goLeft() {
  let lmao;

  let pos = 281;
  clearInterval(lmao);
  lmao = setInterval(frame, 5);

  function frame() {
    if (pos == -10) {
      clearInterval(lmao);
      goUp();
    } else {
      pos -= 1;
      arrowLeft.style.left = pos + 'px';
    }
  }
}

function goUp() {
  let lmao;

  let pos = 640;
  clearInterval(lmao);
  lmao = setInterval(frame, 5);

  function frame() {
    if (pos == 0) {
      clearInterval(lmao);
      goRightAgain();
    } else {
      pos -= 1;
      arrowLeft.style.top = pos + 'px';
    }
  }
}

function goRightAgain() {
  let lmao;

  let pos = -10;
  clearInterval(lmao);
  lmao = setInterval(frame, 5);

  function frame() {
    if (pos == 140) {
      clearInterval(lmao);
      arrowLeft.style.zIndex = '0';
    } else {
      pos += 1;
      arrowLeft.style.left = pos + 'px';
    }
  }
}

function addToFavorite(data, button) {
  if (!favorites.find(e => e.id === data.id)) {
    button.style.backgroundColor = '#E81A1A';
    button.innerHTML = 'REMOVE FROM FAVORITE';
    const newQuote = {id: data.id, en: data.en, author: data.author};
    favorites.unshift({id: data.id, en: data.en, author: data.author});
    localStorage.setItem('favoriteQuotes', JSON.stringify(favorites));
    parent?.postMessage?.(JSON.stringify([newQuote, 'add']));
  } else {
    removeFromFavorite(data);
  }
}

function removeFromFavorite(data) {
  console.log('removeFromFavorite');
  button.style.background = '#1A73E8';
  button.innerHTML = 'ADD TO FAVORITE';

  const pozitia = favorites.findIndex(e => e.id === data.id);
  const removedQuote = favorites[pozitia];
  if (pozitia > -1) {
    favorites.splice(pozitia, 1);
  }
  localStorage.setItem('favoriteQuotes', JSON.stringify(favorites));
  parent?.postMessage?.(JSON.stringify([removedQuote, 'delete']));

  if (numeFoarteRandom == 'favorite') {
    addQuotes(data);
  }
}
