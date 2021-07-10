import React,{useState,useEffect} from 'react';
import firebase from './firebase';
import {useSelector, useDispatch} from "react-redux";
import {updateStore} from "./action/action";
import {Link} from "react-router-dom";
//import {createPost} from "./api";
import axios from "axios";
import "./Otp.css";

function Otp() {
    const [details,setmobile]=useState({
        mobile:0,
        otp:0
    })
    const [visform,setvisform]=useState(true)
    const wholeform=useSelector(state=> state);
   // let wholeform;
    console.log("Ye otp me h");
    console.log(wholeform);
    const dispatch=useDispatch();
   // useEffect(()=> {dispatch(updateStore(wholeform))},[dispatch])
    const [verified, setverified] =useState(false);
    const [present,setpresent]=useState(false);
    const [otpsent,setotpsent]=useState(false);
    const [otpfail,setotpfail]=useState(false);
    const [wrongotp,setwrongotp]=useState(false);
    const [created, setcreated]=useState(false);
    const [loading,setloading]=useState(false);
    const [ok,setok]=useState(false);
    const [mobilewait,setmobilewait]=useState(false);
    const [howotp,sethowotp]=useState(false);
    const [loadingotp,setloadingotp]=useState(false);
    const [finalloading,setfinalloading]=useState(false);
    const [otpload,setotpload]=useState(false);
  //   const handleChange=(e) => {
  //     const name=e.target.name;
  //     const n=String(name);
  //     const value=e.target.value;
  //     setmobile({...details, [name]:value})
  //     if(n==="mobile")
  //     {
  //     axios.post("https://warm-tor-46782.herokuapp.com/find",{mobileno:String(e.target.value)})
  //     .then(response => {
        
  //       const {data}=response.data;
  //       console.log("Ye data");
  //       console.log(data);
  //       console.log(e.target.value.length);
  //       console.log("Ye post /find me h");
  //       console.log(data);
  //       console.log("Ye mobile");
  //       console.log(details.mobile);
    
  //       if(data!=null)
  //       {setpresent(false);}
  //       else if(String(e.target.value).length==10)
  //       {setpresent(true);
  //       setmobile({...details, mobile: ""})}
  //     })
  //     .catch(err=> console.log(err));
  //     // setmobile({...details, [name]:value})
  //   }
  
  // }
const handleChange=async (e) => {
  const name=e.target.name;
       const n=String(name);
         const value=e.target.value;
     setmobile({...details, [name]:value})
     
  try {
    // const name=e.target.name;
    //    const n=String(name);
    //      const value=e.target.value;
    //  setmobile({...details, [name]:value})
     if(n=="mobile" && String(e.target.value).length==10)
     { setloading(true);
       const res=await axios.post("https://warm-tor-46782.herokuapp.com/find",{mobileno:String(e.target.value)});
      
       console.log("Ye data");
       console.log(res.data);
       if(res.data!=null)
       {setpresent(true);
        setloading(false);
      setok(false);
    setmobile({...details, mobile: ""})
  }
    else 
    {setok(true);
      setloading(false);
    }
     }
     
  }
  catch (err){
    console.log(err);
  }
}
// const [created, setcreated]=useState(false);
    const handlefinalClick=() => {
      setfinalloading(true);
axios.post("https://warm-tor-46782.herokuapp.com/",{...wholeform, mobileno: String(details.mobile)})
.then(response => {
    setcreated(true);
    setverified(false);
    setvisform(false);
    setfinalloading(false);
})
.catch(err=>{ console.log(err)
setfinalloading(false)});
    }
    const onSignInSubmit=(e)=> {
        e.preventDefault();
        configureCaptcha();
        setmobilewait(true);
        const phoneNumber = "+91" + details.mobile
        console.log(phoneNumber)
        const appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
              // SMS sent. Prompt user to type the code from the message, then sign the
              // user in with confirmationResult.confirm(code).
              window.confirmationResult = confirmationResult;
              setotpsent(true);
              setotpfail(false);
              setmobilewait(false);
              // ...
            }).catch((error) => {
              // Error; SMS not sent
              // ...
             
              setotpsent(false);
              setotpfail(true);
              setpresent(false);
              console.log("SMS not sent")
              console.log(error)
              setmobilewait(false);
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
    sethowotp(true);
    setloadingotp(true);
    setotpload(true);
    const code = details.otp
    console.log(code)
    window.confirmationResult.confirm(code).then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log(JSON.stringify(user))
      setverified(true);
      setwrongotp(false);
      setloadingotp(false);
      setotpload(false);
      // ...
    }).catch((error) => {
      setwrongotp(true);
   console.log("wrong otp")
   setloadingotp(false);
   setotpload(false);
   sethowotp(false);
    });
  }

  return (
    <div >
    <div style={{display : visform? "block": "none", padding: "30px"}} className="form-group">
      <form onSubmit={onSignInSubmit} style={{display: otpsent? "none":"block"}}>
        <div id="sign-in-button"></div>
        <div><h3>Verify Mobile</h3></div>
        <div style={{display :present && !ok && !loading? "block":"none"}}>Account exist with given number</div>
        <div style={{display: loading ? "block" : "none"}}>Please wait...</div>
        <div style={{display: otpfail && !present? "block": "none", color: "red"}}>Otp not sent</div>
        <input className="inp form-control" type="number" style={{marginBottom: "20px", marginTop: "20px"}} name="mobile" placeholder="Enter Mobile number" value={details.mobile===0 ? "" : details.mobile} required onChange={handleChange}/>
        <div style={{display:mobilewait?"block":"none"}}>Please Wait...</div>
        <button type="submit" className="btn-primary btn-lg btn-block" style={{display : ok && !mobilewait? "block":"none"}}>Submit</button>
      </form>

     </div>
     <div>
      <form onSubmit={onSubmitOTP} style={{display: otpsent && !created && !howotp? "block":"none", paddingBottom: "40px", border: "none"}} className="form-control">
      <h2>Enter OTP</h2>
      <div style={{display: otpsent ? "block": "none" , color: "green"}}>Otp has been sent</div>
        <input className="inp form-control" type="number" name="otp" placeholder="OTP Number" required onChange={handleChange}/>
        <div style={{display : wrongotp ? "block" : "none"}}>Wrong otp</div>
        <button type="submit" className="btn-primary btn-lg btn-block">Submit</button>
      </form>
      {/* <div style={{dipslay: loadingotp ? "block": "none"}}>Please Wait...</div> */}
      <div style={{display: otpload ? "block": "none", paddingBottom: "30px"}}>Please Wait...</div>
     <div style={{display: finalloading ? "block": "none"}}>Please Wait...</div>
      <button className="btn-success btn-lg btn-block" type="submit" onClick={handlefinalClick}  style={{marginBottom:"30px", display: verified && howotp && !finalloading ? "block": "none"}}>
          Signup
      </button> </div>
      <div style={{display: created ? "block" : "none", padding: "20px"}}>
      <h3>Account created</h3>
      <Link to="/Login">
      <button className="btn-primary btn-lg btn-block">Login</button></Link></div>
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