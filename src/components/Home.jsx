import React, { useEffect, useState } from "react";
import { fetchCategory, getId } from "../redux";
import { connect } from "react-redux";
import SearchBooks from "./SearchBooks";
import { useNavigate } from "react-router-dom";

function Home({ categories, loadingCat, fetchCategories, id, getId }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const idHandler = (e) => {
    getId(e.target.id);
    navigate("/books");
  };

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
