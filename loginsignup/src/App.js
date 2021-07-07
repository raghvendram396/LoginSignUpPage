import React from "react";
import "./App.css";
import image from "./images/sukh.png";
import Login from "./Login";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  return (
    <div className="app">
    <div className="leftpart">
      <img src={image} className="Image"></img>
    </div>
    <div class="rightpart">
    <Router>
    <Switch>
    <Route path="/signup">
      <h1>Signup</h1>
    </Route>
    <Route path="/doLogin">
      <h1>Login</h1>
    </Route>
    <Route path="/">
     <Login />
     </Route>
     </Switch>
     </Router>
    </div>
    </div>
  );
}

export default App;
