// ---------- Populate the Product Name select ----------
const productSelect = document.querySelector("#productName");

products.forEach((product) => {
  const option = document.createElement("option");
  option.value = product.id;
  option.textContent = product.name;
  productSelect.appendChild(option);
});

// ---------- Footer dates ----------
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent =
  "Last Modification: " + document.lastModified;
