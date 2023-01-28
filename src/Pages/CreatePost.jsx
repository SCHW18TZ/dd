//Make a whole react page which allows a user that is logged in to make a post

import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const CreatePost = () => {
  const postCollectionRef = collection(db, "posts");

  const [user] = useAuthState(auth);
  let navigate = useNavigate();
  const createPost = async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const description = e.target[2].value;
    await addDoc(postCollectionRef, {
      title: title,
      description: description,
      author: {
        name: user.email,
        uid: user.uid,
      },
    });
    navigate("/");
  };

  return (
    <div>
      {user ? (
        user.emailVerified ? (
          <div>
          <form onSubmit={createPost} className="RegisterForm">
            <div className="inputContainer">
              <div className="input">
                <TextField
                  required
                  id="outlined-basic"
                  type="text"
                  label="Title"
                  variant="outlined"
                />
              </div>

              <div className="input">
                <TextField
                  required
                  id="outlined-password-input"
                  label="Description"
                  type="text"
                  autoComplete="current-password"
                  multiline
                  rows={4}
                  className="text-field"
                />
              </div>
              <div className="buttonContainer">
                <Button
                  type="submit"
                  variant="contained"
                  className="SignInButton"
                >
                  Make a post
                </Button>
              </div>
            </div>
          </form>
        </div>
        ) : (
          <div>
            <h1>Please verify your email in order to create A post</h1>
            <p>Please check your inbox in order to verify your email.</p>
          </div>
        )
      ) : (
        <div>
          <h1>You need to be signed In to create a Post</h1>
          <Link to="/login">Login</Link>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
