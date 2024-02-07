import { music_data } from "../../mockData.js";

const audio = document.getElementById('audio');
const range = document.getElementById('music_range'); `    `

const release_date = document.getElementById('release_date');
const song_name = document.getElementById('song_name');
const singer = document.getElementById('singer');


const track_lists = document.querySelector('.track-lists');


//adding of each track to the track list
music_data.forEach((musicform) => {
    const li = document.createElement('li');
    li.className = 'track-list'
    li.style.cursor = 'pointer'
    li.innerHTML = ` <div class="music-info flex justify-between">
    <div class="song-control1 flex gap-3">
        <h4>${musicform.id + 1}</h4>
         <a><i class="ctrl_icon2 fa-solid fa-play"></i> </a>
        <div class="song-singer">
            <audio loop src='${musicform.song_path}'></audio>
            <h6 class="capitalize tracking-widest">${musicform.song_name}</h6>
            <p class="capitalize">${musicform.singer}</p>
        </div>
    </div>
    <div class="flex gap-3">
        <span>${musicform.song_duration}</span>
        <a href="">
            <i class="fa-solid fa-share-nodes"></i>
        </a>
    </div>
</div>  `
    track_lists.appendChild(li);
})
const song_poster_ = document.querySelector('.song_poster');
const tracks = document.querySelectorAll('.track-list')
const ctrl_icons2_ = document.querySelectorAll('.ctrl_icon2')

// audio manage functions
function playAudio() {
    audio.play();
    ctrl_btn.classList.remove('stop_audio');
    ctrl_btn.classList.add('play_audio')

    ctrl_icon1.classList.remove('fa-play')
    ctrl_icon1.classList.add('fa-pause')

    ctrl_text.textContent = 'stop now'

    music_data.forEach((track, index) => {
        if (track.song_path === audio.getAttribute('src')) {
            change_icon2(index)
        }
    })

}

function pauseAudio() {
    audio.pause();
    ctrl_btn.classList.remove('play_audio');
    ctrl_btn.classList.add('stop_audio')

    ctrl_icon1.classList.remove('fa-pause')
    ctrl_icon1.classList.add('fa-play')

    ctrl_text.textContent = 'listen now'


    music_data.forEach((track, index) => {
        if (track.song_path === audio.getAttribute('src')) {
            change_icon(index)
        }
    })

}

// passing of the specific 'musicform' object to the music controller 
// in each track is clicked
// 'tracks.forEach is used to iterate through each track and attach to click listener '
tracks.forEach((track, index) => {
    track.addEventListener('click', music_controller.bind(null, music_data[index], index));
});

function music_controller(musicform, index) {
    song_name.textContent = musicform.song_name;
    singer.textContent = musicform.singer;
    release_date.textContent = musicform.song_release_date
    song_poster_.style.backgroundImage = `url(${musicform.song_poster})`

    const audio_ = musicform.song_path;
    audio.setAttribute('src', audio_);
    playAudio(index)

    ctrl_icons2_.forEach((icon, i) => {
        // Reset all icons to default state
        icon.classList.remove('fa-play', 'fa-pause');
        if (i === index) {
            // Set the icon for the clicked track
            icon.classList.add(audio.paused ? 'fa-play' : 'fa-pause');
            icon.style.color = 'green';
        } else {
            icon.classList.add('fa-play')
            icon.style.color = 'white'; // Reset color for other icons
        }
    });
}


// create a connection between range input and audio
audio.addEventListener('timeupdate', function () {
    const value = (audio.currentTime / audio.duration) * 100;
    range.value = value;
    if (audio.ended) {
        audio.currentTime = 0;
        playAudio();
    }
});
range.addEventListener('input', function () {
    const time = (range.value / 100) * audio.duration;
    audio.currentTime = time;
});


const ctrl_btn = document.getElementById('ctrl_btn');
const ctrl_text = document.getElementById('ctrl_text')
const ctrl_icon1 = ctrl_btn.children[1];

//when the audio is paused then change the icon in the track list
//of that track element
function change_icon(index) {
    ctrl_icons2_[index].classList.remove('fa-pause')
    ctrl_icons2_[index].classList.add('fa-play')
}
//when the audio is played then change the icon in the track list
//of that track element
function change_icon2(index) {
    ctrl_icons2_[index].classList.remove('fa-play')
    ctrl_icons2_[index].classList.add('fa-pause')
}

function toggleAudio() {
    if (audio.paused) {
        playAudio();
    } else {
        pauseAudio();
    }
}

ctrl_btn.addEventListener('click', toggleAudio);
export { audio };