import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export const Navbar = () => {
    const [user] = useAuthState(auth);

    const signUserOut = async () => {
        await signOut(auth);
    };

    return (
        <div className="navbar">
            <div className="links">
                <Link to="/"> Home </Link>
                {!user && <Link to="/login"> Accedi </Link>}
                {user && <Link to="/createpost"> Crea Post </Link>}
            </div>

            <div className="user">
                {user && (
                    <>
                        <p> {user?.displayName} </p>
                        <img src={user?.photoURL || ""} width="30" height="30" alt="" />
                        <button onClick={signUserOut}> Esci</button>
                    </>
                )}
            </div>
        </div>
    );
};