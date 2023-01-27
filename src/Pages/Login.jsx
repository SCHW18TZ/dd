import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import GoogleButton from "react-google-button";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const Register = () => {
  const LogInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
  };

  const [user] = useAuthState(auth);
  return (
    <div className="Register">
      <form className="RegisterForm">
        <div className="inputContainer">
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
          <div className="buttonContainer">
            <Button type="submit" variant="contained" className="SignInButton">
              Sign In
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
