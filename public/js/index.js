import { dom } from "./domElements.js";

playIntro();

if (sessionStorage.getItem("goToProject") === "true") {
  goToProject();
  sessionStorage.removeItem("goToProject");
}

function goToProject() {
  if (sessionStorage.getItem("goToProject") !== "true") {
    dom.loading.classList.remove("done");
    dom.navHome.classList.remove("active");
    dom.nav.classList.remove("nav-show");
    setTimeout(() => {
      dom.loading.classList.add("done");
    }, 2000);
  }

  setTimeout(() => {
    dom.home.classList.add("hidden");
    dom.project.classList.remove("hidden");
  }, 1000);
  setTimeout(() => {
    dom.navPrjk.classList.add("active");
    dom.nav.classList.add("nav-show");
  }, 3000);

  dom.navPrjk.removeEventListener("click", goToProject);
  dom.navHome.addEventListener("click", playIntro);
}

function playIntro() {
  if (dom.introContainer.classList.contains("done")) {
    dom.intro.forEach((el, index) => {
      el.classList.remove("play-intro");
    });

    dom.name.classList.add("invisible");
    dom.navPrjk.classList.remove("active");
    dom.introContainer.classList.remove("done");
    dom.nav.classList.remove("nav-show");

    setTimeout(() => {
      dom.intro.forEach((el, index) => {
        el.classList.remove("hidden");
      });
    }, 650);

    setTimeout(() => {
      dom.project.classList.add("hidden");
      dom.home.classList.remove("hidden");
    }, 800);
  }

  dom.intro.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add("play-intro");
    }, 300 + index * 500);

    setTimeout(() => {
      el.classList.add("hidden");
    }, 3000 + index * 500);
  });

  setTimeout(() => {
    dom.introContainer.classList.add("done");

    setTimeout(() => {
      dom.blackBox.classList.remove("active");
    }, 1500);

    setTimeout(() => {
      dom.blackBox.classList.add("active");
      dom.name.classList.remove("invisible");
    }, 3000);
  }, 3500);

  if (sessionStorage.getItem("goToProject") !== "true") {
    setTimeout(() => {
      dom.nav.classList.add("nav-show");
      dom.navHome.classList.add("active");
    }, 4500);
  }

  dom.navHome.removeEventListener("click", playIntro);
  dom.navPrjk.addEventListener("click", goToProject);
}

function nextCarousel() {
  const activeIndex = Array.from(dom.carouselItem).findIndex((item) =>
    item.classList.contains("active")
  );

  if (activeIndex === dom.carouselItem.length - 2) {
    dom.next.disabled = true;
  }
  if (dom.pref.disabled === true) {
    dom.pref.disabled = false;
  }

  dom.carouselItem[activeIndex].classList.remove("active");
  dom.carouselItem[activeIndex].classList.add("prev");

  dom.carouselItem[activeIndex + 1].classList.add("active");

  dom.carousel.style.transform = `translateY(-${(activeIndex + 1) * 100}vh)`;
}

function prefCarousel() {
  const activeIndex = Array.from(dom.carouselItem).findIndex((item) =>
    item.classList.contains("active")
  );

  if (activeIndex === 1) {
    dom.pref.disabled = true;
  }

  if (dom.next.disabled === true) {
    dom.next.disabled = false;
  }
  dom.carouselItem[activeIndex].classList.remove("active");

  dom.carouselItem[activeIndex - 1].classList.remove("prev");
  dom.carouselItem[activeIndex - 1].classList.add("active");

  dom.carousel.style.transform = `translateY(-${(activeIndex - 1) * 100}vh)`;
}
dom.triggerBtn.addEventListener("click", goToProject);
dom.next.addEventListener("click", nextCarousel);
dom.pref.addEventListener("click", prefCarousel);
