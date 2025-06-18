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
  if (carouselItem[0].classList.contains('active')) {
    carouselItem[0].classList.remove('active');
    carouselItem[0].classList.add('prev');
    carousel.style.transform = 'translateY(-100vh)';
    carouselItem[1].classList.add('active');
  }
  else if (carouselItem[1].classList.contains('active')) {
    carouselItem[1].classList.remove('active');
    carouselItem[1].classList.add('prev');
    carousel.style.transform = 'translateY(-200vh)';
    carouselItem[2].classList.add('active');
  }
  else if (carouselItem[2].classList.contains('active')) {
    carouselItem[2].classList.remove('active');
    carouselItem[2].classList.add('prev');
    carousel.style.transform = 'translateY(-300vh)';
    carouselItem[3].classList.add('active');
  }
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