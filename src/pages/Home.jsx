// Package import
import { Link } from "react-router-dom";

const Home = ({ isConnected, setIsConnected }) => {
  return (
    <section className="home">
      <div className="home-buttons">
        <Link to="/characters">
          <button>Personnages</button>
        </Link>
        <Link to="/comics">
          <button>Comics</button>
        </Link>
        <Link to={isConnected ? "/favorites" : "/signin"}>
          <button>Favoris</button>
        </Link>
      </div>
    </section>
  );
};

export default Home;
