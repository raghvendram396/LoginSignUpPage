import React,{useState} from 'react'
import "./DoLogin.css"
import axios from "axios";

function DoLogin() {
    const [detail,setdetail]=useState({
        phone: 0,
        password: ""
    })
    const [wrong,setwrong]=useState(false);
    const [detailcorrect,setdetailCorrect]=useState(false);
    const [user,setuser]=useState("");
    const handleChange=(e) => {
        const name=e.target.name;
        const value=e.target.value;

        setdetail({...detail, [name]: value
        })
    }
    const handleSubmit=(e) => {
        e.preventDefault();
        axios.post("https://warm-tor-46782.herokuapp.com/find",{mobileno:String(detail.phone)})
        .then(response => {
            console.log("Response")
            console.log(response)
            if(response.data===null)
            {setwrong(true)}
           else {
               console.log("Ye null nhi h");
               const data=response.data;
            console.log("Dologin me");
            console.log(data);
            console.log(detail.password)
            console.log(data.password)
                if(data.password==detail.password)
                {setdetailCorrect(true);
                   setuser(data.firstname);
                }
                else {setwrong(true)}
         }
        })
       .catch(err => console.log(err))
    }
    return (
        <div>
        <div className="form" style={{display: !detailcorrect ? "block": "none"}}>
            <div className="top">
                <h3>Welcome to Login Page</h3>
                <h4 style={{textAlign: "center"}}>Login into your account</h4>
                <div className="form-group">
                <form style={{backgroundColor: "white", borderRadius: "10px", padding: "20px",marginTop: "20%"}} onSubmit={handleSubmit} >
   <p style={{color: "red",display: wrong ? "block":"none"}}>Wrong phone or password</p>
   <input className="inp form-contol" type="number" name="phone" value={detail.phone===0 ? "" : detail.phone} placeholder="Enter Phone" onChange={handleChange} required></input>
  <input className="inp form-contol" type="password" name="password" value={detail.password} placeholder="Enter Password" onChange={handleChange} required></input>
<button type="submit" className="btn-primary btn-lg btn-block" style={{marginTop: "20px"}}>Login</button>
                </form></div>
            </div>
        </div>
        <div style={{display: detailcorrect ? "block":"none"}} className="form">
        <p><h1 style={{textAlign:"center"}}>You are now logged in</h1></p><h2 style={{textAlign:"center"}}>Hi {user}</h2></div>
        </div>
    )
}

export default DoLogin
