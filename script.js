'use strict';
const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');


//song / cover titles 
const songs = ['padarai', 'shyhouse', 'ukulele'];

// keep track of songs
let songIndex = 0;

//initialy load song into DOM
loadSong(songs[songIndex]);

//update song details
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `image/${song}.jpg`;
}

function playSong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

function pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
}

function updateProgress(e) {
    console.log(e);
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) *100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = ((clickX/ width)*duration);
}

// debugger
function prevSong(){
    songIndex <= 0 ? songIndex=((songs.length)-1) : songIndex--;
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong(){
    songIndex >= songs.length -1 ? songIndex = 0 : songIndex++;
    loadSong(songs[songIndex]);
    playSong();
}


//Event listeners
playBtn.addEventListener('click', () =>{
const isPlaying = musicContainer.classList.contains('play')

if (isPlaying){
    pauseSong();
}
else{
    playSong();
}
});

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

// Change song events
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('ended', nextSong);