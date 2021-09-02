//no result
document.getElementById('no-result').style.display = 'none';
loadData = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    //clear input field
    searchField.value = '';


    //fetching api
    fetch(`https://openlibrary.org/search.json?q=${searchText}`)
        .then(res => res.json())
        .then(data => displayData(data))

}

//display book data
displayData = books => {
    const booksList = books.docs;
    const card = document.getElementById('book-list');
    const heading = document.getElementById('heading');
    //text content clear
    card.textContent = '';

    //show sorry message
    if (booksList == 0) {
        heading.style.display = 'none';
        document.getElementById('no-result').style.display = 'block';
    }

    //show booklist
    else {
        heading.style.display = 'block';
        heading.innerHTML = `
        <h4>There are ${books.numFound} results with this name</h4>
        `;
        booksList.forEach(book => {
            const div = document.createElement('div');
            div.classList.add('col');
            // image id
            const imgIdStr = book.id_goodreads;
            const imgId = Number(imgIdStr);
            const imgUrl = `https://covers.openlibrary.org/b/id/${imgId}-M.jpg`;

            //clear data
            div.textContent = '';

            div.innerHTML = `
        <div class="card h-100">
            <img src="${imgUrl}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${book.title}</h5>
              <p class="card-text">Auther Name: ${book.author_name}</p>
            </div>
            <div class="card-footer">
              <small class="text-muted">First published by ${book?.publisher} in ${book?.first_publish_year} </small>
            </div>
          </div>
        `;
            card.appendChild(div);
        })
    }
}