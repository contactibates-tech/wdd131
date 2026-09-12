// Display the current year in the footer copyright notice
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

// Display the date this document was last modified
document.getElementById("lastModified").textContent =
  "Last Modified: " + document.lastModified;
