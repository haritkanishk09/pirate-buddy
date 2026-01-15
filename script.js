const grid = document.getElementById("link-grid");
const searchInput = document.getElementById("search-input");
const categoryContainer = document.getElementById("category-container");
const btnGrid = document.getElementById("btn-grid");
const btnList = document.getElementById("btn-list");

let allLinks = [];

// FETCH DATA
fetch("links.json")
  .then(res => res.json())
  .then(data => {
    allLinks = data;
    renderCategories(data);
    renderLinks(data);
  });

// RENDER LINKS
function renderLinks(data) {
  grid.innerHTML = "";

  if (!data.length) {
    grid.innerHTML = "<p>No results found.</p>";
    return;
  }

  data.forEach(link => {
    const card = document.createElement("a");
    card.href = link.url;
    card.className = "card";
    card.innerHTML = `
      <div class="card-title">${link.icon} ${link.title}</div>
      <div class="card-desc">${link.desc}</div>
      <div class="tag">${link.category}</div>
    `;
    grid.appendChild(card);
  });
}

// AUTO CATEGORIES
function renderCategories(data) {
  const categories = ["All", ...new Set(data.map(l => l.category))];

  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "control-btn";
    btn.textContent = cat;
    btn.onclick = () => {
      document.querySelectorAll(".control-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      if (cat === "All") renderLinks(allLinks);
      else renderLinks(allLinks.filter(l => l.category === cat));
    };
    categoryContainer.appendChild(btn);
  });

  categoryContainer.firstChild.classList.add("active");
}

// SEARCH
searchInput.addEventListener("input", e => {
  const term = e.target.value.toLowerCase();
  renderLinks(
    allLinks.filter(l =>
      l.title.toLowerCase().includes(term) ||
      l.desc.toLowerCase().includes(term)
    )
  );
});

// VIEW TOGGLE
btnList.onclick = () => {
  grid.classList.add("list-mode");
  btnList.classList.add("active");
  btnGrid.classList.remove("active");
};

btnGrid.onclick = () => {
  grid.classList.remove("list-mode");
  btnGrid.classList.add("active");
  btnList.classList.remove("active");
};

