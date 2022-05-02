import React, { useEffect, useState } from "react";
import { fetchCategory, getId } from "../redux";
import { connect } from "react-redux";
import SearchBooks from "./SearchBooks";
import { useNavigate } from "react-router-dom";

function Home({ categories, loadingCat, fetchCategories, id, getId }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const idHandler = (e) => {
    getId(e.target.id);
    navigate("/books");
  };

  return (
    <div className="border-2 border-red-700 flex flex-col mt-10 h-[80vh] items-center">
      <div className="border-2 border-green-800 w-11/12 py-10 md:w-3/4 md:mt-20 lg:w-1/2">
        <input
          type="text"
          placeholder="Search books title and author"
          value={search}
          onChange={onChangeHandler}
          className="relative border-2 border-blue-600 w-full rounded-sm md:h-12 md:text-xl"
        />
        {search !== "" ? <SearchBooks search={search} /> : null}
      </div>

      {loadingCat ? (
        <p>Loading, please Wait</p>
      ) : (
        <>
          <h3 className="text-base mt-5  font-bold md:text-lg md:mt-10">
            You can start by choosing one of these category
          </h3>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {categories.map((category) => {
              return (
                <div key={category.id}>
                  <p
                    id={category.id}
                    onClick={idHandler}
                    className="cursor-pointer text-center border-2 border-blue-500 font-semibold rounded-md md:text-lg lg:hover:text-white lg:hover:bg-blue-500"
                  >
                    {category.name}
                  </p>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories.categories,
    loadingCat: state.categories.loading,
    id: state.id.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategories: () => dispatch(fetchCategory()),
    getId: (id) => dispatch(getId(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
