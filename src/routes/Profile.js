import React from "react";
import { authService } from "fbase";
import { useNavigate } from "react-router-dom";

const Profile = ({ auth }) => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut(auth);
    navigate("/");
  };

  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
export default Profile;
