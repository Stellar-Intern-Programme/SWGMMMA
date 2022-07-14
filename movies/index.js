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
