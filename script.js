const table = document.getElementById("table");
const addBookBtn = document.getElementById("add-book");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close");
const submitBtn = document.getElementById("submit-btn");
const deleteBtn = document.getElementById("delete-btn");

//Object Constructor
function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

let library = [];

//Function expression to open form
const openForm = (event) => {
  overlay.style.display = "block";
  modal.style.display = "block";
}

//Function expression to close form
const closeForm = (event) => {
  overlay.style.display = "none";
  modal.style.display = "none";
}

function addRow(book) {
  let newRow = table.insertRow(table.rows.length);

  let cellNumber = newRow.insertCell(0);
  let cellTitle = newRow.insertCell(1);
  let cellAuthor = newRow.insertCell(2);
  let cellPages = newRow.insertCell(3);
  let cellStatus = newRow.insertCell(4);
  let cellDeleteIcon = newRow.insertCell(5);

  cellNumber.innerHTML = library.length;
  cellTitle.innerHTML = book.title;
  cellAuthor.innerHTML = book.author;
  cellPages.innerHTML = book.pages;
  cellStatus.innerHTML = book.status;
  cellDeleteIcon.innerHTML = '<button id="delete-btn" onclick="deleteBook(this)"><i class="material-icons delete">delete_outline</i></button>';

  if (book.status === "Read") {
    newRow.style.color = "red";
  } else if (book.status === "In Progress") {
    newRow.style.color = "green";
  }
}

function deleteBook(clickedBtn) {
  // Removes row from table
  let targetRow = clickedBtn.parentNode.parentNode.rowIndex;
  table.deleteRow(targetRow);
  // Removes book from library
  let index = targetRow - 2;
  library.splice(index, 1);
  // Updates No. column when a row is deleted
  let bookNumber = 1;
  for (let i = 2; i < table.rows.length; i++) {
    table.rows[i].cells[0].innerHTML = bookNumber;
    bookNumber++;
  }
}

addBookBtn.addEventListener("click", openForm);

closeBtn.addEventListener("click", closeForm);

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  
  let titleInput = document.getElementById("title").value;
  let authorInput = document.getElementById("author").value;
  let pagesInput = document.getElementById("pages").value;
  let statusOption = document.getElementById("status").value;
  let book = new Book(titleInput, authorInput, pagesInput, statusOption);

  library.push(book);
  addRow(book);
  closeForm();
});

