const cursor = document.getElementById("customCursor");


document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`; 
    cursor.style.top = `${e.clientY}px`;  
}
)
;

document.addEventListener("DOMContentLoaded", () => {
    const backgroundMusic = document.getElementById("backgroundMusic");
    const muteButton = document.getElementById("muteButton");
  
    let isPlaying = false;

    const savedTime = localStorage.getItem("audioTime");
  if (savedTime) {
    backgroundMusic.currentTime = parseFloat(savedTime);
  }
  
  if (isPlaying) {
    backgroundMusic.play()
      .then(() => {
        backgroundMusic.muted = false;
        muteButton.textContent = "🔇"; 
      })
      .catch((error) => console.error("Autoplay failed:", error));
  }

    muteButton.addEventListener("click", () => {
      if (!isPlaying) {
        backgroundMusic.play()
          .then(() => {
            isPlaying = true;
            backgroundMusic.muted = false;
            muteButton.textContent = "🔇";
          })
          .catch((error) => {
            console.error("Audio playback failed:", error);
          });
      } else {
        backgroundMusic.muted = !backgroundMusic.muted;
        muteButton.textContent = backgroundMusic.muted ? "🔊" : "🔇";
    }
});


  window.addEventListener("beforeunload", () => {
    localStorage.setItem("audioTime", backgroundMusic.currentTime);
    localStorage.setItem("isPlaying", isPlaying);
  });


  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      backgroundMusic.pause();
    } else if (isPlaying) {
      backgroundMusic.play().catch((error) => console.error("Resume playback failed:", error));
    }
  });
});