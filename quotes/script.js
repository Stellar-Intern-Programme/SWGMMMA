let index = 0;
let overlay, value, divResults, searchBar, results, lupa, X, searchInput, topOverlay, inputWidth, overlayTop, quote, quoteOfTheDay, listOfQuotes, searchResults, divMare, quotePopUp, popUpQuote, popUpAuthor
let randomQuoteData;
let rolls = 0;
let isLightMode
const MAX_COUNT = 50
    // add to fave / remove from fave
    // change images
    // dont fetch quote if there is a current one saved
    // show favorite quotes
    // fix search
    // click pe alea din search
    // modalitate sa go back to homepage

window.addEventListener("load", () => {
    overlay = document.getElementById("overlay")
    searchInput = document.getElementById("search")
    divResults = document.getElementById("resultBackground")
    searchBar = document.getElementById("search")
    results = document.getElementById("result")
    lupa = document.getElementById("Lupa")
    X = document.getElementById("X")
    topOverlay = document.getElementById("topSideOverlayWithBackground")
    inputWidth = document.getElementById("inputWidth")
    overlayTop = document.getElementById("overlayTop")
    quote = document.getElementById("quote")
    quoteOfTheDay = document.getElementById("quoteOfTheDay")
    listOfQuotes = document.getElementById("listOfQuotes")
    searchResults = document.getElementById("searchResults")
    divMare = document.getElementById("quoteSearchResults")
    quotePopUp = document.getElementById("quotePopUp")
    popUpQuote = document.getElementById("popUpQuote")
    popUpAuthor = document.getElementById("popUpAuthor")
    isLightMode = localStorage.getItem("LIGHT_MODE") === 'true'
    setColors()
    randomQuote()
});

function showResults() {
    fetch("https://programming-quotes-api.herokuapp.com/authors")
        .then((res) => res.json())
        .then((data) => {
            actuallyShowResults(data)
        });
}

function actuallyShowResults(data) {
    const value = searchInput.value
    if (index == 0) moveDown()
    overlay.style.display = "flex"
    results.innerHTML = ""
    if (value.length == 0) {
        hideResults()
    }
    showSearchList(data, value)
}

function showSearchList(data, value) {
    for (let i = 0; i < Object.keys(data).length; i++) {
        if (Object.keys(data)[i].toLowerCase().includes(value.toLowerCase())) {
            if (value.length) {
                divResults.style.display = "flex"
                results.style.display = "flex"
                lupa.style.borderBottomRightRadius = "0px";
                searchBar.style.borderBottomLeftRadius = "0px";
                X.style.display = "flex"
                X.style.zIndex = "6"
            }

            const pResult = document.createElement("p")
            pResult.textContent = Object.keys(data)[i]
            results.appendChild(pResult)
            pResult.onclick = () => {
                fetchSearchResults(pResult.innerText);
            }
        }
    }
}

function hideResults() {
    moveUp()
    inputWidth.style.zIndex = "auto"
    topOverlay.style.display = "flex"
    X.style.display = "none"
    overlay.style.display = "none"
    lupa.style.borderBottomRightRadius = "20px";
    searchBar.style.borderBottomLeftRadius = "20px";
}

function moveUp() {
    let up;
    index = 0

    overlayTop.style.display = "none"
    lupa.style.zIndex = "5"
    search.style.zIndex = "5"

    let pos = 37;
    clearInterval(up);
    up = setInterval(frame, 5);

    function frame() {
        if (pos < -215) {
            clearInterval(up);
            results.style.display = "none"
            topOverlay.style.display = "none"
            deextendSearchBar()
        } else {
            pos -= 6;
            divResults.style.top = pos + 'px';
        }
    }
}

function moveDown() {
    let down;
    index = 1
    overlayTop.style.display = "flex"
    lupa.style.zIndex = "6"
    search.style.zIndex = "6"
    overlay.style.zIndex = "4"
    topOverlay.style.display = "flex"
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
    hideResults()
    listOfQuotes.style.display = "none"
    quoteOfTheDay.style.display = "none"
    searchResults.style.display = "flex"
    fetch("https://programming-quotes-api.herokuapp.com/quotes/author/" + author)
        .then((res) => res.json())
        .then((data) => {
            addQuotes(data)
        });
}

function addQuotes(data) {
    let test = 1;

    divMare.innerHTML = ""
    divMare.style.display = "flex"
    divMare.style.marginLeft = "0px"

    if (data.length === 1) {
        divMare.style.display = "block"
        divMare.style.marginLeft = "30px"
    }

    for (let i = 0; i < data.length; i++) {
        const divMic = document.createElement("div")
        const pQuote = document.createElement("p")
        const openQuote = document.createElement("img")
        const arrowRight = document.createElement("img")

        arrowRight.setAttribute("src", "resources/ArrowRight.png")
        arrowRight.setAttribute("class", "ArrowRight")
        openQuote.setAttribute("class", "closedQuote")
        openQuote.setAttribute("src", "resources/open.png")
        divMic.setAttribute("class", "quotesSearchResults")
        pQuote.setAttribute("class", "quoteTextSearchResults")

        if (data[i].en.length > 140 && (i + 1) % 2 == test) {
            if (test === 0) test = 1
            else test = 0
            divMic.classList.add("quotesSearchResultsBigBoy")
            pQuote.classList.add("quoteTextSearchResultsBigBoy")
        }

        pQuote.innerText = data[i].en;

        divMic.appendChild(arrowRight)
        divMic.appendChild(openQuote)
        divMic.appendChild(pQuote)
        divMare.appendChild(divMic)
        setColors()
        divMic.onclick = () => openModal(data[i])
    }
}

function randomQuote() {
    fetch("https://programming-quotes-api.herokuapp.com/quotes/random")
        .then((res) => res.json())
        .then((data) => {
            randomQuoteData = data
            const quote = document.getElementById("quote")
            const author = document.getElementById("author")
            quote.innerHTML = data.en
            author.innerHTML = "BY " + data.author.toUpperCase();
        });
}

function openModal(data = randomQuoteData) {
    quoteMoveUp()
    quotePopUp.style.display = "flex"
    quoteOverlay.style.display = "flex"
    searchBar.style.zIndex = "1"
    lupa.style.zIndex = "1"

    popUpQuote.innerHTML = data.en
    popUpAuthor.innerHTML = data.author
}

function hidePopUp() {
    quoteMoveDown()
    const quoteOverlay = document.getElementById("quoteOverlay");
    quoteOverlay.style.display = "none"
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
            quotePopUp.style.display = "none"
        } else {
            pos -= 10;
            quotePopUp.style.bottom = pos + 'px';
        }
    }
}

function reroll() {
    randomQuote()
    const rerollButton = document.getElementById("reroll")
    rolls++
    rerollButton.style.transform = `rotate(${360*rolls}deg)`
}


function extendSearchBar() {

    search.style.zIndex = "1"
    lupa.style.zIndex = "1"

    let pos = 1,
        sb;
    sb = setInterval(frame, 5);

    function frame() {
        if (pos == 89) {
            clearInterval(sb);
        } else {
            pos += 2;
            searchBar.style.width = pos + '%';
            lupa.style.left = pos - 1 + '%'
        }
    }
    showClearButton()
}

function showClearButton() {
    const x = document.getElementById("X")
    x.style.display = "flex"
    x.style.zIndex = "1"
}


function deextendSearchBar() {
    search.style.zIndex = "1"
    lupa.style.zIndex = "1"
    let pos = 89,
        dsb;
    dsb = setInterval(frame, 5);

    function frame() {
        if (pos == 1) {
            clearInterval(dsb);
            searchBar.value = ""
        } else {
            pos -= 2;
            searchBar.style.width = pos + '%';
            lupa.style.left = pos - 1 + '%'
        }
    }
}

function changeAppearance() {
    isLightMode = !isLightMode
    localStorage.setItem("LIGHT_MODE", isLightMode)
    setColors()
}

function setColors() {
    const type = isLightMode ? 'add' : 'remove'

    const title = document.querySelector(".Title")
    title.classList[type]("TitleLightMode")

    const background = document.getElementById("background")
    background.classList[type]("backgroundLightMode")

    const heart = document.querySelector(".heart")
    heart.classList[type]("heartLightMode")

    const Moon = document.querySelector(".Moon")
    Moon.setAttribute("src", "resources/LightMode.png")
    Moon.classList[type]("MoonLightMode")

    lupa.classList[type]("LupaLightMode")

    const input = document.querySelector(".input")
    input.classList[type]("inputLightMode")

    const qotd = document.querySelector(".qotd")
    qotd.classList[type]("qotdLightMode")

    const theQuote = document.querySelector(".theQuote")
    theQuote.classList[type]("theQuoteLightMode")

    const quote = document.querySelector(".quote")
    quote.classList[type]("quoteLightMode")

    const author = document.querySelector(".author")
    author.classList[type]("authorLightMode")

    const openQuote = document.querySelector(".openQuote")
    openQuote.setAttribute("src", "resources/openLightMode.png")

    const closeQuote = document.querySelector(".closeQuote")
    closeQuote.setAttribute("src", "resources/closeLightMode.png")

    const reroll = document.querySelector(".reroll")
    reroll.classList[type]("rerollLightMode")

    const listOfQuotesTitle = document.querySelector(".listOfQuotesTitle")
    listOfQuotesTitle.classList[type]("listOfQuotesTitleLightMode")

    const quoteInTheList = document.querySelectorAll(".quoteInTheList")
    for (let i = 0; i < quoteInTheList.length; i++) {
        quoteInTheList[i].classList[type]("quoteInTheListLightMode")
    }

    const quoteInTheListText = document.querySelectorAll(".quoteInTheListText")
    for (let i = 0; i < quoteInTheListText.length; i++) {
        quoteInTheListText[i].classList[type]("quoteInTheListTextLightMode")
    }

    const ArrowRight = document.querySelectorAll(".ArrowRight")
    for (let i = 0; i < ArrowRight.length; i++) {
        ArrowRight[i].classList[type]("ArrowRightLightMode")
    }

    const closedQuote = document.querySelectorAll(".closedQuote")
    for (let i = 0; i < closedQuote.length; i++) {
        closedQuote[i].setAttribute("src", "resources/closeLightMode.png")
    }

    const resultBackground = document.querySelector(".resultBackground")
    resultBackground.classList[type]("resultBackgroundLightMode")

    const topSideOverlayWithBackground = document.querySelector(".topSideOverlayWithBackground")
    topSideOverlayWithBackground.classList[type]("topSideOverlayWithBackgroundLightMode")

    const TitleOverlay = document.querySelector(".TitleOverlay")
    TitleOverlay.classList[type]("TitleOverlayLightMode")

    const searchResults = document.querySelector(".searchResults")
    searchResults.classList[type]("searchResultsLightMode")

    const quotePopUp = document.querySelector(".quotePopUp")
    quotePopUp.classList[type]("quotePopUpLightMode")

    const popUpQuote = document.querySelector(".popUpQuote")
    popUpQuote.classList[type]("popUpQuoteLightMode")

    const popUpAuthor = document.querySelector(".popUpAuthor")
    popUpAuthor.classList[type]("popUpAuthorLightMode")

    const addToFavorite = document.querySelector(".addToFavorite")
    addToFavorite.classList[type]("addToFavoriteLightMode")

    for (let i = 0; i < divMare.children.length; i++) {
        divMare.children[i].classList[type]("quotesSearchResultsLightMode")
        divMare.children[i].lastChild.classList[type]("quoteTextSearchResultsLightMode")
    }
}