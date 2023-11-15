import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to={"/"}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg"
          alt="Marvel écrit en blanc sur font rouge"
          className="logo-marvel"
        />
      </Link>

      <ul>
        <Link to={"/characters"}>
          <li>Personnages</li>
        </Link>
        <li>Comics</li>
        <li>Favoris</li>
      </ul>
    </header>
  );
};

export default Header;
