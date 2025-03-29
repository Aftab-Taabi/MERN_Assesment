import UpdateBookForm from "@/app/components/BookForm";

const UpdateBookPage = async({ params }) => {
    const {bookId} = await params
  return <UpdateBookForm bookId={bookId} />;
};

export default UpdateBookPage;
