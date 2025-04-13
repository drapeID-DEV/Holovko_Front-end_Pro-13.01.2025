const digitImgs = Array.from(document.querySelectorAll('img'));
let prevDigits = [];

function getCurrentTime() {
  const now = new Date();
  const formattedTime = now.toTimeString().slice(0, 8);
  return formattedTime.match(/\d/g);
}

function updateClock() {
  const currentTime = getCurrentTime();

  for (let i = 0; i < digitImgs.length; i++) {
    if (prevDigits[i] !== currentTime[i]) {
		digitImgs[i].src = `images/${currentTime[i]}.png`;
		prevDigits[i] = currentTime[i];
    }
  }
}

updateClock();
setInterval(updateClock, 1000);