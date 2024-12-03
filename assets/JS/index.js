
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
