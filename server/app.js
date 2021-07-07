import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from "cors";

const app=express();
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());


app.get("/",function(req,res){
res.send("Hello");
});
mongoose.connect("mongodb://localhost:27017/LoginSignUp",{useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(5000,function(){
   console.log("Server Running successfully on 5000");
}))
.catch((error) =>  {console.log(error.message)});
mongoose.set('useFindAndModify', false);
