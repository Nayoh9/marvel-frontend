// Package import
import { Link } from "react-router-dom";

const Home = ({ isConnected, setIsConnected }) => {
  return (
    <section className="home">
      <div className="background"></div>
      <article className="home-content">
        <div className="home-title">
          <p>WELCOME TO</p>
          <img
            src="https://res.cloudinary.com/dwkwlok28/image/upload/v1703682526/marvel/marvel-logo_pgsubf.svg"
            alt="Marvel en blanc écrit sur fond rouge"
          />
          <p className="universe">UNIVERSE</p>
        </div>
        <div className="home-buttons">
          <Link to={isConnected ? "/characters" : "/signin"}>
            <p>SIGN IN</p>
          </Link>
          <Link to={isConnected ? "/characters" : "/signup"}>
            <p>SIGN UP</p>
          </Link>
        </div>
      </article>
    </section>
  );
};

export default Home;
