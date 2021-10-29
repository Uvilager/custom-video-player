const videoPlayer = document.querySelector('.video-player');
const video = videoPlayer.querySelector('.video');
const playButton = videoPlayer.querySelector('.play-button');
const volume = videoPlayer.querySelector('.volume');
const currentTimeElement = videoPlayer.querySelector('.current');
const durationTimeElement = videoPlayer.querySelector('.duration');
const progress = videoPlayer.querySelector('.video-progress');
const progressBar = videoPlayer.querySelector('.video-progress-filled');
const mute = videoPlayer.querySelectorAll('.mute');
const muted = videoPlayer.querySelector('.muted');
const notMuted = videoPlayer.querySelector('.notMuted');
const fullscreen = videoPlayer.querySelector('.fullscreen');
const playbackSpeed = document.querySelector('.speeds');

//Play and Pause button
playButton.addEventListener('click', (e) => {
    if (video.paused) {
        video.play();
        e.target.textContent = '❚ ❚';
    } else {
        video.pause();
        e.target.textContent = '►';
    }
});

//volume
volume.addEventListener('mousemove', (e) => {
    video.volume = e.target.value;
});

//current time and duration
const currentTime = () => {
    let currentMinutes = Math.floor(video.currentTime / 60);
    let currentSeconds = Math.floor(video.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(video.duration / 60);
    let durationSeconds = Math.floor(video.duration - durationMinutes * 60);

    currentTimeElement.innerHTML = `${currentMinutes}:${
        currentSeconds < 10 ? '0' + currentSeconds : currentSeconds
    }`;
    durationTimeElement.innerHTML = `${durationMinutes}:${durationSeconds}`;
};

video.addEventListener('timeupdate', currentTime);

//Progress bar
video.addEventListener('timeupdate', () => {
    const percentage = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${percentage}%`;
});

//change progress bar on click
progress.addEventListener('click', (e) => {
    const progressTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = progressTime;
});

//mute button
mute.forEach((speaker) => {
    speaker.addEventListener('click', (e) => {
        if (video.muted === false) {
            video.muted = true;
            muted.style.display = 'block';
            notMuted.style.display = 'none';
        } else {
            video.muted = false;
            muted.style.display = 'none';
            notMuted.style.display = 'block';
        }
    });
});

//fullscreen
fullscreen.addEventListener('click', (e) => {
    if (!document.fullscreenElement) {
        videoPlayer.requestFullscreen();
    } else {
        console.log('clicked');
        document.exitFullscreen();
    }
});

//playback speed
playbackSpeed.addEventListener('change', (changePlaybackSpeed) => {
    switch (playbackSpeed.value) {
        case 'superSlow':
            video.playbackRate = 0.5;
            break;
        case 'slow':
            video.playbackRate = 0.75;
            break;
        case 'normal':
            video.playbackRate = 1;
            break;
        case 'fast':
            video.playbackRate = 1.5;
            break;
        case 'superFast':
            video.playbackRate = 2;
            break;
    }
});
