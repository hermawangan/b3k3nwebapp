import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { fetchBooks } from "../redux";
import { IoIosHeart, IoIosHeartEmpty, IoIosArrowBack } from "react-icons/io";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";

let pageSize = 10;

function BooksComponent({ books, loading, fetchBooks, id, errorMsg }) {
  const [currentPage, setcurrentPage] = useState(1);
  const [favourites, setFavourites] = useState([]);
  const navigate = useNavigate();
  const getArray = JSON.parse(localStorage.getItem("favorites") || "0");

  useEffect(() => {
    fetchBooks(id);

    if (getArray !== 0) {
      setFavourites([...getArray]);
    }
  }, []);

  const currentBooksData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    const currentBooks = loading
      ? []
      : books.slice(firstPageIndex, lastPageIndex);

    return currentBooks;
  }, [currentPage, loading]);

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

  const clickHandler = () => {
    navigate(-1);
  };

  return (
    <div className="flex items-center flex-col">
      {loading ? (
        <p>please wait</p>
      ) : errorMsg !== "" ? (
        <div>
          <p onClick={clickHandler}>
            {" "}
            <IoIosArrowBack /> Go back{" "}
          </p>
          <p>{errorMsg}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-7 m-5 place-items-center md:place-content-center md:place-items-start  md:grid-cols-2 lg:grid-cols-3 w-11/12">
          {currentBooksData.map((book) => {
            return (
              <div
                key={book.id}
                className="border-[1px] border-gray-300 shadow-md rounded-md "
              >
                <img
                  src={book.cover_url}
                  alt="book cover"
                  className="w-full rounded-md h-80"
                />
                <div className="p-5">
                  <p className="text-xl font-bold">{book.title}</p>
                  <p className="text-lg font-semibold">{book.authors[0]}</p>
                  <p className="pt-5">{book.description}</p>
                  <div className="flex justify-between items-center pt-5">
                    <p>Sections: {book.sections.length}</p>

                    {favourites.includes(book.id) ? (
                      <IoIosHeart
                        onClick={() => addFav(book, book.id)}
                        className="text-red-700 cursor-pointer text-xl"
                      />
                    ) : (
                      <IoIosHeartEmpty
                        onClick={() => addFav(book, book.id)}
                        className="text-red-700 cursor-pointer text-xl"
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalCount={books.length}
        pageSize={pageSize}
        onPageChange={(page) => setcurrentPage(page)}
      />
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    books: state.books.books,
    loading: state.books.loading,
    id: state.id.id,
    errorMsg: state.books.errorMsg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBooks: (id, pagination) => dispatch(fetchBooks(id, pagination)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksComponent);
