import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import GoogleButton from "react-google-button";
import { auth, provider } from "../firebase";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const Login = () => {
  const [showpassword, setshowpassword] = useState(false);
  let navigate = useNavigate();
  const LogInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    addDoc(userCollectionRef, {
      name: result.user.displayName,
      email: result.user.email,
      profilePhoto: result.user.photoURL,
      uid: result.user.uid,
    });
    navigate("/");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[2].value;
    const user = await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/");
        // ...
      })
      .catch((error) => {
        toast.error("Invalid email or password");
      });
  };

  const showPassword = () => {
    {
      showpassword ? setshowpassword(false) : setshowpassword(true);
    }
  };

  return (
    <div className="Register">
      <Toaster />
      <form onSubmit={handleSubmit} className="RegisterForm">
        <div className="inputContainer">
          <h1>Login</h1>
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
              type={`${showpassword ? "text" : "password"}`}
              autoComplete="current-password"
            />
            <Button variant="contained" onClick={showPassword}>
              {showpassword ? "Hide" : "Show"}
            </Button>
          </div>
          <div className="buttonContainer">
            <Button type="submit" variant="contained" className="SignInButton">
              Sign In
            </Button>
          </div>
        </div>
        <p>
          Forgot password? <Link to="/reset">Click here</Link>
        </p>
      </form>
      <div className="GoogleContainer">
        <p>Or you can sign in with Google</p>
        <GoogleButton onClick={LogInWithGoogle} />
      </div>
    </div>
  );
};

export default Login;
