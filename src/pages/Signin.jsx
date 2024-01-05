// Dynamic adress
import baseAPI from "../utils/api";

// Package import
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signin = ({ setIsConnected, isConnected }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [allFields, setAllFields] = useState(false);
  const [wrongFields, setWrongFields] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!email || !email.trim()) {
        return setAllFields(true);
      }

      if (!password || !password.trim()) {
        return setAllFields(true);
      }

      const response = await axios.post(`${baseAPI}/signin`, {
        email,
        password,
      });

      const token = response.data;

      Cookies.set("token_marvel", token);

      setIsConnected(true);

      navigate("/characters");
    } catch (error) {
      if (error.response.data === "Wrong email or password") {
        return setWrongFields(true);
      }
    }
  };

  const handleChangeEmail = (e) => {
    setAllFields(false);
    setWrongFields(false);
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setAllFields(false);
    setWrongFields(false);
    setPassword(e.target.value);
  };
  return (
    <section className="signin-container">
      <div className="signin-background"></div>
      <article className="signin">
        <img
          src="https://res.cloudinary.com/dwkwlok28/image/upload/v1703682526/marvel/marvel-logo_pgsubf.svg"
          alt="marvel en blanc sur fond rouge"
        />
        <div className="signin-logo">
          <img
            src="https://res.cloudinary.com/dwkwlok28/image/upload/v1704380261/marvel/captain-america-seeklogo.com_j7odqp.svg"
            alt="bouclier en spirale avec une étoile au milieu style captain america"
          />
          <h2>Signin</h2>
          <img
            src="https://res.cloudinary.com/dwkwlok28/image/upload/v1704380261/marvel/captain-america-seeklogo.com_j7odqp.svg"
            alt="bouclier en spirale avec une étoile au milieu style captain america"
          />
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="E-mail"
            name="e-mail"
            onChange={handleChangeEmail}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChangePassword}
          />
          {allFields ? (
            <p style={{ color: "red", fontWeight: "bold", fontSize: "15px" }}>
              Please fill all the fields
            </p>
          ) : (
            ""
          )}
          {wrongFields ? (
            <p style={{ color: "red", fontWeight: "bold", fontSize: "15px" }}>
              Wrong email or password
            </p>
          ) : (
            ""
          )}
          <button type="submit">Signin !</button>
        </form>
        <Link to={"/signup"}>
          <p>Still don't have an account ? Signup here !</p>
        </Link>
      </article>
    </section>
  );
};

export default Signin;
