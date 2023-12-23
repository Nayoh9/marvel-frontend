// Package import
import { Link } from "react-router-dom";

const Home = ({ isConnected, setIsConnected }) => {
  return (
    <section className="home">
      <div className="home-buttons">
        <Link to="/signin">
          <button>Sign in</button>
        </Link>
        <Link to="/signup">
          <button>Sign up</button>
        </Link>
        {/* <Link to={isConnected ? "/favorites" : "/signin"}>
          <button>Favorites</button>
        </Link> */}
      </div>
    </section>
  );
};

export default Home;
