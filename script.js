const menuModal = document.getElementById("menuModal");
const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");

function showMenu() {
  menuModal.classList.add("open");
  menuModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function hideMenu() {
  menuModal.classList.remove("open");
  menuModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

openMenu.addEventListener("click", showMenu);
closeMenu.addEventListener("click", hideMenu);

menuModal.addEventListener("click", (event) => {
  if (event.target === menuModal) {
    hideMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideMenu();
  }
});
