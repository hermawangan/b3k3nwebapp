import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchBooks } from "../redux";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";

function BooksComponent({ books, loading, fetchBooks, id }) {
  const [pagination, setPagination] = useState(0);
  const [favourites, setFavourites] = useState([]);
  const getArray = JSON.parse(localStorage.getItem("favorites") || "0");

  useEffect(() => {
    fetchBooks(id, pagination);
    if (getArray !== 0) {
      setFavourites([...getArray]);
    }
  }, []);

  const nextButton = () => {
    if (pagination === books.length) {
      return pagination;
    } else {
      setPagination(pagination + 1);
    }
    fetchBooks(id, pagination + 1);
    console.log(books.length);
  };

  const prevButton = () => {
    if (pagination === 0) {
      return pagination;
    } else {
      setPagination(pagination - 1);
    }
    fetchBooks(id, pagination - 1);
  };

  const addFav = (items, id) => {
    let array = favourites;
    let addAray = true;

    array.map((item, key) => {
      if (item === id) {
        array.splice(key, 1);
        addAray = false;
      }
    });
    if (addAray) {
      array.push(id);
    }
    setFavourites([...array]);
    localStorage.setItem("favorites", JSON.stringify(favourites));

    let storage = localStorage.getItem("favBook" + id || "0");
    if (storage === null) {
      localStorage.setItem("favBook" + id, JSON.stringify(items));
    } else {
      localStorage.removeItem("favBook" + id);
    }
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

              {favourites.includes(book.id) ? (
                <IoIosHeart onClick={() => addFav(book, book.id)} />
              ) : (
                <IoIosHeartEmpty onClick={() => addFav(book, book.id)} />
              )}
            </div>
          );
        })
      )}
      <div>
        {pagination === 0 ? null : (
          <span onClick={prevButton}>Prev {pagination}</span>
        )}
        <p>{pagination + 1}</p>
        {pagination >= books.length ? null : (
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
