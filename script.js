const yearTarget = document.getElementById("year");

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

const carousel = document.querySelector(".cert-carousel");
const prevButton = document.querySelector(".carousel-button.prev");
const nextButton = document.querySelector(".carousel-button.next");

const scrollCarousel = (direction) => {
  if (!carousel) {
    return;
  }
  const scrollAmount = carousel.clientWidth * 0.8 * direction;
  carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
};

if (prevButton) {
  prevButton.addEventListener("click", () => scrollCarousel(-1));
}

if (nextButton) {
  nextButton.addEventListener("click", () => scrollCarousel(1));
}
