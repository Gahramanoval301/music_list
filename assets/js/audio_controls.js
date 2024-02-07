import { audio } from "./index.js";

const restart = document.getElementById("restart");
const backward = document.getElementById("backward");
const forward = document.getElementById("forward");
const volume_btn = document.getElementById("volume_btn");
const volume = document.getElementById("volume");

const forward_ = () => {
    audio.currentTime += 5.0;
}
const backward_ = () => {
    audio.currentTime -= 5.0;
}
restart.addEventListener("click", () => {
    audio.currentTime = 0;
})
forward.addEventListener("click", forward_);
backward.addEventListener("click", backward_);
volume.addEventListener('input', () => {
    audio.volume = volume.value / 100
})

document.addEventListener('keydown', (e) => {
    console.log(e.keyCode);
    if (e.keyCode === 39) {
        forward_()
        console.log('forward pressed');
    }
    else if (e.keyCode === 37) {
        backward_()
        console.log('backward pressed');
    }
})