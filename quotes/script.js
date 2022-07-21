let index = 0;


function showResults(){
    fetch("https://programming-quotes-api.herokuapp.com/authors")
      .then((res) => res.json())
      .then((data) => { 
        actuallyShowResults(data)
      });
      
    }

function actuallyShowResults(data){
  
  const overlay = document.getElementById("overlay")
  const value = document.getElementById("search").value
  const divResults = document.getElementById("resultBackground")
  const searchBar = document.getElementById("search")
  const results = document.getElementById("result")
  const lupa = document.getElementById("Lupa")
  const X = document.getElementById("X")
  const inputWidth = document.getElementById("inputWidth")

  if(index == 0){
    moveDown()
    index = 1
  }

  overlay.style.display= "flex"

  results.innerHTML = ""

  if(value.length == 0){
    hideResults()
  }

  for(let i=0; i<Object.keys(data).length; i++ ){

    if(Object.keys(data)[i].toLowerCase().includes(value.toLowerCase())){
      if(value.length>0){
        divResults.style.display= "flex"
        lupa.style.borderBottomRightRadius = "0px";
        searchBar.style.borderBottomLeftRadius = "0px";
        X.style.display= "flex"
        X.style.zIndex = "6"
      }

      const pResult = document.createElement("p")
      pResult.textContent = Object.keys(data)[i]
      results.appendChild(pResult)
      pResult.onclick = () => {
        
        const author = pResult.innerText;
        searchResults(author);

      }
    }
  }

}

function hideResults(){
  moveUp()
  const topOverlay = document.getElementById("topSideOverlayWithBackground")
  const overlay = document.getElementById("overlay")
  const divResults = document.getElementById("resultBackground")
  const lupa = document.getElementById("Lupa")
  const searchBar = document.getElementById("search")
  const X = document.getElementById("X")
  const inputWidth = document.getElementById("inputWidth")
  
  const quotePopUp = document.getElementById("quotePopUp")

  inputWidth.style.zIndex = "auto"

  topOverlay.style.display = "flex" 
  X.style.display= "none"
  overlay.style.display= "none"
  lupa.style.borderBottomRightRadius = "20px";
  searchBar.style.borderBottomLeftRadius = "20px";

}

 var up = null;

function moveUp() {
  index = 0
  const overlayTop = document.getElementById("overlayTop")
  const search = document.getElementById("search")
    const lupa = document.getElementById("Lupa")
    const results = document.getElementById("resultBackground")
    const topSide = document.getElementById("topSideOverlayWithBackground")

  overlayTop.style.display = "none"
  lupa.style.zIndex = "5"
  search.style.zIndex = "5"


  var elem = document.getElementById("resultBackground");
  var pos = 37;
  clearInterval(up);
  up = setInterval(frame, 5);
  function frame() {
    if (pos  < -215) {
      clearInterval(up);
      results.style.display = "none"
      topSide.style.display = "none"
      deextendSearchBar()
    } else {
      pos-= 6;
      elem.style.top = pos + 'px';
    }
  }

}

var down = null;

function moveDown() {
    const overlayTop = document.getElementById("overlayTop")
    const topOverlay = document.getElementById("topSideOverlayWithBackground")
    const overlay = document.getElementById("overlay")
    const search = document.getElementById("search")
    const lupa = document.getElementById("Lupa")

    overlayTop.style.display = "flex"
    lupa.style.zIndex = "6"
    search.style.zIndex = "6"
    overlay.style.zIndex = "4"
    topOverlay.style.display = "flex" 

    var elem = document.getElementById("resultBackground");
    var pos = -215;
    clearInterval(down);
    down = setInterval(frame, 1);
    function frame() {
      if (pos  >= 37) {
        clearInterval(down);
      } else {
        pos+=6;
        elem.style.top = pos + 'px';
      }
    }
  }

  function searchResults(author){
    hideResults()
    const qouteOfTheDay = document.getElementById("quoteOfTheDay")
    const listOfQuotes = document.getElementById("listOfQuotes")
    const searchResults = document.getElementById("searchResults")

    listOfQuotes.style.display = "none"
    qouteOfTheDay.style.display = "none"
    searchResults.style.display = "flex"

    fetch("https://programming-quotes-api.herokuapp.com/quotes/author/" + author)
      .then((res) => res.json())
      .then((data) => { 
        addQuotes(data)
      });


  }

  function addQuotes(data){    
    let index = 0;
    let test = 1;

    const divMare = document.getElementById("quoteSearchResults")
    
    divMare.innerHTML = ""

    divMare.style.display = "flex"
    divMare.style.marginLeft = "0px"
    
    let i

    for(i = 0; i<data.length; i++){
      index++

    
    const divMic = document.createElement("div")
    const pQuote = document.createElement("p")
    const openQuote = document.createElement("img")
    const arrowRight = document.createElement("img")

    arrowRight.setAttribute("src", "resources/ArrowRight.png")
    arrowRight.setAttribute("class", "ArrowRight")
    openQuote.setAttribute("src", "resources/open.png")
    openQuote.setAttribute("class", "closedQuote")
    
    if(data[i].en.length > 140 && index%2 == test){
      if(test == 0){
        test = 1
      }
      else{
        test = 0
      }
      divMic.setAttribute("class", "quotesSearchResultsBigBoy")
      pQuote.setAttribute("class", "quoteTextSearchResultsBigBoy")

    }
    else{
      divMic.setAttribute("class", "quotesSearchResults")
      pQuote.setAttribute("class", "quoteTextSearchResults")
    }

    pQuote.innerText = data[i].en;

    divMic.appendChild(arrowRight)
    divMic.appendChild(openQuote)
    divMic.appendChild(pQuote)
    divMare.appendChild(divMic)

    
    
    }
    
  if(i == 1){
    divMare.style.display= "block"
    divMare.style.marginLeft = "30px"
  }

  } 
  
let id
let en

  window.addEventListener("load", () => {
    fetch("https://programming-quotes-api.herokuapp.com/quotes/random")
      .then((res) => res.json())
      .then((data) => {
      
        id = data.id
        const rerollButton = document.getElementById("reroll")
        const quote = document.getElementById("quote")
        const author = document.getElementById("author")
        quote.innerHTML = data.en
        author.innerHTML = "BY " + data.author.toUpperCase();

        
      });
    
  });

  function mainPageQuotePopUp(){
    fetch("https://programming-quotes-api.herokuapp.com/quotes/" + id)
      .then((res) => res.json())
      .then((data) => {
      openModal(data)
      });
  }

  function openModal(data){
    quoteMoveUp()
    const quotePopUp = document.getElementById("quotePopUp")
    quotePopUp.style.display = "flex"

    const overlay = document.getElementById("quoteOverlay")
    quoteOverlay.style.display = "flex"

    const popUpQuote = document.getElementById("popUpQuote")
    const popUpAuthor = document.getElementById("popUpAuthor")

    popUpQuote.innerHTML = ""
    popUpQuote.innerHTML = data.en

    popUpAuthor.innerHTML = ""
    popUpAuthor.innerHTML = data.author

    const search = document.getElementById("search")
    search.style.zIndex = "1"
    const lupa = document.getElementById("Lupa")
    lupa.style.zIndex = "1"
  }

  function hidePopUp(){
      quoteMoveDown()
      const quoteOverlay = document.getElementById("quoteOverlay");
      quoteOverlay.style.display = "none"
  
  }

var quoteUp = null  

  function quoteMoveUp() {
  
    var elem = document.getElementById("quotePopUp");
    var pos = 843;
    clearInterval(quoteUp);
    quoteUp = setInterval(frame, 5);
    function frame() {
      if (pos  < 238) {
        clearInterval(quoteUp);
      } else {
        pos-= 10;
        elem.style.top = pos + 'px';
      }
    }
  
  }

  var quoteDown = null

  function quoteMoveDown(){

    var elem = document.getElementById("quotePopUp");
    var pos = 238;
    clearInterval(quoteDown);
    quoteDown = setInterval(frame, 5);
    function frame() {
      if (pos  >= 843) {
        clearInterval(quoteDown);
        elem.style.display = "none"
      } else {
        pos+= 10;
        elem.style.top = pos + 'px';
      }
    }
  }

let rolls = 0;

  function reroll(en){
    fetch("https://programming-quotes-api.herokuapp.com/quotes/random")
    .then((res) => res.json())
    .then((data) => {
    
      id = data.id
      const rerollButton = document.getElementById("reroll")
      const quote = document.getElementById("quote")
      const author = document.getElementById("author")
      quote.innerHTML = data.en
      author.innerHTML = "BY " + data.author.toUpperCase();
      rolls++
      rerollButton.style.transform = `rotate(${180*rolls}deg)`
    });
  } 

  var sb = null;

  function extendSearchBar(){
    var elem = document.getElementById("search");
    var lupa = document.getElementById("Lupa")

    search.style.zIndex = "1"
    lupa.style.zIndex = "1"

    var pos = 1;
    clearInterval(sb);
    sb = setInterval(frame, 5);
    function frame() {
      if (pos == 89) {
        clearInterval(sb);
      } else {
        pos+= 2;
        elem.style.width = pos + '%';
        lupa.style.left = pos-1 + '%'
      }
    }

    x()
  }

  function x(){
    const x = document.getElementById("X")
    x.style.display = "flex"
    x.style.zIndex = "1"
    
  }

var dsb = null;

function deextendSearchBar(){
  var elem = document.getElementById("search");
  var lupa = document.getElementById("Lupa")

    search.style.zIndex = "1"
    lupa.style.zIndex = "1"

    var pos = 89;
    clearInterval(dsb);
    dsb = setInterval(frame, 5);
    function frame() {
      if (pos == 1) {
        clearInterval(dsb);
        const searchBar = document.getElementById("search")
        searchBar.value = ""
      } else {
        pos-= 2;
        elem.style.width = pos + '%';
        lupa.style.left = pos-1 + '%'
      }
    }
}

function LightMode(){
  
  const title = document.querySelector(".Title")
  title.classList.remove("Title")
  title.classList.add("TitleLightMode")

  const background = document.getElementById("background")
  background.classList.remove("background")
  background.classList.add("backgroundLightMode")

  const heart = document.querySelector(".heart")
  heart.classList.remove("heart")
  heart.classList.add("heartLightMode")

  const Moon = document.querySelector(".Moon")
  Moon.setAttribute("src", "resources/LightMode.png")
  Moon.classList.remove("Moon")
  Moon.classList.add("MoonLightMode")

  const lupa = document.querySelector(".Lupa")
  lupa.classList.remove("Lupa")
  lupa.classList.add("LupaLightMode")

  const input = document.querySelector(".input")
  input.classList.remove("input")
  input.classList.add("inputLightMode")

  const qotd = document.querySelector(".qotd")
  qotd.classList.remove("qotd")
  qotd.classList.add("qotdLightMode")

  const theQuote = document.querySelector(".theQuote")
  theQuote.classList.remove("theQuote")
  theQuote.classList.add("theQuoteLightMode")

  const quote = document.querySelector(".quote")
  quote.classList.remove("quote")
  quote.classList.add("quoteLightMode")

  const author = document.querySelector(".author")
  author.classList.remove("author")
  author.classList.add("authorLightMode")

  const openQuote = document.querySelector(".openQuote")
  openQuote.setAttribute("src", "resources/openLightMode.png")

  const closeQuote = document.querySelector(".closeQuote")
  closeQuote.setAttribute("src", "resources/closeLightMode.png")

  const reroll = document.querySelector(".reroll")
  reroll.classList.remove("reroll")
  reroll.classList.add("rerollLightMode")

  const listOfQuotesTitle = document.querySelector(".listOfQuotesTitle")
  listOfQuotesTitle.classList.remove("listOfQuotesTitle")
  listOfQuotesTitle.classList.add("listOfQuotesTitleLightMode")

  const quoteInTheList = document.querySelectorAll(".quoteInTheList")
  for(let i = 0; i<5; i++){
    
  quoteInTheList[i].classList.remove("quoteInTheList")
  quoteInTheList[i].classList.add("quoteInTheListLightMode")
  }

  const quoteInTheListText = document.querySelectorAll(".quoteInTheListText")
  for(let i = 0; i<5; i++){
  quoteInTheListText[i].classList.remove("quoteInTheListText")
  quoteInTheListText[i].classList.add("quoteInTheListTextLightMode")
  }

  const ArrowRight = document.querySelectorAll(".ArrowRight")
  for(let i = 0; i<5; i++){
    ArrowRight[i].classList.remove("ArrowRight")
    ArrowRight[i].classList.add("ArrowRightLightMode")
  }

  const closedQuote = document.querySelectorAll(".closedQuote")
  for(let i = 0; i<5; i++){
    closedQuote[i].setAttribute("src", "resources/closeLightMode.png")
 
  }
  
}

