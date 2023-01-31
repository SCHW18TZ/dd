import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";

const UserPage = ({ userData }) => {
  const [user] = useAuthState(auth);

  return (
    <div className="UserPage">
      <div className="avatar">
      <Avatar src={userData.profilePhoto} />
      </div>
      <h1>{userData.name}</h1>
      <h6>{userData.email}</h6>
      {user?.uid == userData.uid && <Link to="/myaccount">Edit</Link>}
    </div>
  );
};

export default UserPage;
