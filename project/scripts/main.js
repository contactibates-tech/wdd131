const KEYS = { recent: "jm-recent", checks: "jm-checks", reports: "jm-reports" };

function readStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function partCard(part) {
  return `<li class="card">
    <a href="part.html?id=${part.id}">
      <img src="images/${part.id}.svg" alt="" width="96" height="96" loading="lazy">
      <h3>${part.name}</h3>
      <p>${part.summary}</p>
      <span class="tag">${part.category}</span>
    </a>
  </li>`;
}

/* ---------- Home page ---------- */
function showParts() {
  const term = document.querySelector("#search").value.trim().toLowerCase();
  const category = document.querySelector("#category").value;
  const matches = parts.filter((part) => {
    const inCategory = category === "all" || part.category === category;
    const inSearch = `${part.name} ${part.summary}`.toLowerCase().includes(term);
    return inCategory && inSearch;
  });
  document.querySelector("#part-list").innerHTML = matches.map(partCard).join("");
  document.querySelector("#status").textContent = matches.length
    ? `${matches.length} of ${parts.length} parts shown`
    : "No parts match. Clear the search or choose All categories.";
}

function showRecent() {
  const recent = readStorage(KEYS.recent, [])
    .map((id) => parts.find((part) => part.id === id))
    .filter(Boolean);
  const section = document.querySelector("#recent");
  section.hidden = recent.length === 0;
  document.querySelector("#recent-list").innerHTML = recent
    .map((part) => `<li><a href="part.html?id=${part.id}">${part.name}</a></li>`)
    .join("");
}

function setupHome() {
  const categories = [...new Set(parts.map((part) => part.category))];
  document.querySelector("#category").innerHTML = ["all", ...categories]
    .map((name) => `<option value="${name}">${name === "all" ? "All categories" : name}</option>`)
    .join("");
  document.querySelector("#search").addEventListener("input", showParts);
  document.querySelector("#category").addEventListener("change", showParts);
  showParts();
  showRecent();
}

/* ---------- Part page ---------- */
function saveRecent(id) {
  const recent = readStorage(KEYS.recent, []).filter((item) => item !== id);
  writeStorage(KEYS.recent, [id, ...recent].slice(0, 3));
}

function updateProgress(part, saved) {
  const done = saved.length;
  const total = part.checks.length;
  document.querySelector("#progress").textContent = done === total
    ? `All ${total} checks complete. This part is ready for inspection.`
    : `${done} of ${total} checks complete.`;
}

function setupPart() {
  const id = new URLSearchParams(window.location.search).get("id");
  const part = parts.find((item) => item.id === id);
  const content = document.querySelector("#part-content");

  if (!part) {
    content.innerHTML = `<h2>Part not found</h2><p>Choose a part from the <a href="index.html#parts">part list</a>.</p>`;
    return;
  }

  document.title = `${part.name} | JM Part Standards Hub`;
  document.querySelector("#part-name").textContent = part.name;
  document.querySelector("#part-summary").textContent = part.summary;
  document.querySelector("#standards").innerHTML = part.standards.map((rule) => `<li>${rule}</li>`).join("");

  const allChecks = readStorage(KEYS.checks, {});
  const saved = allChecks[part.id] ?? [];
  document.querySelector("#checklist").innerHTML = part.checks
    .map((check, index) => `<li><label><input type="checkbox" value="${index}" ${saved.includes(index) ? "checked" : ""}> ${check}</label></li>`)
    .join("");
  updateProgress(part, saved);

  document.querySelector("#checklist").addEventListener("change", () => {
    const checked = [...document.querySelectorAll("#checklist input:checked")].map((box) => Number(box.value));
    allChecks[part.id] = checked;
    writeStorage(KEYS.checks, allChecks);
    updateProgress(part, checked);
  });

  document.querySelector("#reset").addEventListener("click", () => {
    document.querySelectorAll("#checklist input").forEach((box) => { box.checked = false; });
    allChecks[part.id] = [];
    writeStorage(KEYS.checks, allChecks);
    updateProgress(part, []);
  });

  saveRecent(part.id);
}

/* ---------- Feedback page ---------- */
function setupFeedback() {
  const select = document.querySelector("#part");
  select.insertAdjacentHTML("beforeend", parts.map((part) => `<option value="${part.id}">${part.name}</option>`).join(""));
  const message = document.querySelector("#form-message");

  document.querySelector("#feedback-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    const data = Object.fromEntries(new FormData(form));
    const part = parts.find((item) => item.id === data.part);

    if (!part) {
      message.textContent = "Choose a part before sending.";
      return;
    }

    const reports = readStorage(KEYS.reports, []);
    reports.push({ ...data, date: new Date().toISOString() });
    writeStorage(KEYS.reports, reports);
    message.textContent = `Thanks, ${data.name}. Your ${data.priority} priority note about the ${part.name} was saved. You have sent ${reports.length} in total.`;
    form.reset();
  });
}

const page = document.body.dataset.page;
if (page === "home") setupHome();
if (page === "part") setupPart();
if (page === "feedback") setupFeedback();
