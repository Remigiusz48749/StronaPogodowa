import { auth, googleAuthProvider, db } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { doc, setDoc } from "firebase/firestore";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const SignIn = async() => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            //Saving to firebase db
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email: user.email,
                createdAt: new Date(),
            });
            
            console.log("SignIn: "+ auth?.currentUser?.email );
            navigate('/Home');
        } catch (err) {
            console.error(err)
        }
        //console.log('Email:', email);
        //console.log('Password:', password);
    };

    const SignInWithGoogle = async() => {
        try {
            const userCredential = await signInWithPopup(auth, googleAuthProvider);
            const user = userCredential.user;

            //Saving to firebase db
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                createdAt: new Date(),
            }, { merge: true }); 
            
            console.log("SignIn: "+ auth?.currentUser?.email );
            navigate('/Home');
        } catch (err) {
            console.error(err)
        }
        //console.log('Email:', email);
        //console.log('Password:', password);
    };

    const LogIn = async() => {
        try{
            await signInWithEmailAndPassword(auth, email, password)
            console.log("LogIn: "+ auth?.currentUser?.email );
            navigate('/Home');
        }catch(err){
            console.error(err)
        }
        
        //console.log('Email:', email);
        //console.log('Password:', password);
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title">Login</h1>
                <div className="login-form">
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className="login-button" onClick={LogIn}>Log in</button>
                    <button className="SignIn-button" onClick={SignIn}>Sign in</button>
                    <div onClick={SignInWithGoogle} className="Google">
                        <div className="Google-svg">
                            <svg xmlns="http://www.w3.org/2000/svg" >
                                <path fill="#4285F4" d="M20.64 12.2045c0-.6381-.0573-1.2518-.1636-1.8409H12v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.615z"></path>
                                <path fill="#34A853" d="M12 21c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.859-3.0477.859-2.344 0-4.3282-1.5831-5.036-3.7104H3.9574v2.3318C5.4382 18.9832 8.4818 21 12 21z"></path>
                                <path fill="#FBBC05" d="M6.964 13.71c-.18-.54-.2822-1.1168-.2822-1.71s.1023-1.17.2823-1.71V7.9582H3.9573A8.9965 8.9965 0 0 0 3 12c0 1.4523.3477 2.8268.9573 4.0418L6.964 13.71z"></path>
                                <path fill="#EA4335" d="M12 6.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C16.4632 3.8918 14.426 3 12 3 8.4818 3 5.4382 5.0168 3.9573 7.9582L6.964 10.29C7.6718 8.1627 9.6559 6.5795 12 6.5795z"></path>
                            </svg>
                        </div>
                        <div className="Google-LeftText">Log in with  <b>Google</b></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;