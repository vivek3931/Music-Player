let playpauseIcon = document.querySelector(".play");
playpauseIcon.setAttribute('tabindex', '0');
let forward = document.querySelector(".forward");
let backward = document.querySelector(".backward");
let singerName = document.querySelector("#title");
let progressBar = document.querySelector(".progress");
let realTime = document.querySelector("#current-time");
let duration = document.querySelector("#duration");
let coverImg = document.querySelector("#cover");
let miniImg = document.querySelector("#mini-img");
let loader = document.querySelector(".loader-container");
let musicContainer = document.querySelector(".container");
let gif = document.querySelector('.gif');

window.addEventListener('load', () => {
    loader.style.display = "";
    loader.style.opacity = 0;
    loader.remove();
    setSongs();
});
function getSongs() {
    musicContainer.innerHTML = localStorage.getItem('music');
}
// getSongs();
function setSongs() {
    localStorage.setItem('music', musicContainer.innerHTML);
}

let songIndex = 0;
let songs = [
    { name: "Moonlight - By Harnoor , llham", filepath: "./music/Moonlight.mpeg", coverpath: "./img/moonlight.png" },
    { name: "Apa fer milaange - By Savi Kahlon , The Masterz", filepath: "./music/Apa fer milaange.mpeg", coverpath: "./img/apa_fer_milange.png" },
    { name: "Departure Lane - By Talha Anjum , Umair", filepath: "./music/Departure Lane.mpeg", coverpath: "./img/departure_lane.png" },
    { name: "Ishq hai - By Anurag Sakia , Raj Shekhar", filepath: "./music/Ishq hai.mpeg", coverpath: "./img/ishq_hai.png" },
    { name: "Kina Chir - By The PropheC", filepath: "./music/Kinna Chir.mpeg", coverpath: "./img/kina_chir.png" },
    { name: "Tujhe Kitna Chahne - By Arjit Singh , Mithoon", filepath: "./music/Tujhe kitna chahne lage hum.mpeg", coverpath: "./img/kitna_chahne.png" },
    { name: "Pal - By Javed-Mohsin , Arjit Singh", filepath: "./music/Pal.mpeg", coverpath: "./img/pal.png" },
    { name: "Raanjhan - By Sachet-Parampara , Tandon", filepath: "./music/Raanjhan.mpeg", coverpath: "./img/raanjhan.png" },
    { name: "Rubicon Drill - By Laddi Chahal , Parmish Verma", filepath: "./music/Rubicon Drill.mpeg", coverpath: "./img/rubicon_drill.png" },
    { name: "Soulmate - By Badshah , Arjit Singh", filepath: "./music/Soulmate.mpeg", coverpath: "./img/soulmate.png" },
    { name: "Tum Se - By Sachin-Jigar , Raghav Chaitainya", filepath: "./music/Tum Se.mpeg", coverpath: "./img/tum_se.png" },
    { name: "Dil Tu Jaan Tu  - Gurnazar , Chet Singh", filepath: "./music/Dil tu.mpeg", coverpath: "./img/dil_tu.jpeg" },
];

let audio = new Audio(songs[songIndex].filepath);
let nextAudio = new Audio(songs[(songIndex + 1) % songs.length].filepath);

audio.addEventListener('timeupdate', () => {
    const minutes = Math.floor(audio.currentTime / 60);
    const remainingSeconds = Math.floor(audio.currentTime % 60);
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    realTime.innerText = `${minutes}:${formattedSeconds}`;

    const totalMinutes = Math.floor(audio.duration / 60);
    const totalSeconds = Math.round(audio.duration % 60);
    const formattedTotalSeconds = String(totalSeconds).padStart(2, '0');
    duration.innerText = `${totalMinutes}:${formattedTotalSeconds}`;

    let progress = parseInt((audio.currentTime / audio.duration) * 100);
    progressBar.value = progress;

    setTimeout(updateContainer, 3000);
    setSongs();
});
function opacity() {
    if (playpauseIcon.classList.contains('fa-play')) {
        gif.style.opacity = "0"
    }
    else {
        gif.style.opacity = "1"
    }

}

function updateContainer() {

    if (audio.duration === audio.currentTime) {
        songIndex = (songIndex + 1) % songs.length;
        audio.src = songs[songIndex].filepath;
        audio.load();
        audio.play();
        playpauseIcon.classList.remove("fa-play");
        playpauseIcon.classList.add("fa-pause");
        singerName.innerText = songs[songIndex].name;
        coverImg.src = songs[songIndex].coverpath;
        miniImg.src = songs[songIndex].coverpath;
        let nextIndex = (songIndex + 1) % songs.length;
        nextAudio.src = songs[nextIndex].filepath;
        nextAudio.load();
        localStorage.setItem('songIndex', songIndex);
        setSongs();
    }
}

progressBar.addEventListener('input', () => {
    audio.currentTime = progressBar.value * audio.duration / 100;
    setSongs();
});

forward.addEventListener('click', () => {

    songIndex = (songIndex + 1) % songs.length;
    audio.src = songs[songIndex].filepath;
    audio.load();
    audio.play();
    playpauseIcon.classList.remove("fa-play");
    playpauseIcon.classList.add("fa-pause");
    singerName.innerText = songs[songIndex].name;
    coverImg.src = songs[songIndex].coverpath;
    miniImg.src = songs[songIndex].coverpath;
    let nextIndex = (songIndex + 1) % songs.length;
    nextAudio.src = songs[nextIndex].filepath;
    nextAudio.load();
    localStorage.setItem('songIndex', songIndex);
    setSongs();
    opacity();

});

backward.addEventListener('click', () => {

    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audio.src = songs[songIndex].filepath;
    audio.load();
    audio.play();
    playpauseIcon.classList.remove("fa-play");
    playpauseIcon.classList.add("fa-pause");
    singerName.innerText = songs[songIndex].name;
    coverImg.src = songs[songIndex].coverpath;
    miniImg.src = songs[songIndex].coverpath;
    let nextIndex = (songIndex + 1) % songs.length;
    nextAudio.src = songs[nextIndex].filepath;
    nextAudio.load();
    localStorage.setItem('songIndex', songIndex);
    setSongs();
    opacity();
});

playpauseIcon.addEventListener('click', () => {

    playpauseIcon.style.transition = "all 0.4s ease-in-out"
    if (playpauseIcon.classList.contains("fa-play")) {
        playpauseIcon.classList.remove("fa-play");
        playpauseIcon.classList.add("fa-pause");
        audio.play();
    } else {
        playpauseIcon.classList.remove("fa-pause");
        playpauseIcon.classList.add("fa-play");
        audio.pause();
    }
    opacity();
    setSongs();
});

playpauseIcon.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
        event.preventDefault();
        if (playpauseIcon.classList.contains("fa-play")) {
            playpauseIcon.classList.remove("fa-play");
            playpauseIcon.classList.add("fa-pause");
            audio.play();
        } else {
            playpauseIcon.classList.remove("fa-pause");
            playpauseIcon.classList.add("fa-play");
            audio.pause();
        }
    }
    setSongs();
    opacity();
});