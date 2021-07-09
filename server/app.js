import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
//import { dosignup } from "./controllers/signup.js";
import cors from "cors";

const app=express();
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

//mongoose.connect("mongodb://localhost:27017/LoginSignupDB", {useNewUrlParser: true});

const signupSchema=new mongoose.Schema({
   firstname: String,
   middlename: String,
   lastName: String,
   email: String,
   password: String,
   dob: String,
 education: String,
   streetnum: Number,
   housenum: String,
   pincode: Number,
   city: String,
   state: String,
   country: String,
   attachments: String,
   mobileno: String,
});

const Signuppost=mongoose.model("Signuppost",signupSchema);
const createPost =async (req,res) => {
   const data=req.body;
   const newdata=new Signuppost(data);
   await newdata.save();
   res.status(201).json("Success");
}

app.get("/",function(req,res){
res.send("Hello");
});
app.post("/",createPost);
// app.post("/",function(req,res) {
//    const data=req.body;
//    const newdata=new Signuppost(data);
//    newdata.save();
//    res.status.json("Success");
// })
const findPost=async (req,res) => {
const data=req.body;
console.log(data);
//const data={mobileno: "8299852684"}
// const data={email: "raghvendram396@gmail.com"}
await Signuppost.findOne(data,function(err,foundItem){
   if(!err)
   {
//  if(foundItem)
//  {console.log("found");
//    res.json({item: "Present"});
//  }
// else {
//    console.log("Not found");
//    res.json({item: "Not present"});
// }
res.json(foundItem);
   }
   else console.log(err);
})

}
app.post("/find",findPost);
mongoose.connect("mongodb://localhost:27017/LoginSignUp",{useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(5000,function(){
   console.log("Server Running successfully on 5000");
}))
.catch((error) =>  {console.log(error.message)});
mongoose.set('useFindAndModify', false);
