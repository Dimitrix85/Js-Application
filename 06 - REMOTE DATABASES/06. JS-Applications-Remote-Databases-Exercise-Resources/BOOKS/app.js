import { getRequest, putRequest, postRequest, deleteRequst } from './requester.js';

document.addEventListener("click", handler);

let actions = {
  loadBooks: () => loadAllBooks(),
  submitBtn: (e) => createBook(e),
  delete: (e) => deleteBook(e),
  edit: (e) => editBookFields(e),
  editBook: (e) => editBook(e)
}

let htmlElements = {
  books: () => document.getElementById("books"),
  form: () => document.getElementById("form"),
  title: () => document.getElementById("title"),
  author: () => document.getElementById("author"),
  isbn: () => document.getElementById("isbn"),
  submitBtn: () => document.getElementById("submitBtn"),
}

function handler(e) {
  if (typeof actions[e.target.id] === "function") {
    actions[e.target.id](e);
  }
}

function createBook(e) {
  e.preventDefault();

  let book = {
    "title": htmlElements.title().value,
    "author": htmlElements.author().value,
    "isbn": htmlElements.isbn().value
  };

  postRequest("appdata", "books", book)
    .then(() => {
      loadAllBooks();
      htmlElements.title().value = "";
      htmlElements.author().value = "";
      htmlElements.isbn().value = "";
    });

}

function editBook(e){
  let id = e.target.getAttribute("target-id");
  e.preventDefault();
  let updateBook = {
    title: htmlElements.title().value,
    author: htmlElements.author().value,
    isbn: htmlElements.isbn().value,
  }

  putRequest("appdata",`books/${id}`,updateBook)
  .then(()=>{
    htmlElements.title().value = "";
    htmlElements.author().value = "";
    htmlElements.isbn().value = "";
    location.reload();
  });
}

async function editBookFields(e) {
  let id = e.target.getAttribute("target-id");
  let book = await getRequest("appdata", `books/${id}`);
  debugger;
  htmlElements.form().textContent = "Edit";
  htmlElements.title().value = book.title;
  htmlElements.author().value = book.author;
  htmlElements.isbn().value = book.isbn;
  let editBtn = htmlElements.submitBtn();
  editBtn.textContent = "Edit";
  editBtn.id = "editBook";
  editBtn.setAttribute("target-id",id);
}

function deleteBook(e) {
  let id = e.target.getAttribute("target-id");
  deleteRequst("appdata", `books/${id}`)
    .then(() => {
      loadAllBooks();
    });
}

function loadAllBooks() {
  htmlElements.books().innerHTML = "";
  getRequest("appdata", "books")
    .then(data => {
      Array.from(data).forEach(element => {
        loadBook(element);
      });
    })
}

function loadBook(data) {
  let tr = document.createElement('tr');
  let fragment = document.createDocumentFragment();
  let titleTd = createTd(data.title);
  let authorTd = createTd(data.author);
  let isbnTd = createTd(data.isbn);
  let buttonTd = createTd();
  let editBtn = createBtn("Edit", data._id, "edit");
  let deleteBtn = createBtn("Delete", data._id, "delete");
  buttonTd.append(editBtn, deleteBtn);
  fragment.append(titleTd, authorTd, isbnTd, buttonTd);
  tr.append(fragment);
  htmlElements.books().append(tr);
}

function createBtn(content, targetId, id) {
  let btn = document.createElement("button");
  btn.setAttribute("target-id", targetId);
  btn.id = id;
  btn.textContent = content;
  return btn;
}

function createTd(data) {
  let td = document.createElement("td");

  if (data) {
    td.textContent = data;
  }

  return td;
}


(function loadPage(){
  loadAllBooks()
})();