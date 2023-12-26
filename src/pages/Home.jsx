// Package import
import { Link } from "react-router-dom";

const Home = ({ isConnected, setIsConnected }) => {
  return (
    <section className="home">
      <div className="home-title">
        <h1>BIENVENUE SUR MARVEL</h1>
      </div>
      <div className="home-buttons">
        <Link to="/signin">
          <p>Sign in</p>
        </Link>
        <Link to="/signup">
          <p>Sign up</p>
        </Link>
        {/* <Link to={isConnected ? "/favorites" : "/signin"}>
          <button>Favorites</button>
        </Link> */}
      </div>
    </section>
  );
};

export default Home;
