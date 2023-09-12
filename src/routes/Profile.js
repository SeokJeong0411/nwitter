import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase";
import { useNavigate } from "react-router-dom";

const Profile = ({ refreshUser, user }) => {
  const auth = authService.getAuth();
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(user.displayName);
  const db = dbService.getFirestore();

  const onLogOutClick = async () => {
    await authService.signOut(auth);
    navigate("/");
  };
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
  const onChnage = (event) => {
    setNewDisplayName(event.target.value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();

    if (user.displayName !== newDisplayName) {
      // await authService.updateProfile(auth.currentUser, {
      //   displayName: newDisplayName,
      // });
      refreshUser({
        displayName: newDisplayName,
      });
    }
  };

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
