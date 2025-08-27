const myLibrary = [];


function Book(title, author, pages, status){
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status
}

Book.prototype.toggleReadStatus = function() {
    this.status = !this.status
    renderLibrary()
}

function addBookToLibrary(title, author, pages, status){
    const book = new Book(title, author, pages, status);
    myLibrary.push(book)
}

function removeBook(id) {
    const index = myLibrary.findIndex((book) => book.id === id); // restituisce l'index che corrisponde alla condizione book.id === id cercando in tutti i book di myLibrary
    if (index !== -1) { //se non lo trova restituisce -1, quindi se è diverso da -1 significa che ha trovato
        myLibrary.splice(index, 1) // rimuove 1 elemento a partire da index
    }
    renderLibrary()
}



const display = document.querySelector('.display');
function renderLibrary(){
    display.innerHTML = '';
    myLibrary.forEach((book) => {
      const card = document.createElement('div');
      card.classList.add('card')
      card.dataset.bookId = book.id

      const title = document.createElement('h3');
      title.textContent = book.title;
    
      const author = document.createElement ('p');
      author.textContent = `Author: ${book.author}`;

      const pages = document.createElement ('p');
      pages.textContent = `Pages: ${book.pages}`;

      const status = document.createElement('p');
      status.textContent = book.status ? 'Read' : 'Not read yet' ;

      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'X'  
      removeBtn.addEventListener('click', () => {
        removeBook(book.id)
      })

      const toggleReadBtn = document.createElement('button');
      toggleReadBtn.textContent = 'Change read status';
      toggleReadBtn.addEventListener('click', () => {
        book.toggleReadStatus()
      })

      card.appendChild(title);
      card.appendChild(author);
      card.appendChild(pages);
      card.appendChild(status);  
      card.appendChild(removeBtn);
      card.appendChild(toggleReadBtn);

      display.appendChild(card);
    } )
}


const dialog = document.querySelector('#newBookDialog')
const newBookBtn = document.getElementById('newBookBtn');
const cancelBtn = document.getElementById('cancelBtn');
const form = document.getElementById('newBookForm')

newBookBtn.addEventListener('click', () => {
    dialog.showModal()
})

cancelBtn.addEventListener('click', () => {
    dialog.close();
})

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = form.title.value;
    const author = form.author.value;
    const pages = Number(form.pages.value);
    const status = form.status.checked;

    addBookToLibrary(title, author, pages, status);
    renderLibrary();
    form.reset();
    dialog.close();
})

addBookToLibrary('Il mio giorno', 'Luca', '23', true);
addBookToLibrary('Harry Potter', 'Giorgia', '23', true)
addBookToLibrary('Lessico', 'Antonio', '23', true)
addBookToLibrary('Cacca sotto', 'Mina', '23', true)
addBookToLibrary('Pisciazza', 'Renato', '23', true)

renderLibrary();