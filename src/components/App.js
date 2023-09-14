import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  // default parameter
  const auth = authService.getAuth();
  const [user, setUser] = useState(null);
  const [init, setInit] = useState(false);

  // when auth state change then update current user
  useEffect(() => {
    authService.onAuthStateChanged(auth, () => {
      setUser(
        auth.currentUser
          ? {
              uid: auth.currentUser.uid,
              displayName: auth.currentUser.displayName,
              photoURL: auth.currentUser.photoURL,
            }
          : null
      );
      setInit(true);
    });
  }, []);

  // update user name
  const refreshUser = (args) => {
    authService.updateProfile(auth.currentUser, args);
    setUser({
      uid: auth.currentUser.uid,
      displayName: args.displayName,
      photoURL: auth.currentUser.photoURL,
    });
  };

  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(user)}
          user={user}
        />
      ) : (
        "Initializing..."
      )}
      <footer
        style={{
          maxWidth: 890,
          width: "100%",
          margin: "0 auto",
          marginTop: 80,
          display: "flex",
          justifyContent: "center",
        }}
      >
        &copy; {new Date().getFullYear()} Nwitter
      </footer>
    </>
  );
}

export default App;
