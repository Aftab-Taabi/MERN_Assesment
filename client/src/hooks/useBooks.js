import { useState, useEffect } from "react";
import { fetchBook } from "@/utils/api";

export const useBook = (bookId) => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!bookId) return;
    setLoading(true);
    fetchBook(bookId)
      .then(setBook)
      .catch(() => setError("Failed to fetch book data."))
      .finally(() => setLoading(false));
  }, [bookId]);

  return { book, loading, error };
};