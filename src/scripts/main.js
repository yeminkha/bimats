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



const carousel = document.querySelector(".carousel");
const group = document.querySelector(".carousel-group");

const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

const originalSlides = [...group.children];

// Duplicate slides
originalSlides.forEach(slide => {
  group.appendChild(slide.cloneNode(true));
});

let slideWidth = 0;
let totalWidth = 0;

let position = 0;
let isHovering = false;
let isDragging = false;

let startX = 0;
let startPosition = 0;

let speed = 0.5;

// Calculate responsive width
function calculateWidth() {
  const first = group.querySelector(".carousel-slide");
  const style = getComputedStyle(first);

  slideWidth =
    first.getBoundingClientRect().width +
    parseFloat(style.marginRight);

  totalWidth = slideWidth * originalSlides.length;

  normalize();
  render();
}

// Render
function render() {
  group.style.transform = `translate3d(${-position}px, 0, 0)`;
}

// Infinite loop
function normalize() {
  if (!totalWidth) return;

  position = ((position % totalWidth) + totalWidth) % totalWidth;
}

// Auto scroll
function animate() {
  if (!isHovering && !isDragging && totalWidth > 0) {
    position += speed;
    normalize();
    render();
  }

  requestAnimationFrame(animate);
}

// Pause on hover
carousel.addEventListener("mouseenter", () => {
  isHovering = true;
});

carousel.addEventListener("mouseleave", () => {
  isHovering = false;
});

// Buttons
prev.addEventListener("click", (e) => {
  e.stopPropagation();

  position -= slideWidth;
  normalize();
  render();
});

next.addEventListener("click", (e) => {
  e.stopPropagation();

  position += slideWidth;
  normalize();
  render();
});

// Drag start
carousel.addEventListener("pointerdown", (e) => {
  if (e.target.closest("button")) return;

  isDragging = true;

  startX = e.clientX;
  startPosition = position;

  carousel.setPointerCapture(e.pointerId);
});

// Drag move
carousel.addEventListener("pointermove", (e) => {
  if (!isDragging) return;

  const movement = startX - e.clientX;

  position = startPosition + movement;

  normalize();
  render();
});

// Drag end
function stopDrag() {
  if (!isDragging) return;

  isDragging = false;
}

carousel.addEventListener("pointerup", stopDrag);
carousel.addEventListener("pointercancel", stopDrag);
carousel.addEventListener("lostpointercapture", stopDrag);

// Responsive
const resizeObserver = new ResizeObserver(() => {
  calculateWidth();
});

resizeObserver.observe(carousel);

// Initialize
calculateWidth();
animate();
