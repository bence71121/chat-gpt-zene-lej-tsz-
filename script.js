const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("play-pause");
const playPauseIcon = document.getElementById("play-pause-icon");
const volumeControl = document.getElementById("volume");
const volumePercentage = document.getElementById("volume-percentage");
const progress = document.getElementById("progress");
const currentTimeDisplay = document.getElementById("current-time");
const durationDisplay = document.getElementById("duration");

// Segédfüggvény az idő formázására
function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" + secs : secs}`;
}

// Frissítse a dal teljes hosszát és állítsa be a progress max értékét
audio.addEventListener("loadedmetadata", () => {
  durationDisplay.textContent = formatTime(audio.duration);
  progress.max = Math.floor(audio.duration);
});

// Indítási állapot: szüneteltetett (play gomb látható)
window.addEventListener("DOMContentLoaded", () => {
  playPauseIcon.classList.remove("fa-pause");
  playPauseIcon.classList.add("fa-play");
});

// Lejátszás/szünet funkció
playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playPauseIcon.classList.remove("fa-play");
    playPauseIcon.classList.add("fa-pause");
  } else {
    audio.pause();
    playPauseIcon.classList.remove("fa-pause");
    playPauseIcon.classList.add("fa-play");
  }
});

// Idő frissítése és progress értékének beállítása
audio.addEventListener("timeupdate", () => {
  currentTimeDisplay.textContent = formatTime(audio.currentTime);
  progress.value = Math.floor(audio.currentTime);

  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.style.background = `linear-gradient(to right, #1abc9c ${progressPercent}%, #7f8c8d ${progressPercent}%)`;
});

// Progress csúszka kezelés (kattintással ugrás)
progress.addEventListener("input", (e) => {
  audio.currentTime = e.target.value;
  currentTimeDisplay.textContent = formatTime(audio.currentTime);
});

// Hangerő szabályozása
volumeControl.addEventListener("input", (e) => {
  const volume = e.target.value;
  audio.volume = volume;
  const volumePercent = Math.round(volume * 100);
  volumePercentage.textContent = `${volumePercent}%`;

  volumeControl.style.background = `linear-gradient(to right, #1abc9c ${volumePercent}%, #7f8c8d ${volumePercent}%)`;
});

// Dal végén visszaállítás
audio.addEventListener("ended", () => {
  playPauseIcon.classList.remove("fa-pause");
  playPauseIcon.classList.add("fa-play");
  audio.currentTime = 0;
  progress.value = 0;
  currentTimeDisplay.textContent = "0:00";
});
