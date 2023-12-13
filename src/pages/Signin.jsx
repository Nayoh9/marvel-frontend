// Dynamic adress
import baseAPI from "../utils/api";

// Package import
import axios from "axios";
import { useState } from "react";

const Signin = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(`${baseAPI}/signin`, {
        email,
        password,
      });

      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
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
            placeholder="Create password"
            name="password"
            onChange={handleChangePassword}
          />

          <button type="submit">Signin !</button>
        </form>
      </article>
    </section>
  );
};

export default Signin;
