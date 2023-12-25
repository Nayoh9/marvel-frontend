//Package import
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Navbar = ({ isConnected, setIsConnected }) => {
  return (
    <ul>
      <Link
        to={"/characters"}
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
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
  );
};

export default Navbar;
