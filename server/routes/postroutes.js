import express from "express";
import { dosignup } from "../controllers/signup";

const router=express.Router();
router.post("/",dosignup);