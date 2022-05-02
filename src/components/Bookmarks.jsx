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
        <div className="grid grid-cols-1 gap-7 m-5 place-items-center md:place-content-center md:place-items-start  md:grid-cols-2 lg:grid-cols-3 w-11/12">
          {favBooks.map((favBook) => {
            return (
              <div
                key={favBook.id}
                className="border-[1px] border-gray-300 shadow-md rounded-md"
              >
                <img
                  src={favBook.cover_url}
                  alt="cover book"
                  className="w-full rounded-md h-80"
                />
                <div className="p-5">
                  <p className="text-xl font-bold">{favBook.title}</p>
                  <p className="text-lg font-semibold">{favBook.authors[0]}</p>
                  <p className="pt-5">{favBook.description}</p>
                  <div className="flex justify-between items-center pt-5">
                    <p>Sections: {favBook.sections.length}</p>
                    <IoMdTrash
                      id={favBook.id}
                      onClick={clickHandler}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
// localStorage.clear();
export default Bookmarks;
