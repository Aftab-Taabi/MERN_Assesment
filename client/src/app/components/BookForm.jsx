"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { saveBook } from "@/utils/api";
import { useBook } from "@/hooks/useBooks";
import Loader from "./Loader";
import { useEffect, useState } from "react";

const BookForm = ({ bookId }) => {
  const router = useRouter();
  const isEditing = !!bookId;
  const { book, loading, error } = useBook(bookId);
  const [serverErrors, setServerErrors] = useState({});

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      author: "",
      publishedYear: "",
      ISBN: "",
      description: "",
    },
  });

  useEffect(() => {
    if (book) {
      reset(book); // Reset form values when book data is available
    }
  }, [book, reset]);

  const onSubmit = async (data) => {
    setServerErrors({}); // Clear previous errors before submission

    try {
      await saveBook(bookId, data);
      reset();
      router.replace("/");
    } catch (error) {
      console.error(error);
      const errorMsg = error?.response?.data?.error;

      let newErrors = {};
      
      if (errorMsg?.includes("E11000 duplicate key error")) {
        newErrors.ISBN = "A book with this ISBN already exists.";
      } 
      if (errorMsg?.includes("Book validation failed")) {
        if (errorMsg.includes("ISBN")) newErrors.ISBN = "Please enter a valid ISBN.";
        if (errorMsg.includes("title")) newErrors.title = "Title is required.";
        if (errorMsg.includes("author")) newErrors.author = "Author is required.";
        if (errorMsg.includes("publishedYear")) newErrors.publishedYear = "Invalid year.";
      } 

      if (Object.keys(newErrors).length === 0) {
        newErrors.general = "Something went wrong. Please try again.";
      }

      setServerErrors(newErrors);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
        {isEditing ? "Update Book" : "Create a New Book"}
      </h2>
      
      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading && <Loader />}
      
      {/* Prevent rendering form while loading */}
      {!loading && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block font-semibold mb-1">Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="w-full p-2 border rounded-md"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            {serverErrors.title && <p className="text-red-500 text-sm mt-1">{serverErrors.title}</p>}
          </div>

          {/* Author */}
          <div>
            <label className="block font-semibold mb-1">Author</label>
            <input
              type="text"
              {...register("author", { required: "Author is required" })}
              className="w-full p-2 border rounded-md"
            />
            {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>}
            {serverErrors.author && <p className="text-red-500 text-sm mt-1">{serverErrors.author}</p>}
          </div>

          {/* Published Year */}
          <div>
            <label className="block font-semibold mb-1">Published Year</label>
            <input
              type="number"
              {...register("publishedYear", {
                required: "Year is required",
                min: { value: 1900, message: "Year must be 1900 or later" },
                max: { value: new Date().getFullYear(), message: "Invalid year" },
              })}
              className="w-full p-2 border rounded-md"
            />
            {errors.publishedYear && <p className="text-red-500 text-sm mt-1">{errors.publishedYear.message}</p>}
            {serverErrors.publishedYear && <p className="text-red-500 text-sm mt-1">{serverErrors.publishedYear}</p>}
          </div>

          {/* ISBN */}
          <div>
            <label className="block font-semibold mb-1">ISBN</label>
            <input
              type="text"
              {...register("ISBN", {
                required: "ISBN is required",
                pattern: {
                  value: /^(97(8|9))?\d{9}(\d|X)$/,
                  message: "Please enter a valid ISBN",
                },
              })}
              className="w-full p-2 border rounded-md"
            />
            {errors.ISBN && <p className="text-red-500 text-sm mt-1">{errors.ISBN.message}</p>}
            {serverErrors.ISBN && <p className="text-red-500 text-sm mt-1">{serverErrors.ISBN}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              {...register("description", { required: "Description is required" })}
              className="w-full p-2 border rounded-md"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          {/* General Server Error Message */}
          {serverErrors.general && <p className="text-red-500 text-center">{serverErrors.general}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full p-2 text-white rounded-md ${
              isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Submitting..." : isEditing ? "Update Book" : "Add Book"}
          </button>
        </form>
      )}
    </div>
  );
};

export default BookForm;
