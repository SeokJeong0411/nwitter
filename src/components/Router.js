import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

const AppRouter = ({ isLoggedIn, refreshUser, user }) => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      {isLoggedIn && <Navigation user={user} />}
      <div
        style={{
          maxWidth: 890,
          width: "100%",
          margin: "0 auto",
          marginTop: 80,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Routes>
          {isLoggedIn ? (
            <>
              <Route exact path="/" element={<Home />}></Route>
              <Route
                exact
                path="/profile"
                element={<Profile user={user} refreshUser={refreshUser} />}
              ></Route>
              <Route path="*" element={<Navigate replace to="/" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Auth />}></Route>
              <Route path="*" element={<Navigate replace to="/" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
