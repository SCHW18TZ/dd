import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import GoogleButton from "react-google-button";
import { auth, provider, storage } from "../firebase";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification  
} from "firebase/auth";
import {Toaster,toast} from 'react-hot-toast'

import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate,Link } from "react-router-dom";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const Register = () => {
  let navigate = useNavigate();
  const [name, setname] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showpassword, setshowpassword] = useState(false)
  const userCollectionRef = collection(db, "users")

  const LogInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    addDoc(userCollectionRef, {
      name: result.user.displayName,
      email: result.user.email,
      profilePhoto: result.user.photoURL,
      uid: result.user.uid,
    })
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
    const emailSen = await sendEmailVerification(auth.currentUser)
    console.log(emailSen);
    if (selectedImage == null) return;
    const ImageRef = ref(storage, `ProfilePics/${selectedImage.name + v4()}`);
    uploadBytes(ImageRef, selectedImage).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        updateProfile(result.user, {
          photoURL: url,
        });
        addDoc(userCollectionRef, {
          name: result.user.displayName,
          email: result.user.email,
          profilePhoto: url,
          uid: result.user.uid,
    })
      });
    });
    navigate("/");
    toast.success("Registed successfully ")
  };

  const [user] = useAuthState(auth);
  return (
    <div className="Register">
      <Toaster/>
      <form onSubmit={handleSubmit} className="RegisterForm">

        <div className="inputContainer">
        <h1>Register</h1>
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
              type="Password"
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
        <p>Already got an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
