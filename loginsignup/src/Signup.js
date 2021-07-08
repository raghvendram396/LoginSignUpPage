import React,{useState,useEffect} from 'react';
import "./Signup.css";
import axios from "axios";
import CountrySelect from './CountrySelect';
import FileBase from "react-file-base64";
import {Link,Redirect} from "react-router-dom";
import {updateStore} from "./action/action";
import {useDispatch} from "react-redux";
function Signup() {
    const [formdata, setformdata]= useState({
        firstname: "",
        middlename: "",
        lastName: "",
        email: "",
        password: "",
        dob: "",
       education: "",
        streetnum: "",
        housenum: "",
        pincode: "",
        city: "",
        state: "",
        country: "",
        attachments: ""
    })

    const dispatch = useDispatch();
    async function setCity(pin) {
      const url="https://api.postalpincode.in/pincode/"+String(pin);
     const response = await axios.get(url);

     if(response.data[0].Status==="Success")
    {console.log(response.data[0].PostOffice[0].District);
    console.log(response.data[0].PostOffice[0].State)
  setformdata({...formdata,pincode: String(pin), city: String(response.data[0].PostOffice[0].District), state: String(response.data[0].PostOffice[0].State)})}
    }
//    const handleSubmit=(event) => {
// event.preventDefault();
// if(formdata.password===cnfpass)
// {

// }
// else {
  
// }
//     }
    const updateCountry=(event) => {
      const name=event.target.name;
      const value=event.target.value;
      setformdata({...formdata, [name]: value});
    }

    const handleClick=() => {

  console.log(formdata.firstname);
  if(formdata.firstname!="")
  setsubmit(true);
    }
    const [cnfpass,setcnfpass]=useState("");
    const [checkcnf, setcheckcnf]=useState(false);
    const [submit,setsubmit]=useState(false);
    const [allok,setallok]=useState(false);

    useEffect(() => {
      formdata.password===cnfpass && cnfpass!="" ? setcheckcnf(true) : setcheckcnf(false); 
    },[cnfpass])
  
    const handleSubmit=(event) => {
    event.preventDefault();
    if(checkcnf)
    {setallok(true);
  
    }
    }
    const handleallokclick=() => {
     dispatch(updateStore(formdata));
    }
    const fillform=(event) => {
const name=event.target.name;
setformdata({...formdata, [name]: event.target.value})
    }
    const handlecnf=(event) => {
      setcnfpass(event.target.value);
      if(cnfpass===formdata.password && cnfpass!="")
      setcheckcnf(true);
      else checkcnf(false);
    }
    const handlepincodeChange=(event) => {
      event.preventDefault();
      setformdata({...formdata, pincode: event.target.value});
      setCity(event.target.value);    
    }
    const fillformdob=(event) => {
      const value=String(event.target.value);
      setformdata({...formdata, dob: value});
    }
    return (
        <div className="signup form-group">
            <form className="ff" autofill="false" onSubmit={handleSubmit}>
                <input className="inp form-control" type="text" name="firstname" value={formdata.firstname} placeholder="First Name" onChange={fillform} required></input>
                <input className="inp form-control" type="text" name="middlename" value={formdata.middlename} placeholder="Middle Name" onChange={fillform} required></input>
                <input className="inp form-control" type="text" name="lastname" value={formdata.lastname} placeholder="Last Name" onChange={fillform} required></input>
                <input className="inp form-control" type="text" name="email" value={formdata.email} placeholder="Email" onChange={fillform}></input>
                <input className="inp form-control" type="password" name="password" value={formdata.password} placeholder="Password" onChange={fillform}></input>

                <input className="inp form-control" type="password" id="cnf" name="Confirmpassword" value={cnfpass} placeholder="Confirm password" onChange={(event) =>{setcnfpass(event.target.value)}} onChane={handlecnf}></input>
              
                {/* <input className="inp form-control" type="tel" name="mobileno" value={formdata.mobileno} placeholder="Mobile" onChange={fillformdob}></input> */}
                <label for="dob"  style={{marginBotom: "0"}}>Date of birth</label>
                <input className="inp form-control" id="dob" style={{marginTop: "0"}} type="date" name="dob" value={formdata.dob} onChange={fillformdob}></input>
  <div class="form-group">
  <label for="edu"><h6>Education</h6></label>
  <select id="edu" onChange={fillform} name="education">
                    <option selected>Choose your highest degree achieved</option>
                    <option value="Bachelor's">Bachelor's degree</option>
                    <option value="Master's">Master's degree</option>
                    <option value="Doctoral's">Doctoral's degree</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="High School">High School</option>
                </select>
<br></br>
    <label for="inputAddress"><h6>Address</h6></label>
    <input type="text" class="inp form-control" id="inputAddress" placeholder="Street Number" name="streetnum" onChange={fillform}/>
    <input type="text" class="inp form-control" name="housenum" placeholder="House Number" onChange={fillform}/>
    <input type="text" class="inp form-control" placeholder="PinCode" name="pincode" value={formdata.pincode} onChange={handlepincodeChange}/>
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputCity">City</label>
      <input type="text" class="form-control" id="inputCity" name="city" value={formdata.city} onChange={fillform}/>
    </div>
    <div class="form-group col-md-4">
      <label for="inputState">State</label>
      <input type="text" class="form-control" name="state" value={formdata.state} onChange={fillform}/>
    </div>
  </div>
 <CountrySelect update={updateCountry} />
 <div>
 <h6 style={{marginRight :"90px"}}>Upload a aadhar/pan/drivibg license</h6>
 <FileBase type="file" multiple={false}  onDone={({base64}) => {setformdata({...formdata, attachments: base64})}} />
 </div>        
 <p style={{color: "red", display: submit && !checkcnf ? "block": "none"}}>Password did not match</p>
 {/* <Link to={checkcnf ? "/otp":"/signup" } > */}
  <button type="submit" class="btn btn-primary"  onClick={handleClick}>Sign in</button>
  {/* </Link> */}
            </form>
            <div style={{display: allok ? "block":"none"}}>
            <Link to="/otp">
            <button onClick={handleallokclick}>Proceed</button></Link></div>
        </div>
    )
}

export default Signup
