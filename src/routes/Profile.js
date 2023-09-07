import React, { useEffect } from "react";
import { authService, dbService } from "fbase";
import { useNavigate } from "react-router-dom";

const Profile = ({ auth }) => {
  const navigate = useNavigate();
  const db = dbService.getFirestore();

  const onLogOutClick = () => {
    authService.signOut(auth);
    navigate("/");
  };
  const getMyNweets = async () => {
    const q = dbService.query(
      dbService.collection(db, "nweets"),
      dbService.where("creatorId", "==", auth.currentUser.uid)
    );
    const querySnapshot = await dbService.getDocs(q);

    querySnapshot.forEach((doc) => {
      const nweetObject = {
        ...doc.data(),
        id: doc.id,
      };
      console.log(nweetObject);
      // setNweets((prev) => [nweetObject, ...prev]);
    });
  };

  useEffect(() => {
    getMyNweets();
  }, []);

  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
export default Profile;
