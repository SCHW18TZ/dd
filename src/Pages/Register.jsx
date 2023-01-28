import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import GoogleButton from "react-google-button";
import { auth, provider, storage } from "../firebase";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Register = () => {
  let navigate = useNavigate();
  const [name, setname] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const LogInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[2].value;
    const password = e.target[4].value;
    const result = await createUserWithEmailAndPassword(auth, email, password);
    updateProfile(result.user, {
      displayName: name,
    });
    if (selectedImage == null) return;
    const ImageRef = ref(storage, `ProfilePics/${selectedImage.name + v4()}`);
    uploadBytes(ImageRef, selectedImage).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        updateProfile(result.user, {
          photoURL: url,
        });
      });
    });
    navigate("/");
  };

  const [user] = useAuthState(auth);
  return (
    <div className="Register">
      <form onSubmit={handleSubmit} className="RegisterForm">
        <div className="inputContainer">
          <div className="input">
            <TextField
              required
              id="outlined-basic"
              type="text"
              label="Name"
              variant="outlined"
              onChange={(e) => setname(e.target.value)}
            />
          </div>
          <div className="input">
            <TextField
              required
              id="outlined-basic"
              type="email"
              label="Email"
              variant="outlined"
            />
          </div>
          <div className="input">
            <TextField
              required
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
          </div>
          <div className="input">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedImage(e.target.files[0])}
            />
          </div>
          <div className="buttonContainer">
            <Button type="submit" variant="contained" className="SignInButton">
              Register
            </Button>
          </div>
        </div>
      </form>
      <div className="GoogleContainer">
        <p>Or you can sign in with Google</p>
        <GoogleButton onClick={LogInWithGoogle} />
      </div>
    </div>
  );
};

export default Register;
