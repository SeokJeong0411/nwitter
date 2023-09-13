import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ user }) => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">{Boolean(user) && user.displayName}'s Profile</Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
