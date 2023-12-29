//Package import
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

//Utils functions
import { disableScroll, enableScroll } from "../utils/scroll";

const Navbar = ({
  isConnected,
  setIsConnected,
  isHamburgerClicked,
  setIsHamburgerClicked,
}) => {
  return (
    <ul className={isHamburgerClicked ? "navbar mobile-menu" : "navbar"}>
      <Link
        to={"/characters"}
        onClick={() => {
          setIsHamburgerClicked(false);
          enableScroll();
        }}
      >
        <li>CHARACTERS</li>
      </Link>

      <Link
        to={"/comics"}
        onClick={() => {
          setIsHamburgerClicked(false);
          enableScroll();
        }}
      >
        <li>COMICS</li>
      </Link>

      <Link
        to={isConnected ? "/favorites" : "/signin"}
        onClick={() => {
          setIsHamburgerClicked(false);
          enableScroll();
        }}
      >
        <li>FAVORITES</li>
      </Link>

      {isConnected ? (
        <Link
          to={"/"}
          onClick={() => {
            Cookies.remove("token_marvel");
            setIsConnected(false);
            setIsHamburgerClicked(false);
            enableScroll();
          }}
        >
          SIGNOUT
        </Link>
      ) : (
        ""
      )}
    </ul>
  );
};

export default Navbar;
