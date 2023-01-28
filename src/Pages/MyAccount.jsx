import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { getDownloadURL } from "firebase/storage";

const MyAccount = () => {
  const [user] = useAuthState(auth);
  const [editName, seteditemail] = useState(true);
  const [editemail, seteditpassword] = useState(true);

  const editNameToogle = () => {
    editName ? seteditemail(false) : seteditemail(true);
  };
  const editEmailToogle = () => {
    editemail ? seteditpassword(false) : seteditpassword(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    console.log(name, email);
  };

  return (
    <div className="My-Account">
      <form onSubmit={handleSubmit}>
        <div className="dvs">
          <Avatar src={user?.photoURL} />
        </div>
        <div className="dvs">
          <TextField
            required
            id="outlined-required"
            label="Name"
            defaultValue={user?.displayName}
            disabled={editName}
          />
          <Button variant="contained" onClick={editNameToogle}>
            {editName ? "Edit" : "Save"}
          </Button>
        </div>
        <div className="dvs">
          <TextField
            required
            id="outlined-required"
            label="Email"
            defaultValue={user?.email}
            disabled={editemail}
          />
          <Button variant="contained" onClick={editEmailToogle}>
            {editemail ? "Edit" : "Save"}
          </Button>
        </div>
        <div className="dvs">
          <Link to="/reset">Change Password</Link>
        </div>
        <div className="dvs">
          <Button type="submit" variant="contained">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MyAccount;
