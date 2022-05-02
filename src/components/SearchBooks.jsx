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
    <div>
      <ul>
        {filteredBooks.map((book) => {
          return (
            <li key={book.id}>
              Title: <span>{book.title}</span>
              Name : <span>{book.authors[0]}</span>
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
