import React, { useEffect, useState } from "react";
import { fetchCategory } from "../redux";
import { connect } from "react-redux";
import SearchBooks from "./SearchBooks";

function Home({ categories, loadingCat, fetchCategories }) {
  const [search, setSearch] = useState("");
  const [id, setId] = useState();

  useEffect(() => {
    fetchCategories();
  }, []);
  const idHandler = (e) => {
    setId(e.target.id);
  };
  console.log(id);
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search books title and author"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <SearchBooks search={search} />
      </div>

      {loadingCat ? (
        <p>Loading, please Wait</p>
      ) : (
        <div>
          {categories.map((category) => {
            return (
              <div key={category.id}>
                <p id={category.id} onClick={idHandler}>
                  {category.name}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories.categories,
    loadingCat: state.categories.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategories: () => dispatch(fetchCategory()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
