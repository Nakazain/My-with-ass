const loading = document.querySelector('.loading');
const triggerBtn = document.querySelector('.triggerloading');
const introContainer = document.querySelector('.intro-container');
const intro = document.querySelectorAll('.intro');
const carouselItem = document.querySelectorAll('.carousel-item');
const hidden = document.querySelector('.hidden');
const blackBox = document.querySelector('.black-box');
const home = document.getElementById('home');
const project = document.getElementById('project');
const next = document.querySelector('.next');
const pref = document.querySelector('.pref');
const carousel = document.querySelector('.carousel');

function showLoading() {
  setTimeout(() => {
    loading.classList.remove('done');
    setTimeout(() => {
      loading.classList.add('done');
      home.classList.add('hidden');
      project.classList.remove('hidden');
    }, 2000);
  }, 100);
}

function nextCarousel() {
  const activeIndex = Array.from(carouselItem).findIndex(item => item.classList.contains('active'));
  
  if (activeIndex === carouselItem.length - 2) {
    console.log('Jalan nih');
    next.disabled = true;
    next.classList.add('disabled');
  } 
  if (pref.disabled == true) {
    pref.disabled = false;
    pref.classList.remove('disabled');
  }

  carouselItem[activeIndex].classList.remove('active');
  carouselItem[activeIndex].classList.add('prev');

  carouselItem[activeIndex + 1].classList.add('active');

  carousel.style.transform = `translateY(-${(activeIndex + 1) * 100}vh)`;
}

function prefCarousel() {
  const activeIndex = Array.from(carouselItem).findIndex(item => item.classList.contains('active'));

  if (activeIndex === carouselItem[0]) {
    pref.disabled = true;
    pref.classList.add('disabled');
  }

  if (next.disabled == true) {
    next.disabled = false;
    next.classList.remove('disabled');
  }

  carouselItem[activeIndex].classList.remove('active');

  carouselItem[activeIndex - 1].classList.remove('prev');
  carouselItem[activeIndex - 1].classList.add('active');

  carousel.style.transform = `translateY(-${(activeIndex - 1) * 100}vh)`;
}

intro.forEach((el, index) => {
  setTimeout(() => {
      el.classList.add("play-intro");
    }, 300 + index * 500);
});
setTimeout(() => {
  introContainer.classList.add('done');
  setTimeout(() => {
    blackBox.classList.remove("active");
  }, 1500);
  setTimeout(() => {
    blackBox.classList.add("active");
    hidden.classList.remove("hidden")
  }, 3000);
}, 3500);




triggerBtn.addEventListener('click', showLoading);
next.addEventListener('click', nextCarousel);
pref.addEventListener('click', prefCarousel);