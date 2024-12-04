new Splide(".splide-home", {
  type: "slide",
  perPage: 3,
  perMove: 1,
  start: 1,
  pagination: false,
  gap: "2.2rem",
  breakpoints: {
    800: {
      perPage: 2,
    },
    600: {
      perPage: 1,
    },
  },
}).mount();

document.querySelectorAll(".box-texto .open").forEach((img) => {
  img.addEventListener("click", function () {
    const currentBox = this.closest(".box-texto");

    document.querySelectorAll(".box-texto").forEach((box) => {
      if (box !== currentBox) {
        box.classList.remove("show");
      }
    });

    currentBox.classList.toggle("show");
  });
});

const handleIntersection = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
};

const observer = new IntersectionObserver(handleIntersection, {
  threshold: 0.1,
});

const fadeRightElements = document.querySelectorAll(".fade-right");
const fadeDownElements = document.querySelectorAll(".fade-down");

// Observa os elementos
fadeRightElements.forEach((element) => observer.observe(element));
fadeDownElements.forEach((element) => observer.observe(element));
