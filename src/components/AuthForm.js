import React, { useState } from "react";
import { authService } from "fbase";

const AuthForm = () => {
  // default parameter
  const auth = authService.getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  // apply the ID(email)/PW on state
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };

  // submit Auth
  const onSubmit = async (event) => {
    event.preventDefault(); // prevent default submit function
    try {
      if (newAccount) {
        // if new user then create Auth
        await authService.createUserWithEmailAndPassword(auth, email, password);
      } else {
        // if U have ID/PW then login
        await authService.signInWithEmailAndPassword(auth, email, password);
      }
    } catch (errorObj) {
      setError(errorObj.message);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input
          name="email"
          onChange={onChange}
          type="text"
          placeholder="Email"
          required
          value={email}
          className="authInput"
        />
        <input
          name="password"
          onChange={onChange}
          type="password"
          placeholder="Password"
          required
          value={password}
          className="authInput"
        />
        <input
          type="submit"
          className="authInput authSubmit"
          value={newAccount ? "Create Account" : "Log In"}
        />
        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={toggleAccount} className="authSwitch">
        {newAccount ? "Log In" : "Create Account"}
      </span>
    </>
  );
};

export default AuthForm;
