import axios from "axios";
const url="https://localhost:5000/";

export const createPost=(data) => axios.post(url,data);