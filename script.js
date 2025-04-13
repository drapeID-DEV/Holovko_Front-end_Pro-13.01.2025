const digitImgs = document.querySelectorAll('img');
let prevDigits = [];

function getCurrentTime() {
  const now = new Date();
  const formattedTime = now.toTimeString().slice(0, 8);
  return formattedTime.match(/\d/g);
}

function updateClock() {
  const currentTime = getCurrentTime();

  digitImgs.forEach((digit, index) => {
    if (prevDigits[index] !== currentTime[index]) {
      digit.src = `images/${currentTime[index]}.png`;
      prevDigits[index] = currentTime[index];
    }
  })
}

updateClock();
setInterval(updateClock, 1000);