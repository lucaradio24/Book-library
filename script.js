

// Data structures 

class Book {
    constructor(title, author, pages, read = false){
    if(!title){
        throw new Error("Title can't be empty");
    }
    this.title = title;
    if(!author){
        throw new Error("Author can't be empty")
    }
    this.author = author;
    if(!Number.isInteger(pages) || pages < 1){
        throw new Error ("Enter a valid number of pages")
    }
    this.pages = pages;
    this.id = crypto.randomUUID()
    this.read = read;   
    }
    toggleRead() {
        this.read = !this.read;
    }

    info(){
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read'}`
    }

    toJSON() {
        return {
    id: this.id,
    title: this.title,
    author: this.author,
    pages: this.pages,
    read: this.read
  }
}
}

class Library {
    constructor(){
        this.books = []
    }

    list(start = 0, count){
        if (count === undefined) count = this.books.length;
        return this.books.slice(start, start + count);
    }

    add(title, author, pages, read = false){
        const book = new Book(title, author, pages, read)
        this.books.push(book);
        return book.id;
    }

    removeBook(id){
        const index = this.books.findIndex(b => b.id === id)
        if (index === -1) return false;
        this.books.splice(index, 1);
        return true
    }
    getBook(id){
        return this.books.find(b => b.id === id);
    }
    isInLibrary(id){
        return this.books.some(b => b.id === id);
    }

}
