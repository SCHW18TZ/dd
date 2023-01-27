import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import GoogleButton from "react-google-button";
import { auth, provider } from "../firebase";
import { signInWithPopup,createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import {useNavigate} from 'react-router-dom'

const Login = ()=>{
  let navigate = useNavigate();
  const LogInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate('/')
  };
    const handleSubmit = async (e) => {
      e.preventDefault();
      const email = e.target[0].value;
      const password = e.target[2].value;
      const user = signInWithEmailAndPassword(auth, email, password)
      console.log(user);
      navigate('/')
    }

    return(
        <div  className="Register">
      <form onSubmit={handleSubmit} className="RegisterForm">
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
    )
}

export default Login