// Package import
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Component import
import Navbar from "./Navbar";

//Utils functions
import { disableScroll, enableScroll } from "../utils/scroll";

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
          src="src/assets/images/marvel-logo.svg"
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
      {!isHamburgerClicked ? (
        <FontAwesomeIcon
          icon="fa-solid fa-bars"
          className="hamburger-menu"
          onClick={() => {
            if (!isHamburgerClicked) {
              setIsHamburgerClicked(true);
              disableScroll();
            } else {
              setIsHamburgerClicked(false);
              enableScroll();
            }
          }}
        />
      ) : (
        <FontAwesomeIcon
          icon="fa-solid fa-xmark"
          className="hamburger-menu"
          onClick={() => {
            if (!isHamburgerClicked) {
              setIsHamburgerClicked(true);
              disableScroll();
            } else {
              setIsHamburgerClicked(false);
              enableScroll();
            }
          }}
        />
      )}
    </header>
  );
};

export default Header;
