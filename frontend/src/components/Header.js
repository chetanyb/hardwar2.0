import React, { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import logo from "../sita_logo.png";

function Header() {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");

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
        <li className="cursor-pointer justify-evenly"><a href="/dashboard">Dashboard</a></li>
        <li className="cursor-pointer justify-evenly"><a href="/sustainability">Sustainability</a></li>
        {user ? (
          <li className="cursor-pointer justify-evenly">
            Welcome, {user.username}
          </li>
        ) : (
          <li className="cursor-pointer justify-evenly">
            <a href="http://localhost:3000/">Signup</a>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Header;
