import React from "react";
import { Outlet } from "react-router-dom";

function Nav() {
  return (
    <>
      <nav>
        <span>B3K3N</span>
      </nav>
      <Outlet />
    </>
  );
}

export default Nav;
