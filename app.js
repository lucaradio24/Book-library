class Book {
  constructor(title, author, pages, status) {
    this.id = crypto.randomUUID(); // Genera un ID univoco per ogni libro
    this.title = title; // Salva il titolo del libro
    this.author = author; // Salva l'autore del libro
    this.pages = pages; // Salva il numero di pagine
    this.status = status; // Salva se il libro è stato letto (true) o no (false)
  }

  toggleReadStatus() {
    this.status = !this.status; // Inverte lo stato di lettura (da letto a non letto o viceversa)
  }
}

// Definisce la classe Library che gestisce la collezione di libri
class Library {
  constructor(containerSelector) {
    this.books = []; // Inizializza l'array vuoto per i libri
    this.container = document.querySelector(containerSelector); // Seleziona l'elemento HTML dove mostrare i libri
  }

  addBook(title, author, pages, status) {
    const book = new Book(title, author, pages, status); // Crea un nuovo oggetto libro
    this.books.push(book); // Aggiunge il libro all'array
    this.render(); // Aggiorna la visualizzazione
  }

  toggleBook(id) {
    const book = this.books.find((book) => book.id === id); // Cerca un libro con l'ID specificato
    if (book) {
      // Se trova il libro...
      book.toggleReadStatus(); // ...cambia il suo stato di lettura
    }
    this.render(); // Aggiorna la visualizzazione
  }

  render() {
    this.container.innerHTML = ""; // Svuota il contenitore HTML
    this.books.forEach((book) => {
      // Per ogni libro nell'array...
      const card = document.createElement("div"); // Crea un elemento div per la card
      card.classList.add("card"); // Aggiunge la classe CSS 'card'
      card.dataset.bookId = book.id; // Memorizza l'ID del libro come attributo data-

      const title = document.createElement("h3"); // Crea un elemento h3 per il titolo
      title.textContent = book.title; // Imposta il testo del titolo

      const author = document.createElement("p"); // Crea un paragrafo per l'autore
      author.textContent = `Author: ${book.author}`; // Imposta il testo dell'autore

      const pages = document.createElement("p"); // Crea un paragrafo per le pagine
      pages.textContent = `Pages: ${book.pages}`; // Imposta il testo delle pagine

      const status = document.createElement("p"); // Crea un paragrafo per lo stato
      status.textContent = book.status ? "Read" : "Not read yet"; // Mostra "Read" o "Not read yet"

      const removeBtn = document.createElement("button"); // Crea un bottone per rimuovere
      removeBtn.type = "button"; // Imposta il tipo a button (evita submit accidentali)
      removeBtn.textContent = "X"; // Imposta il testo del bottone
      removeBtn.classList.add("remove-btn"); // Aggiunge la classe CSS 'remove-btn'
      removeBtn.addEventListener("click", () => {
        // Aggiunge un listener per il click
        this.removeBook(book.id); // Rimuove il libro quando cliccato, this si riferisce all'istanza libreria
      });

      const toggleReadBtn = document.createElement("button"); // Crea un bottone per cambiare lo stato
      toggleReadBtn.type = "button"; // Imposta il tipo a button
      toggleReadBtn.textContent = "Change read status"; // Imposta il testo del bottone
      toggleReadBtn.addEventListener("click", () => {
        // Aggiunge un listener per il click
        this.toggleBook(book.id); // Cambia lo stato quando cliccato
      });

      card.appendChild(title); // Aggiunge il titolo alla card
      card.appendChild(author); // Aggiunge l'autore alla card
      card.appendChild(pages); // Aggiunge le pagine alla card
      card.appendChild(status); // Aggiunge lo stato alla card
      card.appendChild(removeBtn); // Aggiunge il bottone di rimozione alla card
      card.appendChild(toggleReadBtn); // Aggiunge il bottone di cambio stato alla card

      this.container.appendChild(card); // Aggiunge la card al contenitore HTML
    });
  }
}

// --- UI setup ---
const library = new Library(".display"); // Crea una nuova libreria collegata all'elemento con classe 'display'

const dialog = document.querySelector("#newBookDialog"); // Seleziona il dialog per aggiungere libri
const newBookBtn = document.getElementById("newBookBtn"); // Seleziona il bottone per aprire il dialog
const cancelBtn = document.getElementById("cancelBtn"); // Seleziona il bottone per cancellare
const form = document.getElementById("newBookForm"); // Seleziona il form

newBookBtn.addEventListener("click", () => {
  // Quando il bottone viene cliccato...
  dialog.showModal(); // ...mostra il dialog
});

cancelBtn.addEventListener("click", () => {
  // Quando il bottone cancel viene cliccato...
  dialog.close(); // ...chiude il dialog
});

form.addEventListener("submit", (e) => {
  // Quando il form viene inviato...
  e.preventDefault(); // ...previene il comportamento predefinito (ricarica pagina)

  const title = form.title.value; // Prende il valore del campo titolo
  const author = form.author.value; // Prende il valore del campo autore
  const pages = Number(form.pages.value); // Converte in numero il valore del campo pagine
  const status = form.status.checked; // Prende il valore del checkbox status (true/false)

  library.addBook(title, author, pages, status); // Aggiunge un nuovo libro alla libreria
  form.reset(); // Resetta il form
  dialog.close(); // Chiude il dialog
});

// --- Dati di esempio ---
library.addBook("Il mio giorno", "Luca", 23, true); // Aggiunge un libro di esempio
library.addBook("Harry Potter", "Giorgia", 23, true); // Aggiunge un libro di esempio
library.addBook("Lessico", "Antonio", 23, true); // Aggiunge un libro di esempio
library.addBook("Cacca sotto", "Mina", 23, true); // Aggiunge un libro di esempio
library.addBook("Pisciazza", "Renato", 23, true); // Aggiunge un libro di esempio
