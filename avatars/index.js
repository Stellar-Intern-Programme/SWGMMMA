const PRIVATE_KEY = "2c549285f77b54f6c6ba08dd18c4d7de66678134"
const PUBLIC_KEY = "ead971b9b0e9d9eda3c0fe71e0efcf69"
const IMAGE_NOT_AVAIL = ["http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available", 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708']
let avatarArray = []
const date = Date.now()
let loading;
let current_offset = 0
let fetchLoading
let searchInputValue
let total = 0
let avatarPictures
const key = md5(date + PRIVATE_KEY + PUBLIC_KEY)
let searched
let userProfilePic

window.addEventListener("load", () => {
    userProfilePic = document.getElementById("profilePic")
    userProfilePic.setAttribute('src', (localStorage.getItem('avatarPicture') === "/" || !localStorage.getItem('avatarPicture')) ? 'src/Profile Pic.svg' : localStorage.getItem('avatarPicture'))
    avatarPictures = document.getElementById("avatar-picture")
    loading = document.querySelector('.loading')
    const searchInput = document.getElementById("query")
    searchInputValue = searchInput.value || ""
    searchInput.addEventListener('input', onSearchChange)

    avatarPictures?.addEventListener("scroll", ({ target: { scrollTop, scrollHeight, clientHeight } }) => {
        if (clientHeight + scrollTop >= scrollHeight - 5 && !fetchLoading) showLoading()
    })
    getAvatars()
})

function onSearchChange(e) {
    if (e.target.value === '' && searchInputValue !== '') {
        searchInputValue = e.target.value
        onSearch()
    }
    searchInputValue = e.target.value
}
function showLoading() {
    if (avatarArray.length < total && !fetchLoading) {
        loading.classList.add('show')
        current_offset = current_offset + 100
        getAvatars(current_offset)
    }
}

function getAvatars(offset = 0, search = false) {
    fetchLoading = true
    avatarPictures = document.getElementById("avatar-picture")
    if (offset === 0) {
        for (let i = 0; i < 10; i++) {
            const hero = document.createElement("div")
            hero.classList.add("SuperHero", 'skeleton')
            avatarPictures.append(hero)
        }
    }
    fetch("https://gateway.marvel.com:443/v1/public/characters?apikey=" + PUBLIC_KEY + "&hash=" + key + "&ts=" + date + "&limit=100&offset=" + offset + (searchInputValue?.length ? "&nameStartsWith=" + searchInputValue : ''))
        .then(response => {
            if (!response.ok) throw Error("ERROR")
            return response.json()
        })
        .then((res) => {
            if (offset === 0) {
                avatarPictures.innerHTML = ""
            }
            mapResults(res, search)
        }).catch(e => {
            if (offset === 0) {
                avatarPictures.innerHTML = ""
            }
            fetchLoading = false
            console.error(e)
        })
}


function mapResults(res, search) {
    if (search) avatarPictures.innerHTML = ""
    total = res.data.total
    if (search) avatarArray = res.data.results
    else avatarArray.push(...res.data.results)
    res.data.results.forEach(createImages)
    fetchLoading = false
}

function createImages(result) {
    if (IMAGE_NOT_AVAIL.includes(result.thumbnail.path)) return
    avatarPictures = document.getElementById("avatar-picture")
    const img = document.createElement("img")
    img.setAttribute('src', 'https' + result.thumbnail.path.split('http').join('')+ "." + result.thumbnail.extension)
    img.addEventListener('click', avatarSelect)
    img.setAttribute('alt', "avatar")
    img.setAttribute('class', "SuperHero skeleton")
    img.setAttribute('avatar-name', result.name)
    avatarPictures.appendChild(img)
    loading.classList.remove('show');
}

function avatarSelect(e) {
    if(e.target.src !== userProfilePic.src){
        const avatarRemove = document.getElementById("remove-avatar")
        avatarRemove.classList.add("remove-avatar-bot")
    }
    if(e.target.src === userProfilePic.src){
        const avatarRemove = document.getElementById("remove-avatar")
        avatarRemove.classList.remove("remove-avatar-bot")
    }
    document.querySelector('.pop-up').style.display = 'block'
    document.querySelector('.pop-up img').src = e.target.getAttribute('src')
    document.querySelector(".pop-up p").textContent = e.target.getAttribute('avatar-name')
}

function onSearch() {
    current_offset = 0
    avatarPictures.scrollTo({ top: 0, behavior: 'smooth' })
    getAvatars(current_offset, true)
}

function removePopUp() {
    document.querySelector('.pop-up').style.display = 'none'
    document.querySelector('.pop-up img').src = '/'
}

function profilePic(f) {
    document.querySelector('.pop-up-avatar').style.display = 'block'
    console.log(f)
    document.querySelector('.pop-up-avatar img').src = f.getAttribute('src')

}

function profilePicRemove() {
    document.querySelector('.pop-up-avatar').style.display = 'none'
    document.querySelector('.pop-up-avatar img').src = '/'
}

function changeAvatar() {
    const userProfilePic = document.getElementById("profilePic")
    const popUpPicture = document.getElementById("pop-up-picture")
    const avatarRemove = document.getElementById("remove-avatar")
    avatarRemove.classList.remove("remove-avatar-bot")
    const imgSrc = popUpPicture.getAttribute("src")
    userProfilePic.setAttribute('src', imgSrc)
    localStorage.setItem('avatarPicture', imgSrc)
}

function removeAvatar() {
    const profilePic = document.getElementById("profilePic")
    profilePic.setAttribute('src', "src/Profile Pic.svg")
    localStorage.removeItem('avatarPicture')
    const avatarRemove = document.getElementById("remove-avatar")
    avatarRemove.classList.add("remove-avatar-bot")
}

function md5(inputString) {
    var hc = "0123456789abcdef";
    function rh(n) { var j, s = ""; for (j = 0; j <= 3; j++) s += hc.charAt((n >> (j * 8 + 4)) & 0x0F) + hc.charAt((n >> (j * 8)) & 0x0F); return s; }
    function ad(x, y) { var l = (x & 0xFFFF) + (y & 0xFFFF); var m = (x >> 16) + (y >> 16) + (l >> 16); return (m << 16) | (l & 0xFFFF); }
    function rl(n, c) { return (n << c) | (n >>> (32 - c)); }
    function cm(q, a, b, x, s, t) { return ad(rl(ad(ad(a, q), ad(x, t)), s), b); }
    function ff(a, b, c, d, x, s, t) { return cm((b & c) | ((~b) & d), a, b, x, s, t); }
    function gg(a, b, c, d, x, s, t) { return cm((b & d) | (c & (~d)), a, b, x, s, t); }
    function hh(a, b, c, d, x, s, t) { return cm(b ^ c ^ d, a, b, x, s, t); }
    function ii(a, b, c, d, x, s, t) { return cm(c ^ (b | (~d)), a, b, x, s, t); }
    function sb(x) {
        var i; var nblk = ((x.length + 8) >> 6) + 1; var blks = new Array(nblk * 16); for (i = 0; i < nblk * 16; i++) blks[i] = 0;
        for (i = 0; i < x.length; i++) blks[i >> 2] |= x.charCodeAt(i) << ((i % 4) * 8);
        blks[i >> 2] |= 0x80 << ((i % 4) * 8); blks[nblk * 16 - 2] = x.length * 8; return blks;
    }
    var i, x = sb(inputString), a = 1732584193, b = -271733879, c = -1732584194, d = 271733878, olda, oldb, oldc, oldd;
    for (i = 0; i < x.length; i += 16) {
        olda = a; oldb = b; oldc = c; oldd = d;
        a = ff(a, b, c, d, x[i + 0], 7, -680876936); d = ff(d, a, b, c, x[i + 1], 12, -389564586); c = ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = ff(b, c, d, a, x[i + 3], 22, -1044525330); a = ff(a, b, c, d, x[i + 4], 7, -176418897); d = ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = ff(c, d, a, b, x[i + 6], 17, -1473231341); b = ff(b, c, d, a, x[i + 7], 22, -45705983); a = ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = ff(d, a, b, c, x[i + 9], 12, -1958414417); c = ff(c, d, a, b, x[i + 10], 17, -42063); b = ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = ff(a, b, c, d, x[i + 12], 7, 1804603682); d = ff(d, a, b, c, x[i + 13], 12, -40341101); c = ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = ff(b, c, d, a, x[i + 15], 22, 1236535329); a = gg(a, b, c, d, x[i + 1], 5, -165796510); d = gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = gg(c, d, a, b, x[i + 11], 14, 643717713); b = gg(b, c, d, a, x[i + 0], 20, -373897302); a = gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = gg(d, a, b, c, x[i + 10], 9, 38016083); c = gg(c, d, a, b, x[i + 15], 14, -660478335); b = gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = gg(a, b, c, d, x[i + 9], 5, 568446438); d = gg(d, a, b, c, x[i + 14], 9, -1019803690); c = gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = gg(b, c, d, a, x[i + 8], 20, 1163531501); a = gg(a, b, c, d, x[i + 13], 5, -1444681467); d = gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = gg(c, d, a, b, x[i + 7], 14, 1735328473); b = gg(b, c, d, a, x[i + 12], 20, -1926607734); a = hh(a, b, c, d, x[i + 5], 4, -378558);
        d = hh(d, a, b, c, x[i + 8], 11, -2022574463); c = hh(c, d, a, b, x[i + 11], 16, 1839030562); b = hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = hh(a, b, c, d, x[i + 1], 4, -1530992060); d = hh(d, a, b, c, x[i + 4], 11, 1272893353); c = hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = hh(b, c, d, a, x[i + 10], 23, -1094730640); a = hh(a, b, c, d, x[i + 13], 4, 681279174); d = hh(d, a, b, c, x[i + 0], 11, -358537222);
        c = hh(c, d, a, b, x[i + 3], 16, -722521979); b = hh(b, c, d, a, x[i + 6], 23, 76029189); a = hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = hh(d, a, b, c, x[i + 12], 11, -421815835); c = hh(c, d, a, b, x[i + 15], 16, 530742520); b = hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = ii(a, b, c, d, x[i + 0], 6, -198630844); d = ii(d, a, b, c, x[i + 7], 10, 1126891415); c = ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = ii(b, c, d, a, x[i + 5], 21, -57434055); a = ii(a, b, c, d, x[i + 12], 6, 1700485571); d = ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = ii(c, d, a, b, x[i + 10], 15, -1051523); b = ii(b, c, d, a, x[i + 1], 21, -2054922799); a = ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = ii(d, a, b, c, x[i + 15], 10, -30611744); c = ii(c, d, a, b, x[i + 6], 15, -1560198380); b = ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = ii(a, b, c, d, x[i + 4], 6, -145523070); d = ii(d, a, b, c, x[i + 11], 10, -1120210379); c = ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = ii(b, c, d, a, x[i + 9], 21, -343485551); a = ad(a, olda); b = ad(b, oldb); c = ad(c, oldc); d = ad(d, oldd);
    }
    return rh(a) + rh(b) + rh(c) + rh(d);
}


