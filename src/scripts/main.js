const menu = document.querySelector(".menu");
const menuLinks = document.querySelector(".menu-links");
const itServices = document.querySelector(".menu1");
const solutions = document.querySelector(".menu2");
const aboutUs = document.querySelector(".menu4");
const drop1Links = document.querySelector(".drop1-links");
const drop2Links = document.querySelector(".drop2-links");
const drop4Links = document.querySelector(".drop4-links");
const menuBack = document.querySelectorAll(".menu-back");

menuBack.forEach((item) => {
  item.addEventListener("click", (event) => {
    document.querySelector(".drop-active").classList.remove("drop-active");
      menuLinks.classList.add("active");
  });

});

itServices.addEventListener("click", () => {
  drop1Links.classList.add("drop-active");
  drop2Links.classList.remove("drop-active");
  drop4Links.classList.remove("drop-active");
  menuLinks.classList.remove("active");
  isOpen = false;
});
solutions.addEventListener("click", () => {
  drop1Links.classList.remove("drop-active");
  drop2Links.classList.add("drop-active");
  drop4Links.classList.remove("drop-active");
    menuLinks.classList.remove("active");
  isOpen = false;
});
aboutUs.addEventListener("click", () => {
  drop1Links.classList.remove("drop-active");
  drop2Links.classList.remove("drop-active");
  drop4Links.classList.add("drop-active");
    menuLinks.classList.remove("active");
  isOpen = false;
});

let isOpen = false;
menu.addEventListener("click", () => {
  if (isOpen) {
    menuLinks.classList.remove("active");
    isOpen = false;
  } else {
    menuLinks.classList.add("active");
    isOpen = true;
  }
});

const partnerCarousel = document.querySelector(".carousel");
const partnerGroup = document.querySelector(".carousel-group");

const partnerPrev = document.querySelector(".prev");
const partnerNext = document.querySelector(".next");

const partnerOriginalSlides = [...partnerGroup.children];

// Duplicate slides
partnerOriginalSlides.forEach(slide => {
  partnerGroup.appendChild(slide.cloneNode(true));
});

let partnerPosition = 0;
let partnerTotalWidth = 0;
let partnerSlideWidth = 0;

let partnerSpeed = 0.5;
let partnerDragging = false;
let partnerStartX = 0;
let partnerStartPosition = 0;

let partnerLastTime = 0;

// Calculate width
function calculatePartnerWidth() {
  const firstSlide = partnerGroup.querySelector(".carousel-slide");
  const style = getComputedStyle(firstSlide);

  partnerSlideWidth =
    firstSlide.getBoundingClientRect().width +
    parseFloat(style.marginRight);

  partnerTotalWidth =
    partnerSlideWidth * partnerOriginalSlides.length;

  normalizePartnerPosition();
  renderPartnerCarousel();
}

// Render
function renderPartnerCarousel() {
  partnerGroup.style.transform =
    `translate3d(${-partnerPosition}px, 0, 0)`;
}

// Infinite loop
function normalizePartnerPosition() {
  if (partnerTotalWidth <= 0) return;

  partnerPosition =
    ((partnerPosition % partnerTotalWidth) +
      partnerTotalWidth) % partnerTotalWidth;
}

// Auto spin
function animatePartnerCarousel(timestamp) {
  if (!partnerLastTime) partnerLastTime = timestamp;

  const delta = Math.min(timestamp - partnerLastTime, 50);
  partnerLastTime = timestamp;

  if (!partnerDragging && partnerTotalWidth > 0) {
    partnerPosition += partnerSpeed * (delta / 16.67);

    normalizePartnerPosition();
    renderPartnerCarousel();
  }

  requestAnimationFrame(animatePartnerCarousel);
}

// Drag start
partnerCarousel.addEventListener("pointerdown", e => {
  if (e.target.closest("button")) return;

  partnerDragging = true;
  partnerStartX = e.clientX;
  partnerStartPosition = partnerPosition;

  partnerCarousel.setPointerCapture(e.pointerId);
});

// Drag movement
partnerCarousel.addEventListener("pointermove", e => {
  if (!partnerDragging) return;

  const distance = e.clientX - partnerStartX;

  partnerPosition = partnerStartPosition - distance;

  normalizePartnerPosition();
  renderPartnerCarousel();
});

// Drag end
function stopPartnerDragging() {
  partnerDragging = false;
}

partnerCarousel.addEventListener("pointerup", stopPartnerDragging);
partnerCarousel.addEventListener("pointercancel", stopPartnerDragging);
partnerCarousel.addEventListener("lostpointercapture", stopPartnerDragging);

// Buttons
partnerNext.addEventListener("click", () => {
  partnerPosition += partnerSlideWidth;
  normalizePartnerPosition();
  renderPartnerCarousel();
});

partnerPrev.addEventListener("click", () => {
  partnerPosition -= partnerSlideWidth;
  normalizePartnerPosition();
  renderPartnerCarousel();
});

// Responsive
const partnerResizeObserver = new ResizeObserver(() => {
  calculatePartnerWidth();
});

partnerResizeObserver.observe(partnerCarousel);

// Initialize
calculatePartnerWidth();
requestAnimationFrame(animatePartnerCarousel);




const slider = document.querySelector(".slider");
const container = document.querySelector(".home .container");

const nextBtn = document.querySelector(".slider-next");
const prevBtn = document.querySelector(".slider-prev");

const slides = [...slider.children];
const totalSlides = slides.length;

let index = 1;
let slideWidth = container.clientWidth;
let autoPlay;

// Duplicate first and last slides
slider.prepend(slides[totalSlides - 1].cloneNode(true));
slider.append(slides[0].cloneNode(true));

function updateSlider(transition = true) {
  slider.style.transition = transition
    ? "transform 0.6s ease-in-out"
    : "none";

  slider.style.transform =
    `translateX(${-index * slideWidth}px)`;
}

function nextSlide() {
  index++;
  updateSlider();
}

function prevSlide() {
  index--;
  updateSlider();
}

// Infinite loop
slider.addEventListener("transitionend", () => {
  if (index === totalSlides + 1) {
    index = 1;
    updateSlider(false);
  }

  if (index === 0) {
    index = totalSlides;
    updateSlider(false);
  }
});

// Buttons
nextBtn.addEventListener("click", () => {
  nextSlide();
  startAutoPlay();
});

prevBtn.addEventListener("click", () => {
  prevSlide();
  startAutoPlay();
});

// Automatic sliding
function startAutoPlay() {
  clearInterval(autoPlay);

  autoPlay = setInterval(() => {
    nextSlide();
  }, 5000);
}

// Responsive
window.addEventListener("resize", () => {
  slideWidth = container.clientWidth;
  updateSlider(false);
});

// Initialize
updateSlider(false);
startAutoPlay();