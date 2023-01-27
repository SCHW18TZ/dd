import React from 'react'
import {auth} from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import { signOut } from 'firebase/auth';

const Navbar = () => {

    const LogUserOut = async ()=>{
        await signOut(auth)
    }

    const [user] = useAuthState(auth)

  return (
    <nav>
        
        <Link to="/">Home</Link>

    
        {user? (
            <>
            <h3>{user?.displayName}</h3>
            <Avatar  src={user?.photoURL} />
            <button onClick={LogUserOut}>Sign out</button>
            </>
        ):(
            <>
            <Link to="/login">Login</Link>
            <Link to="/register">register</Link>
            </>
        )}

    </nav>
  )
}

export default Navbar