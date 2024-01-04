// Dynamic adress
import baseAPI from "../utils/api";

// Package import
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = ({ isConnected, setIsConnected }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const [allFields, setAllFields] = useState(false);
  const [samePasswords, setSamePasswords] = useState(false);
  const [emailAlreadyExist, setEmailAlreadyExist] = useState(false);
  const [passwordLength, setPasswordLength] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!username || !username.trim()) {
        return setAllFields(true);
      }
      if (!email || !email.trim()) {
        return setAllFields(true);
      }
      if (!password || !password.trim()) {
        return setAllFields(true);
      }
      if (!confirmPassword || !confirmPassword.trim()) {
        return setAllFields(true);
      }
      if (password !== confirmPassword) {
        return setSamePasswords(true);
      }

      if (password && password.length < 6) {
        return setPasswordLength(true);
      }

      const response = await axios.post(`${baseAPI}/signup`, {
        username,
        email,
        password,
        confirmPassword,
      });

      console.log(response.data);

      const token = response.data.token;

      Cookies.set("token_marvel", token);

      setIsConnected(true);

      navigate("/characters");

      // console.log(token);
    } catch (error) {
      console.log(error);
      if (error.response.data === "This email address is already in use") {
        return setEmailAlreadyExist(true);
      }
    }
  };

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
    setAllFields(false);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    setAllFields(false);
    setEmailAlreadyExist(false);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    setAllFields(false);
    setSamePasswords(false);
    setPasswordLength(false);
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setAllFields(false);
    setSamePasswords(false);
    setPasswordLength(false);
  };

  return (
    <section className="signup-container">
      <article className="signup">
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChangeUsername}
          />

          <input
            type="email"
            placeholder="E-mail"
            name="e-mail"
            onChange={handleChangeEmail}
          />

          <input
            type="password"
            placeholder="Create password"
            name="password"
            onChange={handleChangePassword}
          />

          <input
            type="password"
            placeholder="Confirm password"
            name="confirm-password"
            onChange={handleChangeConfirmPassword}
          />

          {allFields ? (
            <p style={{ color: "red", fontWeight: "bold", fontSize: "15px" }}>
              Please fill all the fields
            </p>
          ) : (
            ""
          )}
          {samePasswords ? (
            <p style={{ color: "red", fontWeight: "bold", fontSize: "15px" }}>
              Passwords must be the same
            </p>
          ) : (
            ""
          )}

          {emailAlreadyExist ? (
            <p style={{ color: "red", fontWeight: "bold", fontSize: "15px" }}>
              This email address is already in use
            </p>
          ) : (
            ""
          )}

          {passwordLength ? (
            <p style={{ color: "red", fontWeight: "bold", fontSize: "15px" }}>
              Password must be at least 6 characters
            </p>
          ) : (
            ""
          )}

          <button type="submit">Signup !</button>
        </form>
        <Link to={"/signin"}>
          <p>Already have an account ? Signin here !</p>
        </Link>
      </article>
    </section>
  );
};

export default Signup;
