import React from "react";
import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
    
export const Login = () => {
    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider);
        console.log(result);
        navigate("/");
    }

    return (
        <div> 
            <p>Accedi con Google per continuare</p>
            <button onClick={signInWithGoogle}> Accedi con Google</button>
        </div>
    )
};