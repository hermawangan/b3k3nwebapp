import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

function SearchBooks({ search }) {
  const [books, setBooks] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("fee-assessment-books/?categoryId=1")
      .then((response) => {
        const data = response.data;
        setBooks(data);
        setLoading(false);
        setErrMsg("");
      })
      .catch((error) => {
        const errorMsg = error.message;
        setBooks([]);
        setErrMsg(errorMsg);
        setLoading(false);
      });
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
      {loading ? (
        <div className="flex items-center">
          <FaSpinner className="animate-spin" />
          <p className="text-xl font-semibold pl-5">Searching...</p>
        </div>
      ) : errMsg !== "" ? (
        <div className="text-center text-xl">
          <p>{errMsg}</p>
          <p>Please Reload the page</p>
        </div>
      ) : (
        <ul>
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
      )}
    </div>
  );
}

export default SearchBooks;
