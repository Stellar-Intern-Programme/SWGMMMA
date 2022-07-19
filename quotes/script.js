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

    console.log(author)

    fetch("https://programming-quotes-api.herokuapp.com/quotes/author/" + author)
      .then((res) => res.json())
      .then((data) => { 
        addQuotes(data)
      });


  }

  function addQuotes(data){    
    let index = 0;
    let test = 1;
    const shorterText = data.filter(quote => quote.en.length < 140)
    const longerText = data.filter(quote => quote.en.length >= 140)
    let diff = 0;
    const shorterBiggerThanLonger = shorterText.length / 2 >= longerText.length
    if(shorterText.length / 2 < longerText.length) {
      diff = longerText.length - (shorterText.length / 2)
    } else diff = (shorterText.length / 2) - longerText.length

    for(let i = 0; i<data.length; i++){
      index++
      console.log(index)

    const selectedQuote = (shorterBiggerThanLonger)

    const divMare = document.getElementById("quoteSearchResults")
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
      
    //   if(data[i+1].en.length < 140 && data[i+2].en.length > 140){
    //   pQuote.style.backgroundColor = "pink"
    // }
    }

    pQuote.innerText = data[i].en;

    divMic.appendChild(arrowRight)
    divMic.appendChild(openQuote)
    divMic.appendChild(pQuote)
    divMare.appendChild(divMic)

    
    
    }
    


  } 