import React from "react";
import "./App.css";
import Otp from "./Otp";
import image from "./images/sukh.png";
import Login from "./Login";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Signup from "./Signup";

function App() {
  return (
    <div className="app">
    <Router>
    <Switch>
    <Route path="/otp">
      <Otp />
    </Route>
    <Route path="/signup">
    <div className="leftpart">
      <img src={image} className="Image"></img>
    </div>
    
    <div className="rightpart">
     <Signup /></div>
    </Route>
    <Route path="/doLogin">
    <div className="leftpart">
      <img src={image} className="Image"></img>
    </div>
    <div className="rightpart">
      <h1>Login</h1></div>
    </Route>
    <Route path="/">
    <div className="leftpart">
      <img src={image} className="Image"></img>
    </div>
    <div className="rightpart">
     <Login /></div>
     </Route>
     </Switch>
     </Router>
    </div>
  );
}

export default App;
