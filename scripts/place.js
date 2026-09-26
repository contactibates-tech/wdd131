// ---------- Responsive hamburger menu ----------
const menuButton = document.querySelector("#menu");
const navList = document.querySelector("#primary-nav ul");

menuButton.addEventListener("click", () => {
  const isOpen = navList.classList.toggle("open");
  menuButton.classList.toggle("open", isOpen);
  menuButton.setAttribute("aria-expanded", isOpen);
});

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

// ---------- Weather: static inputs (imperial units, matches displayed values) ----------
const temperature = 84; // degrees Fahrenheit
const windSpeed = 12;   // miles per hour

// Wind chill formula (National Weather Service, imperial units)
function calculateWindChill(temp, wind) {
  return (35.74 + 0.6215 * temp - 35.75 * Math.pow(wind, 0.16) + 0.4275 * temp * Math.pow(wind, 0.16)).toFixed(1);
}

const windChillEl = document.querySelector("#windchill");
const windChillIsViable = temperature <= 50 && windSpeed > 3;

windChillEl.textContent = windChillIsViable
  ? `${calculateWindChill(temperature, windSpeed)}\u00B0F`
  : "N/A";
