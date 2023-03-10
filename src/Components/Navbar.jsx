import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { signOut } from "firebase/auth";
import Button from "@mui/material/Button";
import { Toaster, toast } from "react-hot-toast";
import { db } from "../firebase";
const Navbar = () => {
  const [user] = useAuthState(auth);

  const LogUserOut = async () => {
    await signOut(auth);
    toast.success("Logged out");
  };
  return (
    <nav>
      <Toaster />
      <div className="brand">
        <Link to="/" className="link">
          Home
        </Link>
        <Link className="link" to="/search">
          Search
        </Link>
      </div>
      {user ? (
        <ul>
          <Link className="link" to={`user/${user.uid}`}>
            {user?.displayName}
          </Link>
          <Avatar src={user?.photoURL} />
          <Button
            type="submit"
            variant="contained"
            className="SignOutButton"
            onClick={LogUserOut}
          >
            Sign Out
          </Button>
          <Link className="link" to="/new">
            Create A post
          </Link>
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
