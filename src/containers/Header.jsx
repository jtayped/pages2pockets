// React Util
import React from "react";
import { Link } from "react-router-dom";

// Images
import Logo from "../assets/images/branding/logo.png";

// Icons
import { BsPlus } from "react-icons/bs";

const Header = () => {
  return (
    <div className="fixed h-header bg-gradient-to-b from-background text-text w-full flex items-center justify-between px-10 font-poppins z-[50]">
      <Link to="/">
        <img className="h-header" src={Logo} alt="Logo" />
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
