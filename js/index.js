import bookData from '../data/books.json' with {type: 'json'};

function displayBookData() {
    console.log(bookData);

    let books = bookData.books;

    let row, cell, readBtn, updateBtn, deleteIcn;
    let tbody = document.querySelector('tbody');

    for (let i = 0; i < books.length; i++) {
        row = document.createElement('tr');
        cell = document.createElement('td');
        cell.innerHTML = books[i].id;
        row.appendChild(cell);

        cell = document.createElement('td');
        cell.innerHTML = books[i].title;
        row.appendChild(cell);

        cell = document.createElement('td');
        cell.innerHTML = `$ ${books[i].price}`;
        row.appendChild(cell);

        cell = document.createElement('td');
        readBtn = document.createElement('button');
        readBtn.innerHTML = "Read";
        readBtn.title = "read book";
        readBtn.className = 'action-btn';
        cell.appendChild(readBtn);
        row.appendChild(cell);

        cell = document.createElement('td');
        updateBtn = document.createElement('button');
        updateBtn.innerHTML = "Update";
        updateBtn.title = "update book";
        updateBtn.className = 'action-btn';
        cell.appendChild(updateBtn);
        row.appendChild(cell);

        cell = document.createElement('td');
        let deleteIcnContainer = document.createElement('span');
        deleteIcn = document.createElement('i');
        deleteIcn.className = 'iconify';
        deleteIcn.setAttribute('data-icon', 'icon-park-outline:delete');
        deleteIcnContainer.appendChild(deleteIcn);
        deleteIcnContainer.setAttribute('title', 'delete book');
        deleteIcnContainer.id = 'delete-icn';
        cell.appendChild(deleteIcnContainer);
        row.appendChild(cell);
        tbody.appendChild(row);
    }
}

window.onload = displayBookData;
