const prevBtn = document.querySelector(`.prev-slide-btn`);
const nextBtn = document.querySelector(`.next-slide-btn`);
const sliderContainer = document.querySelector(`.slider-container`);
const slideList = document.querySelectorAll(`.slide`);
const slideImages = document.querySelectorAll(`.face_image`);

let autoPlay;

function startAutoplay() {
  autoPlay = setInterval(function () {
    nextBtn.click();
  }, 3000);
}

startAutoplay();

function stopAutoplay() {
  clearInterval(autoPlay);
}

sliderContainer.addEventListener(`mouseout`, startAutoplay);
sliderContainer.addEventListener(`mouseover`, stopAutoplay);

slideImages.forEach((element, index) => {
  element.style.backgroundImage = `url("./images/Team-${index + 1}.png")`;
});

let index = 0;

prevBtn.addEventListener("click", goPrev);
nextBtn.addEventListener("click", goNext);

function update() {
  slideList.forEach((element, i) => {
    element.classList.toggle("active-slide", i == index);
  });
}

function goNext() {
  if (index < slideList.length - 1) {
    index++;
    update();
  } else {
    index = 0;
    update();
  }
}

function goPrev() {
  if (index > 0) {
    index--;
    update();
  } else {
    index = slideList.length - 1;
    update();
  }
}

update();
