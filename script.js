const prevBtn = document.querySelector(`.prev`);
const nextBtn = document.querySelector(`.next`);
const slideList = document.querySelectorAll(`.slide`);
let index = 0;

prevBtn.addEventListener("click", goPrev);
nextBtn.addEventListener("click", goNext);

function update() {
  slideList.forEach((element, i) => {
    element.classList.toggle("active", i == index);
  });
  nextBtn.classList.toggle("hideBtn", index == slideList.length - 1);
  prevBtn.classList.toggle("hideBtn", index == 0);
}

function goNext() {
  if (index < slideList.length - 1) {
    index++;
    update();
  }
}

function goPrev() {
  if (index > 0) {
    index--;
    update();
  }
}

update();
