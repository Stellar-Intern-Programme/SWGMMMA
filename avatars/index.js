function avatarSelect(e){
        document.querySelector('.pop-up').style.display = 'block'
        document.querySelector('.pop-up img').src = e.getAttribute('src')

}
function removePopUp(){
    document.querySelector('.pop-up').style.display = 'none'
    document.querySelector('.pop-up img').src = ''
}


    

