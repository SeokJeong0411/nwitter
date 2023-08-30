import { authService } from "fbase";
import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

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

  const onSubmit = async (event) => {
    event.preventDefault(); // default submit 방지
    try {
      let data;
      const auth = authService.getAuth();
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          onChange={onChange}
          type="text"
          placeholder="Email"
          required
          value={email}
        />
        <input
          name="password"
          onChange={onChange}
          type="password"
          placeholder="Password"
          required
          value={password}
        />
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Log In" : "Create Account"}
      </span>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};
export default Auth;
