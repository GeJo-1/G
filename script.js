document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");
  const introText = document.getElementById("intro-text");
  const nameScene = document.getElementById("name-scene");
  const nameEl = document.getElementById("name");
  const messageScene = document.getElementById("message-scene");
  const playBtn = document.getElementById("play-btn");
  const song = document.getElementById("birthday-song");
  const confettiContainer = document.getElementById("confetti");

  const introMessage = "Rise and shine, birthday girl...";
  introText.textContent = "";
  let index = 0;
  let confettiInterval = null;

  function typeIntro() {
    if (index < introMessage.length) {
      introText.textContent += introMessage.charAt(index);
      index++;
      setTimeout(typeIntro, 50);
    } else {
      setTimeout(() => {
        intro.classList.add("hidden");
        showName();
      }, 700);
    }
  }

  function showName() {
    nameScene.classList.remove("hidden");
    const letters = nameEl.textContent.split("");
    nameEl.textContent = "";
    letters.forEach((letter, i) => {
      const span = document.createElement("span");
      span.textContent = letter;
      span.style.opacity = 0;
      span.style.display = "inline-block";
      span.style.transform = "scale(0.9)";
      nameEl.appendChild(span);

      setTimeout(() => {
        span.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        span.style.opacity = 1;
        span.style.transform = "scale(1)";
      }, i * 180);
    });

    setTimeout(() => {
      nameScene.classList.add("hidden");
      messageScene.classList.remove("hidden");
    }, letters.length * 180 + 1200);
  }

  function launchConfetti() {
    for (let i = 0; i < 60; i++) {
      const dot = document.createElement("div");
      dot.classList.add("conf-dot");
      dot.style.left = Math.random() * 100 + "vw";
      dot.style.top = "-10px";
      dot.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
      dot.style.animationDuration = 1.5 + Math.random() * 2 + "s";
      confettiContainer.appendChild(dot);
      setTimeout(() => dot.remove(), 4000);
    }
  }

  function startConfettiLoop() {
    launchConfetti(); // Start immediately
    confettiInterval = setInterval(launchConfetti, 5000); // Every 5 seconds
  }

  function stopConfettiLoop() {
    clearInterval(confettiInterval);
    confettiInterval = null;
  }

  playBtn.addEventListener("click", () => {
    if (song.paused) {
      song.play();
      playBtn.textContent = "Pause song";
      startConfettiLoop();
    } else {
      song.pause();
      playBtn.textContent = "Play song & celebrate";
      stopConfettiLoop();
    }
  });

  setTimeout(typeIntro, 1000);
});
