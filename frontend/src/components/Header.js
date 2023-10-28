import React from "react";
import logo from "../sita_logo.png";

function Header() {
  return (
    <nav className="w-screen grid grid-cols-2 items-center py-2 mx-auto bg-brand_maroon">
      <div className="flex items-center ml-8">
        <img
          className="w-12 cursor-pointer rounded-lg mb-1"
          src={logo}
          alt="logo"
        />
        <span className="text-2xl heading text-brand_orange ml-4 mt-1">
          SITA
        </span>
      </div>
      <ul className="flex justify-end mr-8 space-x-8 text-xl body text-brand_orange">
        <li className="cursor-pointer justify-evenly">DashBoard</li>
        <li className="cursor-pointer justify-evenly">Sustainability</li>
        <li className="cursor-pointer justify-evenly">Sign Up</li>
      </ul>
    </nav>
  );
}

export default Header;
