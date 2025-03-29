'use client';

import { useState, useEffect } from "react";
import { fetchBooks, deleteBook } from "@/utils/api";
import BookCard from "@/app/components/Card";
import DeleteModal from "@/app/components/DeleteModal";
import Loader from "@/app/components/Loader"; // Import loader component

export default function Home() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Start with true
  const [isDeleting, setIsDeleting] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  useEffect(() => {
    const loadBooks = async () => {
      setIsLoading(true); // Show loader
      try {
        const data = await fetchBooks();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
      setIsLoading(false); // Hide loader
    };
    loadBooks();
  }, []);

  const handleDelete = async () => {
    if (!bookToDelete) return;

    setIsDeleting(true);
    const success = await deleteBook(bookToDelete);

    if (success) {
      setBooks(books.filter(book => book._id !== bookToDelete));
      setBookToDelete(null); // Close modal
    } else {
      alert("Error deleting book. Please try again.");
    }
    
    setIsDeleting(false);
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center p-4">
      {isLoading ? (
        <Loader />
      ) : books.length ? (
        books.map((book) => (
          <BookCard key={book._id} book={book} onDelete={setBookToDelete} />
        ))
      ) : (
        <p>No Books found!</p> // Only show if request is complete & no books
      )}

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={!!bookToDelete}
        onClose={() => setBookToDelete(null)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}
