const loading = document.querySelector(".loading");
const triggerBtn = document.querySelector(".triggerloading");
const introContainer = document.querySelector(".intro-container");
const intro = document.querySelectorAll(".intro");
const carouselItem = document.querySelectorAll(".carousel-item");
const hidden = document.querySelector(".hidden");
const blackBox = document.querySelector(".black-box");
const home = document.getElementById("home");
const name = document.getElementById("name");
const project = document.getElementById("project");
const next = document.querySelector(".next");
const pref = document.querySelector(".pref");
const carousel = document.querySelector(".carousel");
const nav = document.querySelector(".nav");
const navHome = document.querySelector(".nav-home");
const navPrjk = document.querySelector(".nav-project");

if (
  window.location.pathname.endsWith("index.html") ||
  window.location.pathname === "/" ||
  (window.location.pathname === "/index.html" &&
    sessionStorage.getItem("goToProject") !== "true")
) {
  playIntro();
}

if (sessionStorage.getItem("goToProject") === "true") {
  goToProject();
  sessionStorage.removeItem("goToProject");
}

function goToProject() {
  // if (sessionStorage.getItem("goToProject") === "true") {
  //   introContainer.classList.remove("done");
  //     intro.forEach((el, index) => {
  //     el.classList.add("hidden");
  //   });

  //   setTimeout(() => {
  //     introContainer.classList.add("done");
  //   }, 900);

  //   blackBox.classList.add("active");
  //   name.classList.remove("hidden");
  // }

  if (sessionStorage.getItem("goToProject") !== "true") {
    loading.classList.remove("done");
    navHome.classList.remove("active");
    nav.classList.remove("nav-show");
    setTimeout(() => {
      loading.classList.add("done");
    }, 2000);
  }

  setTimeout(() => {
    home.classList.add("hidden");
    project.classList.remove("hidden");
  }, 1000);
  setTimeout(() => {
    navPrjk.classList.add("active");
    nav.classList.add("nav-show");
  }, 3000);

  navPrjk.removeEventListener("click", goToProject);
  navHome.addEventListener("click", playIntro);
}

function playIntro() {
  if (introContainer.classList.contains("done")) {
    intro.forEach((el, index) => {
      el.classList.remove("play-intro");
    });

    name.classList.add("hidden");
    navPrjk.classList.remove("active");
    introContainer.classList.remove("done");
    nav.classList.remove("nav-show");

    setTimeout(() => {
      intro.forEach((el, index) => {
        el.classList.remove("hidden");
      });
    }, 650);

    setTimeout(() => {
      project.classList.add("hidden");
      home.classList.remove("hidden");
    }, 800);
  }

  intro.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add("play-intro");
    }, 300 + index * 500);

    setTimeout(() => {
      el.classList.add("hidden");
    }, 3000 + index * 500);
  });

  setTimeout(() => {
    introContainer.classList.add("done");

    setTimeout(() => {
      blackBox.classList.remove("active");
    }, 1500);

    setTimeout(() => {
      blackBox.classList.add("active");
      name.classList.remove("hidden");
    }, 3000);
  }, 3500);
  
  if (sessionStorage.getItem("goToProject") !== "true") {
    setTimeout(() => {
      nav.classList.add("nav-show");
      navHome.classList.add("active");
    }, 4500);
  }

  navHome.removeEventListener("click", playIntro);
  navPrjk.addEventListener("click", goToProject);
}

function nextCarousel() {
  const activeIndex = Array.from(carouselItem).findIndex((item) =>
    item.classList.contains("active")
  );

  if (activeIndex === carouselItem.length - 2) {
    next.disabled = true;
    next.classList.add("disabled");
  }
  if (pref.disabled === true) {
    pref.disabled = false;
    pref.classList.remove("disabled");
  }

  carouselItem[activeIndex].classList.remove("active");
  carouselItem[activeIndex].classList.add("prev");

  carouselItem[activeIndex + 1].classList.add("active");

  carousel.style.transform = `translateY(-${(activeIndex + 1) * 100}vh)`;
}

function prefCarousel() {
  const activeIndex = Array.from(carouselItem).findIndex((item) =>
    item.classList.contains("active")
  );

  if (activeIndex === 1) {
    pref.disabled = true;
    pref.classList.add("disabled");
  }

  if (next.disabled === true) {
    next.disabled = false;
    next.classList.remove("disabled");
  }
  carouselItem[activeIndex].classList.remove("active");

  carouselItem[activeIndex - 1].classList.remove("prev");
  carouselItem[activeIndex - 1].classList.add("active");

  carousel.style.transform = `translateY(-${(activeIndex - 1) * 100}vh)`;
}
triggerBtn.addEventListener("click", goToProject);
next.addEventListener("click", nextCarousel);
pref.addEventListener("click", prefCarousel);
