// React Util
import React from "react";
import { Link } from "react-router-dom";

// Images
import Default from "../assets/images/branding/default.png";

// Icons
import { BsPlus } from "react-icons/bs";

const Header = () => {
  return (
    <div className="fixed h-[calc(header-1)] bg-background text-text w-full flex items-center justify-between pl-5 pr-10 font-poppins z-[50] border-b border-black/10">
      <Link to="/">
        <img
          src={Default}
          className="h-header w-[275px] object-cover"
          alt="Logo"
        />
      </Link>
      <nav className="flex items-center">
        <Link
          className="flex items-center gap-1 bg-blue-1/60 hover:bg-blue-1/50 px-3 py-1.5 font-inter rounded bg-accent hover:bg-accent/90 text-white"
          to="/login"
        >
          <BsPlus size={20} />
          Sign Up
        </Link>
      </nav>
    </div>
  );
};

export default Header;
