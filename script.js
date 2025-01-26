let playpauseIcon = document.querySelector(".play");
let forward = document.querySelector(".forward");
let backward = document.querySelector(".play");
let singerName = document.querySelector("#title");
let progressBar = document.querySelector(".progress");
let realTime = document.querySelector("#current-time");
let duration = document.querySelector("#duration");
let coverImg = document.querySelector("#cover");
let miniImg = document.querySelector("#mini-img");

let songIndex = 0;
let songs = [
    { name: "Rangin Sapne - By duck", filepath: "./music/rangin-sapne-colorful-dreams-207648.mp3", coverpath: "./img/music_1.png" },
    { name: "Tere Sang - By cat", filepath: "./music/tere-sang-with-you-207644.mp3", coverpath: "./img/music_2.jpg" },
    { name: "song 3 - By dog", filepath: "./music/rangin-sapne-colorful-dreams-207648.mp3", coverpath: "./img/music_3.png" },
]

let audio = new Audio(songs[0].filepath);

playpauseIcon.addEventListener('click', () => {
    if (playpauseIcon.classList.contains("fa-play")) {
        playpauseIcon.classList.remove("fa-play");
        playpauseIcon.classList.add("fa-pause");
        audio.play();
        update();
    }
    else {
        playpauseIcon.classList.remove("fa-pause");
        playpauseIcon.classList.add("fa-play");
        audio.pause();
    }
})

audio.addEventListener('timeupdate', () => {
    let time = Math.round(audio.currentTime);

    realTime.innerText = `0:${parseInt(time)}`;
    duration.innerText = Math.round((audio.duration) / 60) + ":00";
    console.log('timeupdate');
    let progress = parseInt((audio.currentTime / audio.duration) * 100);

    progressBar.value = progress;

})
progressBar.addEventListener('change', () => {
    audio.currentTime = progressBar.value * audio.duration / 100;
})

forward.addEventListener('click', (update) => {
    songIndex = (songIndex + 1) % songs.length;
    audio.src = songs[songIndex].filepath;
    audio.play();
    playpauseIcon.classList.remove("fa-play");
    playpauseIcon.classList.add("fa-pause");
    singerName.innerText = songs[songIndex].name;
    coverImg.src = songs[songIndex].coverpath;
    miniImg.src = songs[songIndex].coverpath;

});
