//Package import
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

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
        }}
      >
        <li>Characters</li>
      </Link>

      <Link
        to={"/comics"}
        onClick={() => {
          setIsHamburgerClicked(false);
        }}
      >
        <li>Comics</li>
      </Link>

      <Link
        to={isConnected ? "/favorites" : "/signin"}
        onClick={() => {
          setIsHamburgerClicked(false);
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
