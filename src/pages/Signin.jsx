// Dynamic adress
import baseAPI from "../utils/api";

// Component import
import Footer from "../components/Footer";

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
      <article className="signin">
        <h1>Signin</h1>
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
      <Footer />
    </section>
  );
};

export default Signin;
