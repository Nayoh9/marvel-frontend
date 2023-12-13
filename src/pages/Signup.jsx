// Package import
import axios from "axios";
import { useState } from "react";

const Signup = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [allFields, setAllFields] = useState(false);
  const [samePasswords, setSamePasswords] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!username || !username.trim()) {
        return setAllFields(true);
      }

      if (!password || password.trim())
        if (password !== confirmPassword) {
          return setSamePasswords(true);
        }

      let count = 0;
      for (let i = 0; i < email.length; i++) {
        if (email[i] === "@") {
          count++;
        }
      }

      if (!email || !email.trim() || count !== 1) {
        return setAllFields(true);
      }

      const response = await axios.post("http://localhost:3000/signup", {
        username,
        email,
        password,
        confirmPassword,
      });

      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
    setAllFields(false);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    setAllFields(false);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    setAllFields(false);
    setSamePasswords(false);
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setAllFields(false);
    setSamePasswords(false);
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
            <p style={{ color: "red" }}>Please fill all the fields</p>
          ) : (
            ""
          )}
          {samePasswords ? (
            <p style={{ color: "red" }}>Passwords must be the same</p>
          ) : (
            ""
          )}

          <button type="submit">Signup !</button>
        </form>
      </article>
    </section>
  );
};

export default Signup;
