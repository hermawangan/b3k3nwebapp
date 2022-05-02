import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchBooks } from "../redux";
import {
  IoIosHeart,
  IoIosHeartEmpty,
  IoIosArrowBack,
  IoIosArrowForward,
} from "react-icons/io";
import { useNavigate } from "react-router-dom";

function BooksComponent({ books, loading, fetchBooks, id, errorMsg }) {
  const [pagination, setPagination] = useState(0);
  const [favourites, setFavourites] = useState([]);
  const navigate = useNavigate();
  const getArray = JSON.parse(localStorage.getItem("favorites") || "0");

  useEffect(() => {
    console.log(books);
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
          {books.map((book) => {
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
      {loading ? null : errorMsg !== "" ? null : (
        <div className=" flex justify-center items-center mb-5 md:text-xl lg:justify-end lg:text-2xl  w-full">
          {pagination === 0 ? null : (
            <span
              onClick={prevButton}
              className="flex items-center cursor-pointer"
            >
              {" "}
              {pagination} <IoIosArrowBack />{" "}
            </span>
          )}
          <p className="mx-10">{pagination + 1}</p>
          {pagination >= books.length ? null : (
            <span
              onClick={nextButton}
              className="flex items-center lg:mr-16 cursor-pointer"
            >
              {" "}
              <IoIosArrowForward /> {pagination + 2}
            </span>
          )}
        </div>
      )}
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
