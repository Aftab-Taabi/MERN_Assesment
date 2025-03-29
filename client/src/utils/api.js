// utils/api.js
export const fetchBooks = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/books");
      if (!res.ok) throw new Error("Failed to fetch books");
      return await res.json();
    } catch (error) {
      console.error("Error fetching books:", error);
      return [];
    }
  };
  
  export const deleteBook = async (bookId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/books/${bookId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete book");
      return true;
    } catch (error) {
      console.error("Error deleting book:", error);
      return false;
    }
  };
  
  export const fetchBook = async (bookId) => {
    const response = await fetch(`http://localhost:5000/api/books/${bookId}`);
    if (!response.ok) throw new Error("Failed to fetch book data.");
    return response.json();
  };
  
  export const saveBook = async (bookId, data) => {
    const url = bookId ? `http://localhost:5000/api/books/${bookId}` : "http://localhost:5000/api/books";
    const method = bookId ? "PUT" : "POST";
    
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) throw new Error(`Failed to ${bookId ? "update" : "add"} book.`);
    return response.json();
  };