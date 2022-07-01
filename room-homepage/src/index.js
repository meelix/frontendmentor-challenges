import './main.css'
import '../swiper-bundle.js'

/* --------------------------------- swiper --------------------------------- */
const swiper = new Swiper('.swiper-container', {
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
});

/* ------------------------------- logo color ------------------------------- */
// vars
const offset = 60;
let docHeight = document.body.offsetHeight;
let scrollPosition = document.documentElement.scrollTop + offset;
let logoGradient;
let gradientPosition = 0;

// Get sections with backgrounds to construct background-gradient
function buildLogoBackground() {
  let gradientPosition = 0;
  let currentColor;

  // Get sections with backgrounds to construct background-gradient
  let sections;
  if (window.innerWidth < 1100) {
    sections = document.querySelectorAll("*:not(.swiper-slide-duplicate) > [data-logo-style], *:not(.swiper-slide-duplicate) > [data-mobile-logo-style]");
  } else {
    sections = document.querySelectorAll("*:not(.swiper-slide-duplicate) > [data-logo-style], *:not(.swiper-slide-duplicate) > [data-desktop-logo-style]");
  }
  console.log(sections);

  let docHeight = document.body.offsetHeight;
  sections.forEach(function (section, i) {
    const sectionH = section.offsetHeight;
    let prevGradientPosition = gradientPosition;
    gradientPosition += sectionH;
    let sectionColor;
    if (section.getAttribute("data-logo-style")) {
      sectionColor = section.getAttribute("data-logo-style");
    } else if (section.getAttribute("data-mobile-logo-style")) {
      sectionColor = section.getAttribute("data-mobile-logo-style");
    } else if (section.getAttribute("data-desktop-logo-style")) {
      sectionColor = section.getAttribute("data-desktop-logo-style");
    }
    let lettermarkColor = sectionColor === "light" ? "var(--c-white)" : "var(--c-black)";

    if (i === 0) {
      currentColor = sectionColor;
      logoGradient =
        "linear-gradient(" +
        lettermarkColor +
        ", " +
        lettermarkColor +
        " " +
        gradientPosition +
        "px";
    }

    if (i !== 0 && sectionColor !== currentColor) {
      currentColor = sectionColor;
      logoGradient =
        logoGradient +
        ", " +
        lettermarkColor +
        " " +
        prevGradientPosition +
        "px, " +
        lettermarkColor +
        " " +
        gradientPosition +
        "px";
    }

    if (i === sections.length - 1) {
      logoGradient = logoGradient + ")";
    }
  });

  document.documentElement.style.setProperty('--background-height', docHeight + "px");
  document.documentElement.style.setProperty('--background-size', "100% " + docHeight + "px");
  document.documentElement.style.setProperty('--background-image', logoGradient);
  document.documentElement.style.setProperty('--background-trans', (scrollPosition - offset) + "px");
}

window.addEventListener('DOMContentLoaded', (event) => {
  buildLogoBackground();
});

window.addEventListener("resize", function (e) {
  buildLogoBackground();
  document.documentElement.style.setProperty('--background-trans', scrollPosition + "px");
});

window.addEventListener("scroll", function (e) {
  scrollPosition = document.documentElement.scrollTop;
  document.documentElement.style.setProperty('--background-trans', scrollPosition + "px");
});


/* ------------------------------- menu toggle ------------------------------ */
const menuToggle = document.getElementById('menu-toggle');

menuToggle.addEventListener("click", () => {
  if (document.body.classList.contains("opened")) {
    document.body.classList.remove("opened")
  } else {
    document.body.classList.add("opened")
  }
})


/* --------------------------- swipe to close menu -------------------------- */
let pageWidth = window.innerWidth || document.body.clientWidth;
let treshold = Math.max(1, Math.floor(0.01 * (pageWidth)));
let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

const limit = Math.tan(45 * 1.5 / 180 * Math.PI);
const gestureZone = document.querySelector('main');

gestureZone.addEventListener('touchstart', function (event) {
  touchstartX = event.changedTouches[0].screenX;
  touchstartY = event.changedTouches[0].screenY;
}, false);

gestureZone.addEventListener('touchend', function (event) {
  touchendX = event.changedTouches[0].screenX;
  touchendY = event.changedTouches[0].screenY;
  handleGesture(event);
}, false);

function handleGesture(e) {
  let x = touchendX - touchstartX;
  let y = touchendY - touchstartY;
  let xy = Math.abs(x / y);
  let yx = Math.abs(y / x);
  if ((Math.abs(x) > treshold || Math.abs(y) > treshold)) {
    if (xy <= limit) {
      if (y !== 0 && document.body.classList.contains("opened")) {
        document.body.classList.remove("opened")
      }
    }
  }
}