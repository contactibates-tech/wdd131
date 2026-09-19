// ---------- Responsive hamburger menu ----------
const menuButton = document.querySelector("#menu");
const navList = document.querySelector("#primary-nav ul");

menuButton.addEventListener("click", () => {
  const isOpen = navList.classList.toggle("open");
  menuButton.classList.toggle("open", isOpen);
  menuButton.setAttribute("aria-expanded", isOpen);
});

// Close the menu after a link is tapped in the mobile view
navList.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    navList.classList.remove("open");
    menuButton.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});

// ---------- Footer dates ----------
document.querySelector("#currentyear").textContent = new Date().getFullYear();

document.querySelector("#lastModified").textContent =
  "Last Modification: " + document.lastModified;
