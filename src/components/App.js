import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const auth = authService.getAuth();
  const [user, setUser] = useState(null);
  const [init, setInit] = useState(false);

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
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
