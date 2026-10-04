
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});

// Fade-in progressivo conforme a página aparece
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

// Modal do cardápio
const modal = document.getElementById("menuModal");
const closeButton = document.getElementById("closeMenu");

const openButtons = [
  document.getElementById("openMenu"),
  document.getElementById("openMenuImage")
];

function openMenuModal() {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeMenuModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

openButtons.forEach((button) => {
  button.addEventListener("click", openMenuModal);
});

closeButton.addEventListener("click", closeMenuModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeMenuModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenuModal();
  }
});
