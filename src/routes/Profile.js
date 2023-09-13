import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase";
import { useNavigate } from "react-router-dom";

const Profile = ({ refreshUser, user }) => {
  // default parameter
  const auth = authService.getAuth();
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(user.displayName);
  const db = dbService.getFirestore();

  // logout
  const onLogOutClick = async () => {
    await authService.signOut(auth);
    navigate("/");
  };

  // function : get Nweets (only mine)
  const getMyNweets = async () => {
    const q = dbService.query(
      dbService.collection(db, "nweets"),
      dbService.where("creatorId", "==", user.uid),
      dbService.orderBy("createdAt", "desc")
    );
    const querySnapshot = await dbService.getDocs(q);

    querySnapshot.forEach((doc) => {
      const nweetObject = {
        ...doc.data(),
        id: doc.id,
      };
      // setNweets((prev) => [nweetObject, ...prev]);
    });
  };

  // apply new user name on state
  const onChnage = (event) => {
    setNewDisplayName(event.target.value);
  };

  // apply user name
  const onSubmit = async (event) => {
    event.preventDefault(); // prevent default submit function

    if (user.displayName !== newDisplayName) {
      refreshUser({
        displayName: newDisplayName,
      });
    }
  };

  // get Nweets first one time
  useEffect(() => {
    getMyNweets();
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChnage}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
export default Profile;
