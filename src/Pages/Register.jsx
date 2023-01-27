import React from "react";
import TextField from "@mui/material/TextField";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth } from '../firebase'
import { useAuthState } from "react-firebase-hooks/auth";
import Button from "@mui/material/Button";

import { useState } from "react";

const Login = () => {
    
    const [user] = useAuthState(auth)

    const handleSubmit = async (event)=>{
        event.preventDefault()
        const email = event.target[0].value;
        const password = event.target[2].value
        const result = await createUserWithEmailAndPassword(auth,email,password)
    
    }   

  return (
    <div className="register" >
      <form onSubmit={handleSubmit} className="Login-Form">
      
        <TextField  required id="outlined-basic" label="Enter  Your Email" variant="outlined" />
                
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <Button type="submit" variant="contained">
            Register
          </Button>
      </form>
      <h1>{user?.email}</h1>
    </div>
  );
};

export default Login;
