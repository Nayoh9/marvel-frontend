// Package import
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Component import
import Navbar from "./Navbar";

const Header = ({ setIsConnected, isConnected }) => {
  useEffect(() => {
    if (Cookies.get("token_marvel")) {
      setIsConnected(true);
    }
  }, [isConnected]);

  return (
    <header>
      <Link to={"/"}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg"
          alt="Marvel écrit en blanc sur font rouge"
          className="logo-marvel"
        />
      </Link>

      <Navbar isConnected={isConnected} setIsConnected={setIsConnected} />
    </header>
  );
};

export default Header;
