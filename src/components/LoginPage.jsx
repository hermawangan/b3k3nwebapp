import React from "react";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="flex justify-center  mt-10 items-center h-full flex-col lg:flex-row lg:justify-around lg:h-[70vh]">
      <div className="  h-full text-base flex justify-center flex-col items-center w-11/12 text-center lg:w-7/12">
        <p className="mt-10 font-semibold text-lg md:text-2xl md:mt-16">
          This is only Web App that you can read all the famous book written by
          famous writer
        </p>

        <button className="border-2 border-blue-500 rounded-lg w-1/2 my-10 h-12 md:text-lg  lg:hover:text-white lg:hover:bg-blue-500">
          <Link to="home">Get Started</Link>
        </button>
      </div>
      <img
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.kvvKJvDHPl91wdE6OgcApQHaE8%26pid%3DApi&f=1"
        alt="books"
        className="h-full mt-5 rounded-lg w-11/12 lg:w-1/3 lg:mt-0"
      />
    </div>
  );
}

export default LoginPage;
