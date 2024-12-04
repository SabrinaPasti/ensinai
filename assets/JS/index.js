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

fadeRightElements.forEach((element) => observer.observe(element));
fadeDownElements.forEach((element) => observer.observe(element));

function openVideoModal() {
  const modal = document.getElementById("videoModal");
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeVideoModal() {
  const modal = document.getElementById("videoModal");
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}
