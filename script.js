console.clear();
let counter = 0;
let n = 0;
let boxes = document.querySelectorAll(".box");

let soundChange = document.querySelector(".sound");
let soundIcons = document.querySelectorAll("i");
let soundCounter = 0;

soundChange.addEventListener("click", soundToggle);
function soundToggle() {
  soundCounter++;
  if (soundCounter % 3 == 0) {
    soundIcons[1].style.opacity = "1";
    soundIcons[0].style.opacity = "0";
    soundIcons[2].style.opacity = "0";
    bgSong.pause();
    bgSong.level = 0.1;
    bgSong.play();
  }
  if (soundCounter % 3 == 1) {
    soundIcons[2].style.opacity = "1";
    soundIcons[1].style.opacity = "0";
    soundIcons[0].style.opacity = "0";
    bgSong.pause();
    bgSong.level = 1;
    bgSong.play();
  }
  if (soundCounter % 3 == 2) {
    soundIcons[0].style.opacity = "1";
    soundIcons[2].style.opacity = "0";
    soundIcons[1].style.opacity = "0";
    bgSong.pause();
  }
}

let bgSong = new Audio("music/rain.mp3");
bgSong.level = 0.1;

let winSound = new Audio();
winSound.src =
  "http://commondatastorage.googleapis.com/codeskulptor-assets/week7-brrring.m4a";
let loseSound = new Audio("music/lose.mp3");


function color() {
  return Math.trunc(Math.random() * 256);
}

function startGame() {
  bgSong.play();
  counter = 0;
  n = Math.trunc(Math.random() * boxes.length);

  for (let i = 0; i < boxes.length; i++) {
    boxes[i].style.background = `rgb(${color()},${color()},${color()})`;
    boxes[i].textContent = i;
    boxes[i].style.visibility = "visible";
    boxes[i].addEventListener("click", guess);
  }
  bgMusic.play();
}








function guess() {
  const guessedNumber = parseInt(this.textContent);
  counter++;

  if (guessedNumber === n) {
    alert("Ви перемогли!!!!");
    winSound.play();
    startGame();
  } else if (counter === 3) {
    alert("Ви програли! Це було число " + n);
    loseSound.play();
    startGame();
  } else {
    if (guessedNumber < n) {
      alert("Загадане число більше!");
      hideBoxes(guessedNumber, "less");
      loseSound.play();
    } else {
      alert("Загадане число менше!");
      hideBoxes(guessedNumber, "greater");
      loseSound.play();
    }
  }
}

function hideBoxes(limit, condition) {
  for (let i = 0; i < boxes.length; i++) {
    const boxNumber = parseInt(boxes[i].textContent);

    if (
      (condition === "less" && boxNumber <= limit) ||
      (condition === "greater" && boxNumber >= limit)
    ) {
      boxes[i].style.visibility = "hidden";
      boxes[i].removeEventListener("click", guess);
    }
  }
}

startGame();