import Link from "next/link";

export default function BookCard({ book, onDelete }) {
  return (
    <div className="flex flex-col bg-white shadow-lg rounded-xl p-5 border border-gray-300 w-full sm:w-80 transition hover:shadow-xl">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{book.title}</h3>
      <p className="text-sm text-gray-700"><span className="font-semibold">Author:</span> {book.author}</p>
      <p className="text-sm text-gray-700"><span className="font-semibold">Published:</span> {book.publishedYear}</p>
      <p className="text-sm text-gray-700"><span className="font-semibold">ISBN:</span> {book.ISBN}</p>
      <p className="text-sm text-gray-700 mb-3"><span className="font-semibold">Description:</span> {book.description}</p>

      <div className="mt-auto flex gap-2">
        <Link href={`/book/${book._id}`} className="flex-1 text-center px-4 py-2 bg-blue-500 text-white font-medium rounded-md transition hover:bg-blue-600">
          Edit
        </Link>
        <button
          onClick={() => onDelete(book._id)}
          className="flex-1 px-4 py-2 bg-red-500 text-white font-medium rounded-md transition hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
