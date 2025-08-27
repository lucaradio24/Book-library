let myLibrary = [];
const container = document.querySelector(".container");

function Book(title, author, pages, status) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function addBookToLibrary(title, author, pages, status) {
  const book = new Book(title, author, pages, status);
  myLibrary.push(book);
}

function removeBook(id) {
  myLibrary = myLibrary.filter((book) => book.id !== id);
}

Book.prototype.toggleStatus = function () {
  this.status = !this.status;
};

function toggleBook(id) {
  const book = myLibrary.find((book) => book.id === id);
  if (book) {
    book.toggleStatus();
  }
}

function renderLibrary() {
  container.innerHTML = "";
  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.bookId = book.id;

    const img = document.createElement("img");
    img.src = book.image || "https://placehold.co/257x300";
    img.alt = book.title;
    card.appendChild(img);

    const title = document.createElement("h3");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.textContent = `Author: ${book.author}`;

    const pages = document.createElement("p");
    pages.textContent = `Pages: ${book.pages}`;

    const status = document.createElement("p");
    status.textContent = book.status ? "Read" : "Not read";

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.classList.add("remove-btn");
    removeBtn.dataset.action = "remove";
    removeBtn.innerHTML =
      '<span class="material-icons" aria-hidden="true">close</span>';

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Toggle status";
    toggleBtn.dataset.action = "toggle";

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(status);
    card.appendChild(removeBtn);
    card.appendChild(toggleBtn);

    container.appendChild(card);
  });
}

container.addEventListener("click", (e) => {
  // cerca l'elemento più vicino che espone data-action (può essere il button o lo span interno)
  const actionEl = e.target.closest("[data-action]");
  if (!actionEl || !container.contains(actionEl)) return;

  const card = actionEl.closest(".card");
  if (!card) return;

  const id = card.dataset.id;
  const action = actionEl.dataset.action;

  if (action === "remove") {
    removeBook(id);
  } else if (action === "toggle") {
    toggleBook(id);
  }

  renderLibrary();
});

const dialog = document.querySelector("#newBookDialog");
const form = document.querySelector("#newBookForm");
const newBookBtn = document.querySelector("#newBookBtn");
const cancelBtn = document.querySelector("#cancelBtn");
newBookBtn.addEventListener("click", () => {
  dialog.showModal();
});
cancelBtn.addEventListener("click", () => {
  dialog.close();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = form.title.value;
  const author = form.author.value;
  const pages = Number(form.pages.value);
  const status = form.status.checked;

  

  addBookToLibrary(title, author, pages, status);
  renderLibrary();
  form.reset();
  dialog.close();
});

addBookToLibrary("Il nome della rosa", "Umberto Eco", 293, true);
addBookToLibrary("Harry Potter", "J. K. Rowling", 293, false);
addBookToLibrary("Harry Potter", "J. K. Rowling", 293, false);
addBookToLibrary("Harry Potter", "J. K. Rowling", 293, false);
addBookToLibrary("Harry Potter", "J. K. Rowling", 293, false);

renderLibrary();
