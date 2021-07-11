import React from 'react'
import "./Login.css";
import {Link} from "react-router-dom";
import { useState } from 'react';
import firebase from './firebase';

function Login() {
    const [email,setemail]=useState("");
    const [pass,setpass]=useState("");
 
    return (
        
            <div className="form">
                <div className="top">
                    <h3 style={{textAlign: "center"}}>Welcome to Sukh Foundation</h3>
                </div>
                <div className="bottom">
                <div className="signupbutton">
                <div><h6>Don't have an account? Signup</h6></div>
                <Link  style={{ color: 'inherit', textDecoration: 'inherit'}} to="/signup">
                <button type="button" class="btn btn-success btn-lg btn-block">Signup</button></Link></div>   
                <div className="loginbutton">
                <div>
                <h6>Already have account? Login</h6>
                </div>
                <Link  style={{ color: 'inherit', textDecoration: 'inherit'}} to="doLogin">
                <button type="button" class="btn btn-primary btn-lg btn-block">Login</button></Link></div>
                </div>
            
            </div>
        
    )
}

export default Login
