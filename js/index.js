// data was inserted first to local storage:

// import bookData from '../data/books.json' with {type: 'json'};
// localStorage.setItem("bookData", JSON.stringify(bookData.books));

let originalBooks = JSON.parse(localStorage.getItem("bookData"));
let books = [...originalBooks];
let isUpdateBookEvent = false;

function displayBookData() {
  // add event listeners in some elements
  document.querySelector("#title-th").addEventListener("click", sortByTitle);
  document.querySelector("#price-th").addEventListener("click", sortByPrice);
  document.querySelector("#load-data").addEventListener("click", loadData);
  document
    .querySelector("#add-book-btn")
    .addEventListener("click", openAddBookOverlay);
  document
    .querySelector("#add-book-form")
    .addEventListener("submit", (event) => {
      // event.preventDefault();
      addBook();
    });
  document
    .querySelector("#add-book-form")
    .querySelector("button")
    .addEventListener("click", (event) => {
      event.preventDefault();
      document.querySelector("#add-overlay").style.display = "none";
    });

  document
    .querySelector("#update-book-form")
    .querySelector("button")
    .addEventListener("click", (event) => {
      event.preventDefault();
      document.querySelector("#update-overlay").style.display = "none";
    });
  document.querySelector("#dec").addEventListener("click", decrement);
  document.querySelector("#inc").addEventListener("click", increment);

  let row, cell, readBtn, updateBtn, deleteIcn;
  let tbody = document.querySelector("tbody");
  // clean last tbody
  tbody.innerHTML = "";

  // fill table with book data
  for (let i = 0; i < books.length; i++) {
    row = document.createElement("tr");
    cell = document.createElement("td");
    cell.innerHTML = books[i].id;
    row.appendChild(cell);

    cell = document.createElement("td");
    cell.innerHTML = books[i].title;
    row.appendChild(cell);

    cell = document.createElement("td");
    cell.innerHTML = `$ ${books[i].price}`;
    row.appendChild(cell);

    cell = document.createElement("td");
    readBtn = document.createElement("button");
    readBtn.innerHTML = "Read";
    readBtn.title = "read book";
    readBtn.className = "action-btn";
    readBtn.onclick = () => showBookDetails(books[i]);
    cell.appendChild(readBtn);
    row.appendChild(cell);

    cell = document.createElement("td");
    updateBtn = document.createElement("button");
    updateBtn.innerHTML = "Update";
    updateBtn.title = "update book";
    updateBtn.className = "action-btn";
    updateBtn.addEventListener("click", () => openUpdateBookOverlay(books[i]));
    cell.appendChild(updateBtn);
    row.appendChild(cell);

    cell = document.createElement("td");
    let deleteIcnContainer = document.createElement("span");
    deleteIcnContainer.addEventListener("click", () => deleteBook(books[i]));
    deleteIcn = document.createElement("i");
    deleteIcn.className = "iconify";
    deleteIcn.setAttribute("data-icon", "icon-park-outline:delete");
    deleteIcnContainer.appendChild(deleteIcn);
    deleteIcnContainer.setAttribute("title", "delete book");
    deleteIcnContainer.id = "delete-icn";
    cell.appendChild(deleteIcnContainer);
    row.appendChild(cell);
    tbody.appendChild(row);
  }
}

function showBookDetails(book) {
  let bookDetailsContainer = document.querySelector("#book-details");

  bookDetailsContainer.querySelector("#inner-book-details").style.display =
    "block";
  bookDetailsContainer.querySelector("#select-book").style.display = "none";

  let bookTitle = bookDetailsContainer.querySelector("#book-title-container p");
  bookTitle.innerHTML = book.title;

  let bookImg = bookDetailsContainer.querySelector("img");
  bookImg.src = book.image;
  bookImg.alt = book.title;
  bookImg.title = book.title;

  bookDetailsContainer.querySelector(
    "#book-price"
  ).innerHTML = `Price: $${book.price}`;

  let rate = bookDetailsContainer.querySelector("#rate");
  rate.value = book.rate;
  rate.setAttribute("data-book-id", book.id);
  // rate.addEventListener("change", () => rateBook(book));
}

function openAddBookOverlay() {
  let addBookOverlay = document.querySelector("#add-overlay");
  addBookOverlay.style.display = "flex";
  addBookOverlay.style.flexDirection = "column";
  addBookOverlay.style.alignItems = "center";
}

function openUpdateBookOverlay(book) {
  let updateBookOverlay = document.querySelector("#update-overlay");
  updateBookOverlay.style.display = "flex";
  updateBookOverlay.style.flexDirection = "column";
  updateBookOverlay.style.alignItems = "center";

  let updateBookForm = document.querySelector("#update-book-form");

  updateBookForm.querySelector("#update-book-id").value = book.id;
  updateBookForm.querySelector("#update-book-title").value = book.title;
  updateBookForm.querySelector("#update-book-price").value = book.price;
  updateBookForm.querySelector("#update-book-image").value = book.image;

  if (!isUpdateBookEvent) {
    updateBookForm.addEventListener("submit", (event) => {
      // event.preventDefault();
      updateBook(book);
      isUpdateBookEvent = true;
    });
  }
}

function addBook() {
  let addBookForm = document.querySelector("#add-book-form");

  let id = parseInt(addBookForm.querySelector("#add-book-id").value);
  let title = addBookForm.querySelector("#add-book-title").value;
  let price = Number(addBookForm.querySelector("#add-book-price").value);
  let image = addBookForm.querySelector("#add-book-image").value;

  let newBook = { id: id, title: title, price: price, image: image, rate: 0 };
  let prevBooks = JSON.parse(localStorage.getItem("bookData")) || [];

  if (prevBooks.some((book) => book.id === id)) {
    alert("The ID already exists. Please use a unique ID.");
    return;
  }

  prevBooks.push(newBook);

  localStorage.setItem("bookData", JSON.stringify(prevBooks));
  document.querySelector("#add-overlay").style.display = "none";

  addBookForm.reset(); // clean form
}

function updateBook(book) {
  let updateBookForm = document.querySelector("#update-book-form");
  let prevBooks = JSON.parse(localStorage.getItem("bookData")) || [];
  let index = prevBooks.findIndex((item) => item.id === book.id);
  let title = updateBookForm.querySelector("#update-book-title").value;
  let price = Number(updateBookForm.querySelector("#update-book-price").value);
  let image = updateBookForm.querySelector("#update-book-image").value;

  prevBooks[index] = {
    id: book.id,
    title: title,
    price: price,
    image: image,
    rate: book.rate,
  };

  localStorage.setItem("bookData", JSON.stringify(prevBooks));
  document.querySelector("#update-overlay").style.display = "none";
}

function deleteBook(book) {
  console.log(book);
  let prevBooks = JSON.parse(localStorage.getItem("bookData"));
  let newBooks = prevBooks.filter((item) => item.id !== book.id);
  localStorage.setItem("bookData", JSON.stringify(newBooks));
  loadData();
}

function increment() {
  let rateInput = document.querySelector("#rate");
  if (parseInt(rateInput.value) < 5)
    rateInput.value = parseInt(rateInput.value) + 1;
  let bookId = rateInput.dataset.bookId;
  let prevBooks = JSON.parse(localStorage.getItem("bookData")) || [];
  let index = prevBooks.findIndex((item) => item.id == bookId);
  let b = prevBooks[index];

  prevBooks[index] = {
    id: b.id,
    title: b.title,
    price: b.price,
    image: b.image,
    rate: parseInt(rateInput.value),
  };
  localStorage.setItem("bookData", JSON.stringify(prevBooks));
  loadData();
}

function decrement() {
  let rateInput = document.querySelector("#rate");
  if (parseInt(rateInput.value) > 0)
    rateInput.value = parseInt(rateInput.value) - 1;
  let bookId = rateInput.dataset.bookId;
  let prevBooks = JSON.parse(localStorage.getItem("bookData")) || [];
  let index = prevBooks.findIndex((item) => item.id == bookId);
  let b = prevBooks[index];

  prevBooks[index] = {
    id: b.id,
    title: b.title,
    price: b.price,
    image: b.image,
    rate: parseInt(rateInput.value),
  };
  localStorage.setItem("bookData", JSON.stringify(prevBooks));
  loadData();
}

function sortByTitle() {
  books.sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();

    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB) {
      return 1;
    }
    return 0;
  });

  displayBookData();
}

function sortByPrice() {
  books.sort((a, b) => a.price - b.price);

  displayBookData();
}

function loadData() {
  originalBooks = JSON.parse(localStorage.getItem("bookData"));
  books = [...originalBooks];
  displayBookData();
}

window.onload = displayBookData;
