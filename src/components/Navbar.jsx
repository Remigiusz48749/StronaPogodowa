import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
    <nav>
        <Link to="/Home">Home</Link>
        <Link to="/Favorites">Favorites</Link>
        <Link to="/Comments">Comments</Link>
        <Link to="/" onClick={LogOut}>Log Out</Link>
    </nav>
);

const LogOut = async() => {
    try {
        await signOut(auth);
        console.log("LogOut: "+ auth?.currentUser?.email );
    } catch (err){
        console.error(err);
    }
};

export default Navbar;