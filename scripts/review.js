// ---------- Review counter (localStorage) ----------
const countEl = document.querySelector("#review-count");
let reviewCount = 0;

try {
  reviewCount = Number(localStorage.getItem("reviewCount")) || 0;
  reviewCount += 1;
  localStorage.setItem("reviewCount", reviewCount);
} catch (error) {
  // Storage unavailable (e.g. blocked); fall back to showing 1 for this visit
  reviewCount = 1;
}

countEl.textContent = reviewCount;

// ---------- Summary of the submitted review ----------
const params = new URLSearchParams(window.location.search);
const summary = document.querySelector("#summary");

function addRow(label, value) {
  if (!value) return;
  const row = document.createElement("div");
  const dt = document.createElement("dt");
  const dd = document.createElement("dd");
  dt.textContent = label;
  dd.textContent = value;
  row.append(dt, dd);
  summary.appendChild(row);
}

const product = products.find((p) => p.id === params.get("productName"));
const rating = params.get("rating");

addRow("Product", product ? product.name : params.get("productName"));
addRow("Rating", rating ? "\u2605".repeat(Number(rating)) + " (" + rating + " of 5)" : "");
addRow("Installed", params.get("installdate"));
addRow("Useful features", params.getAll("features").join(", "));
addRow("Review", params.get("review"));
addRow("Reviewer", params.get("username"));

// ---------- Footer dates ----------
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent =
  "Last Modification: " + document.lastModified;
