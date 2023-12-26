// Package import
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Component import
import Navbar from "./Navbar";
import { faL } from "@fortawesome/free-solid-svg-icons";

const Header = ({ setIsConnected, isConnected }) => {
  const [isHamburgerClicked, setIsHamburgerClicked] = useState(false);

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

      <Navbar
        isConnected={isConnected}
        setIsConnected={setIsConnected}
        isHamburgerClicked={isHamburgerClicked}
        setIsHamburgerClicked={setIsHamburgerClicked}
      />

      <FontAwesomeIcon
        icon="fa-solid fa-bars"
        className="hamburger-menu"
        style={{ color: "#ffffff" }}
        onClick={() => {
          if (!isHamburgerClicked) {
            setIsHamburgerClicked(true);
          } else {
            setIsHamburgerClicked(false);
          }
        }}
      />
    </header>
  );
};

export default Header;
