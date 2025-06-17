const loading = document.querySelector('.loading');
const triggerBtn = document.querySelector('.triggerloading');
const introContainer = document.querySelector('.intro-container');
const intro = document.querySelectorAll('.intro');
const hidden = document.querySelector('.hidden');
const blackBox = document.querySelector('.black-box');
const home = document.getElementById('home');
const project = document.getElementById('project');

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

// setTimeout(() => {
//   loading.classList.add('done');
// }, 2000);

// setTimeout(() => {
//   loading.classList.add('done');
// }, 2000);

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