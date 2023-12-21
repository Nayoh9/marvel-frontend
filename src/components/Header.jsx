// Package import
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ setIsConnected, isConnected }) => {
  useEffect(() => {
    if (Cookies.get("token_marvel")) {
      setIsConnected(true);
    }
  }, [isConnected]);

  return (
    <header id="header">
      <Link to={"/"}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg"
          alt="Marvel écrit en blanc sur font rouge"
          className="logo-marvel"
        />
      </Link>

      <ul>
        <Link to={"/characters"}>
          <li>Characters</li>
        </Link>

        <Link to={"/comics"}>
          <li>Comics</li>
        </Link>

        <Link to={isConnected ? "/favorites" : "/signin"}>
          <li>Favorites</li>
        </Link>

        {isConnected ? (
          <Link
            to={"/"}
            onClick={() => {
              Cookies.remove("token_marvel");
              setIsConnected(false);
            }}
          >
            Sign out
          </Link>
        ) : (
          ""
        )}
      </ul>
    </header>
  );
};

export default Header;
