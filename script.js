const grid = document.getElementById("link-grid");
const searchInput = document.getElementById("search-input");
const categoryContainer = document.getElementById("category-pills");

let allLinks = [];

// FETCH DATA
fetch("links.json")
  .then(r => r.json())
  .then(data => {
    allLinks = data;
    renderCategories(data);
    renderLinks(data);
  });

function renderLinks(data) {
  grid.innerHTML = "";

  data.forEach(link => {
    const card = document.createElement("a");
    card.className = "card";
    card.href = link.url;
    card.innerHTML = `
      <i data-lucide="${link.icon}"></i>
      <h3>${link.title}</h3>
      <p>${link.desc}</p>
    `;
    grid.appendChild(card);
  });

  lucide.createIcons();
}

function renderCategories(data) {
  const cats = ["all", ...new Set(data.map(l => l.category))];

  cats.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "pill";
    btn.textContent = cat;
    btn.onclick = () => {
      document.querySelectorAll(".pill").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      if (cat === "all") renderLinks(allLinks);
      else renderLinks(allLinks.filter(l => l.category === cat));
    };
    categoryContainer.appendChild(btn);
  });

  categoryContainer.firstChild.classList.add("active");
}

// SEARCH
searchInput.addEventListener("input", e => {
  const t = e.target.value.toLowerCase();
  renderLinks(
    allLinks.filter(l =>
      l.title.toLowerCase().includes(t) ||
      l.desc.toLowerCase().includes(t)
    )
  );
});
