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
        <li>Characters</li>
      </Link>

      <Link
        to={"/comics"}
        onClick={() => {
          setIsHamburgerClicked(false);
          enableScroll();
        }}
      >
        <li>Comics</li>
      </Link>

      <Link
        to={isConnected ? "/favorites" : "/signin"}
        onClick={() => {
          setIsHamburgerClicked(false);
          enableScroll();
        }}
      >
        <li>Favorites</li>
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
          Sign out
        </Link>
      ) : (
        ""
      )}
    </ul>
  );
};

export default Navbar;
