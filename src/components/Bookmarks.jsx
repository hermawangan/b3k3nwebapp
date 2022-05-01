import React, { useState, useEffect } from "react";
import { IoMdRadioButtonOn, IoMdTrash } from "react-icons/io";

function Bookmarks() {
  const [favBooks, setFavBooks] = useState([]);
  const getArrayFromLocalStorge = () => {
    const keys = Object.keys(localStorage).filter((key) => key !== "favorites");
    let values = [];

    keys.map((key) => {
      const getBooks = JSON.parse(localStorage.getItem(key || "0"));
      return values.push(getBooks);
    });

    setFavBooks([...values]);
  };

  const remove = (id) => {
    const getFav = JSON.parse(localStorage.getItem("favorites"));
    const filtered = getFav.filter((item) => item !== +id);
    localStorage.setItem("favorites", JSON.stringify(filtered));
  };

  useEffect(() => {
    getArrayFromLocalStorge();
  }, []);

  const clickHandler = (e) => {
    const id = e.target.parentElement.id;
    localStorage.removeItem("favBook" + id);
    getArrayFromLocalStorge();
    remove(id);
  };

  return (
    <div>
      {favBooks.length === 0 ? (
        <p>No favorite books</p>
      ) : (
        favBooks.map((favBook) => {
          return (
            <div key={favBook.id}>
              <img src={favBook.cover_url} alt="cover book" />
              <div>
                <p>{favBook.title}</p>
                <p>{favBook.authors[0]}</p>
                <p>{favBook.description}</p>
                <span>{favBook.sections.length}</span>
              </div>

              <IoMdTrash id={favBook.id} onClick={clickHandler} />
            </div>
          );
        })
      )}
    </div>
  );
}
// localStorage.clear();
export default Bookmarks;
