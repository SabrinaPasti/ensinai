const faqLink = document.getElementById("faq-link");
const settings = document.getElementById("settings");
const popup = document.getElementById("popup");
const popup2 = document.getElementById("popup2");
const backdrop = document.getElementById("backdrop");
const closePopup1 = document.getElementById("close-popup1");
const closePopup2 = document.getElementById("close-popup2");

faqLink.addEventListener("click", (e) => {
  e.preventDefault();
  popup.classList.remove("hidden");
  backdrop.classList.remove("hidden");
});

closePopup1.addEventListener("click", () => {
  popup.classList.add("hidden");
  backdrop.classList.add("hidden");
});

settings.addEventListener("click", (e) => {
  e.preventDefault();
  popup2.classList.remove("hidden");
  backdrop.classList.remove("hidden");
});

closePopup2.addEventListener("click", () => {
  popup2.classList.add("hidden");
  backdrop.classList.add("hidden");
});

p;
backdrop.addEventListener("click", () => {
  popup.classList.add("hidden");
  popup2.classList.add("hidden");
  backdrop.classList.add("hidden");
});
