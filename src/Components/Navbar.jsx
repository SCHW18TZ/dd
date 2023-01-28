import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const LogUserOut = async () => {
    await signOut(auth);
  };

  const [user] = useAuthState(auth);

  return (
    <nav>
      <div className="brand">
        <Link to="/" className="link">
          Home
        </Link>
      </div>
      {user ? (
        <ul>
          <h3>{user?.displayName}</h3>
          <Avatar src={user?.photoURL} />
          <button onClick={LogUserOut}>Sign out</button>
          <Link to='/new'>Create A post</Link>
        </ul>
      ) : (
        <ul>
          <Link to="/login" className="link">
            Login
          </Link>
          <Link to="/register" className="link">
            register
          </Link>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
