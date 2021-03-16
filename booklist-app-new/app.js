// Book class: represents a book 
class Book {
  constructor(title, author, guid, medium, collection, category) {
    this.title = title;
    this.author = author;
    this.guid = chance.guid();
    this.medium = medium;
    this.collection = collection;
    this.category = category;
  }
}

// UI class: handles UI tasks 
class UI {
  static displayBooks() {
    const books = Store.getBooks();
  
    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');

    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.medium}</td>
    <td>${book.collection}</td>
    <td>${book.category}</td>
    <td>${book.guid}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();   
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);
    //vanish in 3 seconds 
    setTimeout(() => document.querySelector('.alert').remove(), 2700);
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#guid').value = '';
    document.querySelector('#medium').value = '';
    document.querySelector('#collection').value = '';
    document.querySelector('#category').value = '';
  }
}
//Store class: Handles Storage 
  class Store {
    static getBooks() {
      let books;
      if(localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
    
      return books;
    }

    static addBook(book) {
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(guid) {
      const books = Store.getBooks();

      books.forEach((book, index) => {
        if(book.guid = guid) {
          books.splice(index, 1);
        }
      });

      localStorage.setItem('books', JSON.stringify(books));
    }
  }

//Event: Display books 
document.addEventListener('DOMContentLoaded', UI.displayBooks);
//Event: Add a book 
document.querySelector('#book-form').addEventListener('submit', (e) => 
{

  // prevent actual submit 
  e.preventDefault();

// get form values 
const title = document.querySelector('#title').value;
const author = document.querySelector('#author').value;
const guid = document.querySelector('#guid').value;
const medium = document.querySelector('#medium').value;
const collection = document.querySelector('#collection').value;
const category = document.querySelector('#category').value;

//validate
if(title === '' || author === '' || medium === '' || collection === '' || category === '') {
  UI.showAlert('Please complete all fields', 'danger');
} else {

// instantiate book 
const book = new Book(title, author, guid, medium, collection, category);

// add book to ui 
UI.addBookToList(book);

//add book to store
Store.addBook(book);

// show success message
UI.showAlert('Resource Added', 'success'); 

//clear fields
UI.clearFields();
}
});

// Event: Remove a book from UI 
document.querySelector('#book-list').addEventListener('click', (e) => {
  UI.deleteBook(e.target)

  //remove book from store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // show success message
  UI.showAlert('Resource Removed', 'info');
  
  confirm('Are you sure you want to delete this resource?')(deleteBook('${guid}'));

});
