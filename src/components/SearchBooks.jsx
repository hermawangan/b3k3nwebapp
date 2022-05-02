import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchBooks } from "../redux";

function SearchBooks({ books, fetchBooks, search }) {
  useEffect(() => {
    fetchBooks();
  }, []);
  const filteredBooks =
    search.length === 0
      ? []
      : books.filter(
          (book) =>
            book.title.toLowerCase().includes(search.toLowerCase()) ||
            book.authors[0].toLowerCase().includes(search.toLowerCase())
        );

  return (
    <div className="absolute h-52 left-[4.5%] w-11/12 bg-white border-2  border-gray-800 overflow-auto  rounded-sm md:w-3/4 md:left-[12.5%] md:h-60 lg:w-1/2 lg:left-[25%]">
      <ul className="">
        {filteredBooks.map((book) => {
          return (
            <li key={book.id}>
              <span className="text-lg font-semibold md:text-xl">
                {book.authors[0]}: {book.title}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    books: state.books.books,
    loading: state.books.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBooks: () => dispatch(fetchBooks()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBooks);
