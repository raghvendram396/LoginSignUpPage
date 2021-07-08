import React,{useState} from 'react';
import firebase from './firebase';
import {useSelector, useDispatch} from "react-redux";
import {updateStore} from "./action/action";
import {Link} from "react-router-dom";
//import {createPost} from "./api";
import axios from "axios";

function Otp() {
    const [details,setmobile]=useState({
        mobile:0,
        otp:0
    })
    const [visform,setvisform]=useState(true)
    const wholeform=useSelector(state=> state);
    const dispatch=useDispatch();
    const [verified, setverified] =useState(false);
    const handleChange=(e) => {
    const name=e.target.name;
    const value=e.target.value;
    
    setmobile({...details, [name]:value})
}
const [created, setcreated]=useState(false);
    const handlefinalClick=() => {
axios.post("http://localhost:5000/",{...wholeform, mobileno: details.mobile})
.then(response => {
    setcreated(true);
    setverified(false);
    setvisform(false);
})
.catch(err=> console.log(err));
    }
    const onSignInSubmit=(e)=> {
        e.preventDefault();
        configureCaptcha();
        const phoneNumber = "+91" + details.mobile
        console.log(phoneNumber)
        const appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
              // SMS sent. Prompt user to type the code from the message, then sign the
              // user in with confirmationResult.confirm(code).
              window.confirmationResult = confirmationResult;
              console.log("OTP has been sent")
              // ...
            }).catch((error) => {
              // Error; SMS not sent
              // ...
              console.log("SMS not sent")
            });
     }
     
  const configureCaptcha=() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
          console.log("Recaptca varified")
        },
        defaultCountry: "IN"
      });
    }
  const onSubmitOTP=(event) => {
    event.preventDefault()
    const code = details.otp
    console.log(code)
    window.confirmationResult.confirm(code).then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log(JSON.stringify(user))
      setverified(true);
      // ...
    }).catch((error) => {
   console.log("wrong otp")
    });
  }

  return (
    <div>
    <div style={{display : visform? "block": "none"}}>
      <h2>Login Form</h2>
      <form onSubmit={onSignInSubmit}>
        <div id="sign-in-button"></div>
        <input type="number" name="mobile" placeholder="Mobile number" required onChange={handleChange}/>
        <button type="submit">Submit</button>
      </form>

      <h2>Enter OTP</h2>
      <form onSubmit={onSubmitOTP}>
        <input type="number" name="otp" placeholder="OTP Number" required onChange={handleChange}/>
        <button type="submit">Submit</button>
      </form>
      <button type="submit" onClick={handlefinalClick} style={{display: verified ? "block": "none"}}>
          Signup
      </button></div>
      <div style={{display: created ? "block" : "none"}}>
      <h1>account created</h1>
      <Link to="/Login">
      <button>Login</button></Link></div>
    </div>
  )
}

export default Otp;







// import React from 'react'
// import firebase from './firebase'
// import {useDispatch,useSelector} from "react-redux";
// class Otp extends React.Component {
//   handleChange = (e) =>{
//     const {name, value } = e.target
//     this.setState({
//         [name]: value
//       })
//     }

//   configureCaptcha = () =>{
//     window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
//       'size': 'invisible',
//       'callback': (response) => {
//         // reCAPTCHA solved, allow signInWithPhoneNumber.
//         this.onSignInSubmit();
//         console.log("Recaptca varified")
//       },
//       defaultCountry: "IN"
//     });
//   }
//   onSignInSubmit = (e) => {
//     e.preventDefault();
//     this.configureCaptcha();
//     const phoneNumber = "+91" + this.state.mobile
//     console.log(phoneNumber)
//     const appVerifier = window.recaptchaVerifier;
//     firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
//         .then((confirmationResult) => {
//           // SMS sent. Prompt user to type the code from the message, then sign the
//           // user in with confirmationResult.confirm(code).
//           window.confirmationResult = confirmationResult;
//           console.log("OTP has been sent")
//           // ...
//         }).catch((error) => {
//           // Error; SMS not sent
//           // ...
//           console.log("SMS not sent")
//         });
//   }
//   onSubmitOTP = (event) =>{
//     event.preventDefault()
//     const code = this.state.otp
//     console.log(code)
//     window.confirmationResult.confirm(code).then((result) => {
//       // User signed in successfully.
//       const user = result.user;
//       console.log(JSON.stringify(user))
//       alert("User is verified")
//       // ...
//     }).catch((error) => {
//    console.log("wrong otp")
//     });
//   }
//   render() {
//     return (
//       <div>
//         <h2>Login Form</h2>
//         <form onSubmit={this.onSignInSubmit}>
//           <div id="sign-in-button"></div>
//           <input type="number" name="mobile" placeholder="Mobile number" required onChange={this.handleChange}/>
//           <button type="submit">Submit</button>
//         </form>

//         <h2>Enter OTP</h2>
//         <form onSubmit={this.onSubmitOTP}>
//           <input type="number" name="otp" placeholder="OTP Number" required onChange={this.handleChange}/>
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     )
//   }
// }
// export default Otp