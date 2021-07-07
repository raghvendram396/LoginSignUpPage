import mongoose from "mongoose";


const signupSchema=new mongoose.Schema({
    firstname: String,
    middlename: String,
    lastName: String,
    email: String,
    password: String,
    mobileno: Number,
    dob: Date(),
    education: String,
    streetnum: Number,
    pincode: Number,
    city: String,
    state: String,
    country: String,
    attachments: String
});

const Signuppost=mongoose.model(Signuppost,signupSchema);

export default Signuppost;
