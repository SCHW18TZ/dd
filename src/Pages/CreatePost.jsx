import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate,Link } from "react-router-dom";


const CreatePost = ()=>{
    const [user] = useAuthState(auth)
    let navigate = useNavigate();
    return(
        <div>
            {user?(
                <div>
                    <h1>Wow you logged ins</h1>
                </div>
            ):(
                <div>
                <h1>You need to be logged in to create A post!</h1>
                <Link to="/login">Login</Link>
            
                </div>
            )}
        </div>
    )
}

export default CreatePost