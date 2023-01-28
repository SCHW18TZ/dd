import React from 'react'
import { auth, provider } from "../firebase";
import {useNavigate} from 'react-router-dom'
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from 'react';
import {getAuth,sendPasswordResetEmail } from 'firebase/auth'
const ForgetPassword = () => {

    const [email, setemail] = useState('')

    sendPasswordResetEmail(auth, email)
  .then(() => {
    console.log('sent');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });


  return (
    <form >
        <h1>Reset Password</h1>
        <input type="email" onChange={(e)=>{setemail(e.target.value)}}  />
        <button type="submit">Reset Password</button>
    </form>
  )
}

export default ForgetPassword