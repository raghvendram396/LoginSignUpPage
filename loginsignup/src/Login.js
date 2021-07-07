import React from 'react'
import "./Login.css";
import {Link} from "react-router-dom";

function Login() {
    return (
        <div>
            <div className="form">
                <div className="top">
                    <h3>Welcome To Sukh Foundation</h3>
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
        </div>
    )
}

export default Login
