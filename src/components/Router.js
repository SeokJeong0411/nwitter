import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route exact path="/" element={<Home />}></Route>
          </>
        ) : (
          <Route path="/" element={<Auth />}></Route>
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
