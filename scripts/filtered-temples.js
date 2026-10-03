// ---------- Temple data ----------
// The first 7 objects and their imageUrl values are the sample data provided
// by the WDD 131 Week 04 assignment. The remaining objects were added to
// reach the required minimum of 10 and to give every filter (Old, New,
// Large, Small) at least one matching result. Added temples use a local
// placeholder image instead of guessing at the church's CDN path.
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg",
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg",
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg",
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg",
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg",
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg",
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg",
  },
  {
    templeName: "St. George Utah",
    location: "St. George, Utah, United States",
    dedicated: "1877, April, 6",
    area: 55341,
    imageUrl: "images/temple-placeholder.svg",
  },
  {
    templeName: "Logan Utah",
    location: "Logan, Utah, United States",
    dedicated: "1884, May, 17",
    area: 60563,
    imageUrl: "images/temple-placeholder-2.svg",
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl: "images/temple-placeholder.svg",
  },
  {
    templeName: "Paris France",
    location: "Le Chesnay, France",
    dedicated: "2017, May, 21",
    area: 40000,
    imageUrl: "images/temple-placeholder-2.svg",
  },
  {
    templeName: "Tokyo Japan",
    location: "Tokyo, Japan",
    dedicated: "1980, October, 27",
    area: 53997,
    imageUrl: "images/temple-placeholder.svg",
  },
];

// ---------- Rendering ----------
const album = document.querySelector("#album");
const resultCount = document.querySelector("#result-count");

function getDedicationYear(dedicated) {
  return parseInt(dedicated.split(",")[0], 10);
}

function createTempleCard(temple) {
  const figure = document.createElement("figure");

  const img = document.createElement("img");
  img.src = temple.imageUrl;
  img.alt = temple.templeName;
  img.loading = "lazy";
  img.width = 400;
  img.height = 250;
  figure.appendChild(img);

  const figcaption = document.createElement("figcaption");
  figcaption.innerHTML = `
    <h2>${temple.templeName}</h2>
    <p class="location">${temple.location}</p>
    <p><span class="label">Dedicated:</span> ${temple.dedicated}</p>
    <p><span class="label">Area:</span> ${temple.area.toLocaleString()} sq ft</p>
  `;
  figure.appendChild(figcaption);

  return figure;
}

function renderTemples(list) {
  album.innerHTML = "";
  list.forEach((temple) => album.appendChild(createTempleCard(temple)));
  resultCount.textContent = `Showing ${list.length} temple${list.length === 1 ? "" : "s"}`;
}

// ---------- Filtering ----------
const filters = {
  home: () => temples,
  old: () => temples.filter((t) => getDedicationYear(t.dedicated) < 1900),
  new: () => temples.filter((t) => getDedicationYear(t.dedicated) > 2000),
  large: () => temples.filter((t) => t.area > 90000),
  small: () => temples.filter((t) => t.area < 10000),
};

const navLinks = document.querySelectorAll("#primary-nav a");

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const filterName = link.dataset.filter;
    renderTemples(filters[filterName]());

    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");

    // Close the mobile nav after a selection
    navList.classList.remove("open");
    menuButton.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

// Initial render — all temples
renderTemples(filters.home());

// ---------- Responsive hamburger menu ----------
const menuButton = document.querySelector("#menu");
const navList = document.querySelector("#primary-nav ul");

menuButton.addEventListener("click", () => {
  const isOpen = navList.classList.toggle("open");
  menuButton.classList.toggle("open", isOpen);
  menuButton.setAttribute("aria-expanded", isOpen);
});

// ---------- Footer dates ----------
document.querySelector("#currentyear").textContent = new Date().getFullYear();

document.querySelector("#lastModified").textContent =
  "Last Modification: " + document.lastModified;
