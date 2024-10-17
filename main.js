document.addEventListener('DOMContentLoaded', function() {
    const bookForm = document.getElementById('bookForm');
    const incompleteBookList = document.getElementById('incompleteBookList');
    const completeBookList = document.getElementById('completeBookList');
    let books = JSON.parse(localStorage.getItem('books')) || [];
  
    function saveBooks() {
      localStorage.setItem('books', JSON.stringify(books));
    }
  
    bookForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const newBook = {
        id: Date.now(),
        title: bookForm.bookFormTitle.value.trim(),
        author: bookForm.bookFormAuthor.value.trim(),
        year: bookForm.bookFormYear.value.trim(),
        isComplete: bookForm.bookFormIsComplete.checked
      };
  
      books.push(newBook);
      saveBooks();
      displayBooks();
      bookForm.reset();
    });
  
    function displayBooks() {
      incompleteBookList.innerHTML = '';
      completeBookList.innerHTML = '';
      books.forEach(book => {
        const bookItem = createBookElement(book);
        book.isComplete ? completeBookList.appendChild(bookItem) : incompleteBookList.appendChild(bookItem);
      });
    }
  
    function createBookElement(book) {
      const bookDiv = document.createElement('div');
      bookDiv.className = 'book-item';
      bookDiv.innerHTML = `
        <h3>${book.title}</h3>
        <p>Penulis: ${book.author}</p>
        <p>Tahun: ${book.year}</p>
      `;
      const actionButtons = document.createElement('div');
      actionButtons.className = 'action-buttons';
      const toggleButton = createButton(book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca', () => toggleStatus(book.id));
      const deleteButton = createButton('Hapus Buku', () => deleteBook(book.id), 'red');
      actionButtons.append(toggleButton, deleteButton);
      bookDiv.append(actionButtons);
      return bookDiv;
    }
  
    function createButton(label, handler, color = 'blue') {
      const button = document.createElement('button');
      button.textContent = label;
      button.className = `btn ${color}`;
      button.addEventListener('click', handler);
      return button;
    }
  
    function toggleStatus(id) {
      books = books.map(book => book.id === id ? { ...book, isComplete: !book.isComplete } : book);
      saveBooks();
      displayBooks();
    }
  
    function deleteBook(id) {
      books = books.filter(book => book.id !== id);
      saveBooks();
      displayBooks();
    }
  
    displayBooks();
  });