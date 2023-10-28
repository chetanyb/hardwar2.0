import React from "react";
import logo from "../sita_logo.png";

function Header() {
  return (
    <nav className="w-screen flex justify-between items-center py-4 mx-auto bg-brand_brown">
      <div className="flex flex-row justify-start items-center md:flex-[0.5] flex-initial">
        <img
          className="w-8 ml-8 cursor-pointer rounded-lg"
          src={logo}
          alt="logo"
        />
        <span className="text-2xl font-bold text-gray-800">SITA</span>
      </div>
      {
        <ul className="md:flex md:flex-[0.5] text-black hidden list-none flex-row justify-between items-center flex-initial">
          <li className="mx-4 cursor-pointer">Home</li>
          <li className="mx-4 cursor-pointer">About</li>
          <li className="mx-4 cursor-pointer">Contact</li>
          <li className="mx-4 cursor-pointer">Login</li>
          <li className="mx-4 cursor-pointer">Register</li>
        </ul>
      }
    </nav>
  );
}

export default Header;
