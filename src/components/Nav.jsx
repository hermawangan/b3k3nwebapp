import React from "react";
import { Outlet } from "react-router-dom";
import { IoMdBookmark } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";

function Nav() {
  const location = useLocation();
  const pattern = new RegExp("[home||books]");

  return (
    <>
      <nav
        className={`${
          pattern.test(location.pathname)
            ? " justify-between "
            : "justify-center"
        } flex items-center  m-7 md:mx-10 lg:mx-24 `}
      >
        <Link to="/">
          <span className="font-bold text-3xl lg:text-4xl">B3K3N</span>
        </Link>
        {pattern.test(location.pathname) ? (
          <div className=" flex items-center text-lg md:text-xl">
            <Link to="home">
              <p className="pr-5 md:pr-10 lg:pr-16">Home</p>
            </Link>
            <Link to="bookmark">
              <IoMdBookmark />
            </Link>
          </div>
        ) : null}
      </nav>
      <Outlet />
    </>
  );
}

export default Nav;
