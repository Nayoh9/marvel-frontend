// Package import
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="home">
      <div className="home-buttons">
        <Link to="/characters">
          <button>Personnages</button>
        </Link>
        <Link to="/comics">
          <button>Comics</button>
        </Link>
        <Link to="/favorites">
          <button>Favoris</button>
        </Link>
      </div>
    </section>
  );
};

export default Home;
