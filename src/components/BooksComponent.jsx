import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchBooks } from "../redux";

function BooksComponent({ books, loading, fetchBooks, id }) {
  const [pagination, setPagination] = useState(0);

  useEffect(() => {
    fetchBooks(id, pagination);
  }, []);

  const nextButton = () => {
    if (pagination === books.length) {
      return pagination;
    } else {
      setPagination(pagination + 1);
    }
    fetchBooks(id, pagination + 1);
  };

  const prevButton = () => {
    if (pagination === 0) {
      return pagination;
    } else {
      setPagination(pagination - 1);
    }
    fetchBooks(id, pagination - 1);
  };

  return (
    <div>
      {loading ? (
        <p>please wait</p>
      ) : (
        books.map((book) => {
          return (
            <div key={book.id}>
              <p>{book.title}</p>
              <p>{book.authors[0]}</p>
            </div>
          );
        })
      )}
      <div>
        {pagination === 0 ? null : (
          <span onClick={prevButton}>Prev {pagination}</span>
        )}
        <p>{pagination + 1}</p>
        {pagination === 10 ? null : (
          <span onClick={nextButton}>next {pagination + 2}</span>
        )}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    books: state.books.books,
    loading: state.books.loading,
    id: state.id.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBooks: (id, pagination) => dispatch(fetchBooks(id, pagination)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksComponent);
