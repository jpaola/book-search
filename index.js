// Function to fetch book data from the Open Library API
async function searchBooks() {
	const query = document.getElementById("search-query").value;
	// Open Library search endpoint
	const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`;

	try {
		const response = await fetch(url);
		const data = await response.json();

		// Check if we have books to display
		if (data.docs && data.docs.length > 0) {
			displayBooks(data.docs);
		} else {
			document.getElementById("book-results").innerHTML = "No books found.";
		}
	} catch (error) {
		console.error("Error fetching data:", error);
		document.getElementById("book-results").innerHTML = "Failed to fetch books.";
	}
}

// Function to display the books on the page
function displayBooks(books) {
	const bookResultsDiv = document.getElementById("book-results");
	// Clear previous results
	bookResultsDiv.innerHTML = "";

	books.forEach(book => {
		const bookDiv = document.createElement("div");
		bookDiv.classList.add("book");

		const bookImage = document.createElement("img");
		// Set the book cover image if available
		const coverId = book.cover_i;
		if (coverId) {
			bookImage.src = `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;  // Open Library cover image
		} else {
			bookImage.src = "https://via.placeholder.com/150";  // Fallback image if no cover
		}

		const bookTitle = document.createElement("div");
		bookTitle.classList.add("book-title");
		bookTitle.textContent = book.title;

		const bookAuthor = document.createElement("div");
		bookAuthor.classList.add("book-author");
		bookAuthor.textContent = book.author_name ? book.author_name.join(", ") : "Unknown author";

		bookDiv.appendChild(bookImage);
		bookDiv.appendChild(bookTitle);
		bookDiv.appendChild(bookAuthor);

		bookResultsDiv.appendChild(bookDiv);
	});
}