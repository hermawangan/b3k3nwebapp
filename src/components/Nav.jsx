import React from "react";
import { Outlet } from "react-router-dom";
import { IoMdBookmark } from "react-icons/io";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <>
      <nav>
        <span>B3K3N</span>
        <Link to="bookmark">
          <IoMdBookmark />
        </Link>
      </nav>
      <Outlet />
    </>
  );
}

export default Nav;
