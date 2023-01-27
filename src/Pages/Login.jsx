import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import GoogleButton from "react-google-button";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import {useAuthState} from 'react-firebase-hooks/auth'

const Register = () => {
  const LogInWithGoogle = async ()=>{
    const result = await signInWithPopup(auth,provider)
    console.log(result);
  }

  const [user] = useAuthState(auth)
  return (
    <div className="Register">
      <form>
        <div className="RegisterForm">
          <TextField
            required
            id="outlined-basic"
            type="email"
            label="Email"
            variant="outlined"
          />

          <TextField
            required
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
          />

          <Button type="submit" variant="contained">
            Sign In
          </Button>

          <p>Or you can sign in with Google</p>
        </div>
      </form>
      <GoogleButton onClick={LogInWithGoogle}/>
    </div>
  );
};

export default Register;
