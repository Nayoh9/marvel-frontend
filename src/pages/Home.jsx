// Package import
import { Link } from "react-router-dom";

const Home = ({ isConnected, setIsConnected }) => {
  return (
    <section className="home">
      <article className="home-content">
        <div className="home-title">
          <h1>Welcome to Marvel Universe </h1>
        </div>
        <div className="home-buttons">
          <Link to={isConnected ? "/characters" : "/signin"}>
            <p>Sign in</p>
          </Link>
          <Link to={isConnected ? "/characters" : "/signup"}>
            <p>Sign up</p>
          </Link>
        </div>
      </article>
    </section>
  );
};

export default Home;
